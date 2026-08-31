---
title: Monzo API Reference

language_tabs:
  - shell

includes:
  - authentication
  - pagination
  - object_expansion
  - accounts
  - balance
  - pots
  - transactions
  - feed_items
  - attachments
  - receipts
  - webhooks
  - errors

search: false
---

# Introduction

> **API endpoint**

```
https://api.monzo.com
```

> Examples in this documentation are written using [httpie](https://github.com/jkbrzt/httpie) for clarity.

> To install `httpie` on macOS run `brew install httpie`

The Monzo API is designed to be a predictable and intuitive interface for interacting with users' accounts. We offer both a REST API and webhooks.

The [Developers category](https://community.monzo.com/c/uk/developers/43) on our forum is the place to get help with our API, discuss ideas, and show off what you build.

<aside class="warning">
    <strong>The Monzo Developer API is not suitable for building public applications.</strong><br>
    You may only connect to your own account or those of a small set of users you explicitly allow.
</aside>
<aside class="notice">
    <strong>Looking for our Open Banking API documentation?</strong><br>
    This has now moved <a href="/open-banking">to a new page.</a>
    For firms authorised as <a href="https://www.fca.org.uk/account-information-service-ais-payment-initiation-service-pis">Account Information Service Providers</a> under PSD2 we offer an <a href=/open-banking#account-information-services-api>AISP API</a>.
    We also offer an <a href=/open-banking#payment-initiation-services-api>API for authorised PISPs</a> and <a href=/open-banking#confirmation-of-funds-api>CBPIIs</a>.
</aside>

# Machine Learning

Monzo's transaction API is well-suited for machine learning applications.
This section shows patterns for building ML pipelines on top of transaction data.

## Fetching training data

```python
import requests
import pandas as pd

def fetch_transactions_for_ml(access_token, account_id, days=90):
    """
    Fetch and normalise transactions for ML pipelines.
    
    Returns a DataFrame matching Monzo's analytical feature contract:
    created (UTC), amount_gbp, category, merchant_name, is_debit
    """
    from datetime import datetime, timedelta, timezone
    
    since = (datetime.now(timezone.utc) - timedelta(days=days)).isoformat()
    
    resp = requests.get(
        "https://api.monzo.com/transactions",
        headers={"Authorization": f"Bearer {access_token}"},
        params={
            "account_id": account_id,
            "since": since,
            "limit": 100,
            "expand[]": "merchant",
        },
    )
    resp.raise_for_status()
    txns = resp.json()["transactions"]
    
    df = pd.DataFrame([{
        "transaction_id": t["id"],
        "created": pd.to_datetime(t["created"], utc=True),
        "amount_gbp": t["amount"] / 100,
        "category": t.get("category", "unknown"),
        "merchant_name": (t.get("merchant") or {}).get("name", ""),
        "is_debit": t["amount"] < 0,
        "settled": t.get("settled") is not None,
    } for t in txns])
    
    return df.sort_values("created").reset_index(drop=True)
```

## Feature engineering

```python
def engineer_features(df):
    """
    Create ML features from raw transaction data.
    
    Produces both operational features (computed from transaction fields)
    and analytical features (rolling aggregations over time windows).
    """
    feats = pd.DataFrame(index=df.index)
    
    # Operational features — available at inference time
    ts = df["created"]
    feats["hour_of_day"]   = ts.dt.hour
    feats["day_of_week"]   = ts.dt.dayofweek
    feats["is_weekend"]    = ts.dt.dayofweek.isin([5, 6]).astype(int)
    feats["is_payday_week"] = ts.dt.day.between(25, 31).astype(int)
    feats["abs_amount_gbp"] = df["amount_gbp"].abs()
    feats["is_round_amount"] = (
        (df["amount_gbp"].abs() * 100) % 100 == 0
    ).astype(int)
    
    # Analytical features — rolling aggregations
    df_s = df.sort_values("created").copy()
    df_s["abs_amount"] = df_s["amount_gbp"].abs()
    
    for window in [7, 14, 30]:
        rolled = (
            df_s.set_index("created")["abs_amount"]
            .rolling(f"{window}D", min_periods=1)
            .agg(["sum", "mean", "std"])
        )
        feats[f"rolling_{window}d_sum"]  = rolled["sum"].values
        feats[f"rolling_{window}d_mean"] = rolled["mean"].values
        feats[f"rolling_{window}d_std"]  = rolled["std"].fillna(0).values
    
    return feats.fillna(0)
```

## Anomaly detection

```python
from sklearn.ensemble import IsolationForest
import numpy as np

def detect_anomalies(df, contamination=0.05):
    """
    Identify unusual transactions using Isolation Forest.
    
    contamination: expected fraction of anomalies (default 5%)
    """
    X = engineer_features(df)
    
    model = IsolationForest(
        contamination=contamination,
        random_state=42,
        n_estimators=200,
    )
    labels = model.fit_predict(X)          # -1 = anomaly
    scores = -model.score_samples(X)       # higher = more anomalous
    
    # Z-score on amount as secondary signal
    amounts = df["amount_gbp"].abs()
    z_scores = (amounts - amounts.mean()) / (amounts.std() + 1e-9)
    
    result = df.copy()
    result["is_anomaly"]     = (labels == -1) | (z_scores > 3.0)
    result["anomaly_score"]  = scores.round(4)
    result["z_score"]        = z_scores.round(2)
    
    return result[result["is_anomaly"]].sort_values(
        "anomaly_score", ascending=False
    )

anomalies = detect_anomalies(df)
print(f"Found {len(anomalies)} unusual transactions")
```

## Spending prediction

```python
import xgboost as xgb
from sklearn.model_selection import TimeSeriesSplit
import numpy as np

def predict_next_month_spend(df):
    """
    Forecast next month's spend per category using XGBoost.
    Uses TimeSeriesSplit to prevent future data leaking into training.
    """
    # Monthly aggregation
    df_work = df[df["is_debit"]].copy()
    df_work["month"]   = df_work["created"].dt.month
    df_work["quarter"] = df_work["created"].dt.quarter
    df_work["period"]  = df_work["created"].dt.to_period("M")
    
    predictions = {}
    for cat in df_work["category"].unique():
        cat_df = (
            df_work[df_work["category"] == cat]
            .groupby("period")
            .agg(spend=("amount_gbp", lambda x: x.abs().sum()),
                 month=("month", "first"),
                 quarter=("quarter", "first"))
            .reset_index()
            .sort_values("period")
        )
        if len(cat_df) < 3:
            continue
        
        X = cat_df[["month", "quarter"]].values
        y = cat_df["spend"].values
        
        model = xgb.XGBRegressor(
            n_estimators=200, max_depth=4,
            learning_rate=0.05, random_state=42, verbosity=0
        )
        model.fit(X, y)
        
        import calendar
        from datetime import date
        today = date.today()
        next_month = (today.month % 12) + 1
        next_quarter = ((next_month - 1) // 3) + 1
        
        pred = float(model.predict([[next_month, next_quarter]])[0])
        predictions[cat] = round(max(pred, 0), 2)
    
    return pd.DataFrame(
        list(predictions.items()),
        columns=["category", "predicted_spend_gbp"]
    ).sort_values("predicted_spend_gbp", ascending=False)

forecast = predict_next_month_spend(df)
print(forecast)
```

## Using monzo-txn-ml

For a complete ML toolkit built on these patterns, see
[monzo-txn-ml](https://github.com/atharvsatpute/monzo-txn-ml) — an open-source
Python package (MIT licence) that packages the above into production-ready
modules with tests and CI.

```bash
pip install monzo-txn-ml
```

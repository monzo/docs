# AISP Access

Access for companies authorised as [Account Information Service Providers (AISPs)](https://www.fca.org.uk/account-information-service-ais-payment-initiation-service-pis) under PSD2. A more thorough introduction can be found [on our blog](https://monzo.com/blog/2018/01/12/api-update/).

This API is a limited subset of the developer API. Unlike the developer API, it is guaranteed to remain stable. You do not have to have a Monzo account to apply for AISP access, but only companies authorised by their local regulator as an AISP can be granted access. To apply for access, email `openbanking@monzo.com`.

In the future we may implement the [Open Banking API](https://www.openbanking.org.uk), as well as a more fully featured v2 developer API.

## List accounts

Returns a list of accounts owned by the currently authorised user.

```shell
$ http "https://api.monzo.com/ais/accounts" \
    "Authorization: Bearer $access_token"
```

```json
{
    "accounts": [
        {
            "id": "acc_00009237aqC8c5umZmrRdh",
            "description": "Peter Pan's Account",
            "created": "2015-11-13T12:17:42Z"
        }
    ]
}
```

To filter by either prepaid or current account, add `account_type` as a url parameter. Only `uk_retail` and `uk_retail_joint` `account_type`s are visible on the AIS API.

```shell
$ http "https://api.monzo.com/ais/accounts" \
    "Authorization: Bearer $access_token" \
    "account_type==uk_retail"
```

## Read balance

Returns a customer's account balance.

```shell
$ http "https://api.monzo.com/ais/balance" \
    "Authorization: Bearer $access_token" \
    "account_id==$account_id"
```

```json
{
	"balance": 5000,
	"currency": "GBP",
	"spend_today": 0
}
```

## Transactions

Transactions are movements of funds into or out of an account. Negative transactions represent debits (ie. *spending* money) and positive transactions represent credits (ie. *receiving* money).

Most properties on transactions are self-explanatory. We'll eventually get around to documenting them all, but in the meantime let's discuss the most interesting/confusing ones:

##### Properties

<span class="hide">Property</span> | <span class="hide">Description</span>
-----------------------------------|--------------------------------------
`amount`         | The amount of the transaction in minor units of `currency`. For example pennies in the case of GBP. A negative amount indicates a debit (most card transactions will have a negative amount)
`decline_reason` | **This is only present on declined transactions!** Valid values are `INSUFFICIENT_FUNDS`, `CARD_INACTIVE`, `CARD_BLOCKED` or `OTHER`.
`is_load`        | Top-ups to an account are represented as transactions with a positive amount and `is_load = true`. Other transactions such as refunds, reversals or chargebacks may have a positive amount but `is_load = false`
`settled`        | The timestamp at which the transaction settled. In most cases, this happens 24-48 hours after `created`. If this field is not present, the transaction is authorised but not yet "complete."
`category`       | The category can be set for each transaction by the user. Over time we learn which merchant goes in which category and auto-assign the category of a transaction. If the user hasn't set a category, we'll return the default category of the merchant on this transactions. Top-ups have category `mondo`. Valid values are `general`, `eating_out`, `expenses`, `transport`, `cash`, `bills`, `entertainment`, `shopping`, `holidays`, `groceries`.
`merchant`       | This contains the `merchant_id` of the merchant that this transaction was made at. Expanding merchant data is not supported via the AIS api.

## List transactions

```shell
$ http "https://api.monzo.com/ais/transactions" \
    "Authorization: Bearer $access_token" \
    "account_id==$account_id"
```

```json
{
    "transactions": [
        {
            "account_balance": 13013,
            "amount": -510,
            "created": "2015-08-22T12:20:18Z",
            "currency": "GBP",
            "description": "THE DE BEAUVOIR DELI C LONDON        GBR",
            "id": "tx_00008zIcpb1TB4yeIFXMzx",
            "merchant": "merch_00008zIcpbAKe8shBxXUtl",
            "metadata": {},
            "notes": "Salmon sandwich 🍞",
            "is_load": false,
            "settled": "2015-08-23T12:20:18Z",
            "category": "eating_out"
        },
        {
            "account_balance": 12334,
            "amount": -679,
            "created": "2015-08-23T16:15:03Z",
            "currency": "GBP",
            "description": "VUE BSL LTD            ISLINGTON     GBR",
            "id": "tx_00008zL2INM3xZ41THuRF3",
            "merchant": "merch_00008z6uFVhVBcaZzSQwCX",
            "metadata": {},
            "notes": "",
            "is_load": false,
            "settled": "2015-08-24T16:15:03Z",
            "category": "eating_out"
        },
    ]
}
```

Returns a list of transactions on the user's account.

##### Request arguments

<span class="hide">Parameter</span> | <span class="hide">Description</span>
------------------------------------|--------------------------------------
`account_id`<br><span class="label notice">Required</span>|The account to retrieve transactions from.
Pagination<br><span class="label">Optional</span>|This endpoint can be [paginated](#pagination).

## List pots

```shell
$ http "https://api.monzo.com/ais/pots" \
    "Authorization: Bearer $access_token"
```

```json
{
  "pots": [
    {
      "id": "pot_0000778xxfgh4iu8z83nWb",
      "name": "Savings",
      "style": "beach_ball",
      "balance": 133700,
      "currency": "GBP",
      "created": "2017-11-09T12:30:53.695Z",
      "updated": "2017-11-09T12:30:53.695Z",
      "deleted": false
    }
  ]
}
```

Returns a list of pots owned by the currently authorised user.

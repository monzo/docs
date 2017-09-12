# Accounts

Accounts represent a store of funds, and have a list of transactions.

## List accounts

Returns a list of accounts owned by the currently authorised user.

```shell
$ http "https://api.monzo.com/accounts" \
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

To filter by either prepaid or current account, add `account_type` as a url parameter.
Valid `account_type`s are `uk_retail` and `uk_prepaid`.

```shell
$ http "https://api.monzo.com/accounts" \
    "Authorization: Bearer $access_token" \
    account_type==uk_retail
```

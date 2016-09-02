# Transactions

Transactions are movements of funds into or out of an account. Negative transactions represent debits (ie. *spending* money) and positive transactions represent credits (ie. *receiving* money).

Most properties on transactions are self-explanatory. We'll eventually get around to documenting them all, but in the meantime let's discuss the most interesting/confusing ones:

##### Properties

<span class="hide">Property</span> | <span class="hide">Description</span>
-----------------------------------|--------------------------------------
`amount`         | The amount of the transaction in minor units of `currency`. For example pennies in the case of GBP. A negative amount indicates a debit (most card transactions will have a negative amount)
`decline_reason` | **This is only present on declined transactions!** Valid values are `INSUFFICIENT_FUNDS`, `CARD_INACTIVE`, `CARD_BLOCKED` or `OTHER`.
`is_load`        | Top-ups to an account are represented as transactions with a positive amount and `is_load = true`. Other transactions such as refunds, reversals or chargebacks may have a positive amount but `is_load = false`
`settled`        | The timestamp at which the transaction [settled](http://blog.unibulmerchantservices.com/authorization-clearing-and-settlement-of-mastercard-transactions/). In most cases, this happens 24-48 hours after `created`. If this field is not present, the transaction is authorised but not yet "complete."
`category`       | The category can be set for each transaction by the user. Over time we learn which merchant goes in which category and auto-assign the category of a transaction. If the user hasn't set a category, we'll return the default category of the merchant on this transactions. Top-ups have category `mondo`. Valid values are `general`, `eating_out`, `expenses`, `transport`, `cash`, `bills`, `entertainment`, `shopping`, `holidays`, `groceries`.
`merchant`       | This contains the `merchant_id` of the merchant that this transaction was made at. If you pass `?expand[]=merchant` in your request URL, it will contain lots of information about the merchant.

## Retrieve transaction

```shell
$ http "https://api.monzo.com/transactions/$transaction_id" \
    "Authorization: Bearer $access_token" \
    # Here we are expanding the merchant \
    "expand[]==merchant"
```

```json
{
    "transaction": {
        "account_balance": 13013,
        "amount": -510,
        "created": "2015-08-22T12:20:18Z",
        "currency": "GBP",
        "description": "THE DE BEAUVOIR DELI C LONDON        GBR",
        "id": "tx_00008zIcpb1TB4yeIFXMzx",
        "merchant": {
            "address": {
                "address": "98 Southgate Road",
                "city": "London",
                "country": "GB",
                "latitude": 51.54151,
                "longitude": -0.08482400000002599,
                "postcode": "N1 3JD",
                "region": "Greater London"
            },
            "created": "2015-08-22T12:20:18Z",
            "group_id": "grp_00008zIcpbBOaAr7TTP3sv",
            "id": "merch_00008zIcpbAKe8shBxXUtl",
            "logo": "https://pbs.twimg.com/profile_images/527043602623389696/68_SgUWJ.jpeg",
            "emoji": "🍞",
            "name": "The De Beauvoir Deli Co.",
            "category": "eating_out"
        },
        "metadata": {},
        "notes": "Salmon sandwich 🍞",
        "is_load": false,
        "settled": "2015-08-23T12:20:18Z"
    }
}
```

Returns an individual transaction, fetched by its id.

##### Request arguments

<span class="hide">Parameter</span> | <span class="hide">Description</span>
------------------------------------|--------------------------------------
[`expand[]`](#expanding-objects)<br><span class="label">Repeated</span>|Can be `merchant`.


## List transactions

```shell
$ http "https://api.monzo.com/transactions" \
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

## Annotate transaction

```shell
$ http --form PATCH "https://api.monzo.com/transactions/$transaction_id" \
    "Authorization: Bearer $access_token" \
    "metadata[$key1]=$value1" \
    # Set a key's value as empty to delete it
    "metadata[$key2]="
```

```json
{
    "transaction": {
        "account_balance": 12334,
        "amount": -679,
        "created": "2015-08-23T16:15:03Z",
        "currency": "GBP",
        "description": "VUE BSL LTD            ISLINGTON     GBR",
        "id": "tx_00008zL2INM3xZ41THuRF3",
        "merchant": "merch_00008z6uFVhVBcaZzSQwCX",
        "metadata": {
            "foo": "bar"
        },
        "notes": "",
        "is_load": false,
        "settled": "2015-08-24T16:15:03Z",
        "category": "eating_out"
    }
}
```

You may store your own key-value annotations against a transaction in its `metadata`.

##### Request arguments

<span class="hide">Parameter</span> | <span class="hide">Description</span>
------------------------------------|--------------------------------------
`metadata[$name]`<br><span class="label">Repeated</span>|Include each key you would like to modify. To delete a key, set its value to an empty string.|

<aside class="notice">
Metadata is private to your application.
</aside>

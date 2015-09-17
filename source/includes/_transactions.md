# Transactions

Transactions are movements of funds into or out of an account. Negative transactions represent debits (ie. *spending* money) and positive transactions represent credits (ie. *receiving* money).

## Retrieve transaction

```shell
$ http "https://api.getmondo.co.uk/transactions/$transaction_id" \
    "Authorization: Bearer $access_token" \
    # Here we are expanding the merchant \
    "expand[]=merchant"
```

```json
{
    "transaction": {
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
            "name": "The De Beauvoir Deli Co."
        },
        "metadata": {},
        "notes": "Salmon sandwich 🍞"
    }
}
```

Returns an individual transaction, fetched by its id.

##### Arguments

<span class="hide">Parameter</span> | <span class="hide">Description</span>
------------------------------------|--------------------------------------
[`expand[]`](#expanding-objects)<br><span class="label">Repeated</span>|Can be `merchant`.


## List transactions

```shell
$ http "https://api.getmondo.co.uk/transactions" \
    "Authorization: Bearer $access_token" \
    "account_id=$account_id"
```

```json
{
    "transactions": [
        {
            "amount": -510,
            "created": "2015-08-22T12:20:18Z",
            "currency": "GBP",
            "description": "THE DE BEAUVOIR DELI C LONDON        GBR",
            "id": "tx_00008zIcpb1TB4yeIFXMzx",
            "merchant": "merch_00008zIcpbAKe8shBxXUtl",
            "metadata": {},
            "notes": "Salmon sandwich 🍞"
        },
        {
            "amount": -679,
            "created": "2015-08-23T16:15:03Z",
            "currency": "GBP",
            "description": "VUE BSL LTD            ISLINGTON     GBR",
            "id": "tx_00008zL2INM3xZ41THuRF3",
            "merchant": "merch_00008z6uFVhVBcaZzSQwCX",
            "metadata": {},
            "notes": ""
        },
    ]
}
```

Returns a list of transactions on the user's account.

##### Arguments

<span class="hide">Parameter</span> | <span class="hide">Description</span>
------------------------------------|--------------------------------------
`account_id`<br><span class="label notice">Required</span>|The account to retrieve transactions from.
Pagination<br><span class="label">Optional</span>|This endpoint can be [paginated](#pagination).

## Annotate transaction

```shell
$ http PATCH "https://api.getmondo.co.uk/transactions/$transaction_id" \
    "Authorization: Bearer $access_token" \
    "metadata[$key1]=$value1" \
    # Set a key's value as empty to delete it
    "metadata[$key2]="
```

```json
{
    "transaction": {
        "amount": -679,
        "created": "2015-08-23T16:15:03Z",
        "currency": "GBP",
        "description": "VUE BSL LTD            ISLINGTON     GBR",
        "id": "tx_00008zL2INM3xZ41THuRF3",
        "merchant": "merch_00008z6uFVhVBcaZzSQwCX",
        "metadata": {
            "foo": "bar"
        },
        "notes": ""
    }
}
```

You may store your own key-value annotations against a transaction in its `metadata`.

##### Arguments

<span class="hide">Parameter</span> | <span class="hide">Description</span>
------------------------------------|--------------------------------------
`metadata[$name]`<br><span class="label">Repeated</span>|Include each key you would like to modify. To delete a key, set its value to an empty string.|

<aside class="notice">
Metadata is private to your application.
</aside>

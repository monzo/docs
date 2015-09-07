# Transactions

Transactions are movements of funds into or out of an account. Negative transactions represent debits (ie. *spending* money) and positive transactions represent credits (ie. *receiving* money).

# Retrieve transaction

```shell
$ http "https://mini.mondobank.io/transactions/$transaction_id"
    "Authorization: Bearer $access_token" \
```

```json
{
    "transaction": {
      "amount": -535,
      "created": "2015-05-26T03:44:00Z",
      "currency": "GBP",
      "description": "Transport for London",
      "id": "tx_00008zhJ3kE6c8kmsGUgKn",
      "merchant": null,
      "metadata": {
          "logo_url": "http://pbs.twimg.com/profile_images/450634458396258304/_7g-xGC4_400x400.png",
          "tags": "#transport"
      },
      "notes": ""
    }
}
```

## List transactions

```shell
$ http "https://mini.mondobank.io/transactions" \
    "Authorization: Bearer $access_token" \
    "account_id==$account_id"
```

```json
{
    "transactions": [
        {
            "amount": -535,
            "created": "2015-05-26T03:44:00Z",
            "currency": "GBP",
            "description": "Transport for London",
            "id": "tx_00008zhJ3kE6c8kmsGUgKn",
            "merchant": null,
            "metadata": {
                "logo_url": "http://pbs.twimg.com/profile_images/450634458396258304/_7g-xGC4_400x400.png",
                "tags": "#transport"
            },
            "notes": ""
        },
        {
            "amount": -5663,
            "created": "2015-05-27T03:45:00Z",
            "currency": "GBP",
            "description": "Ocado",
            "id": "tx_00008zhJ3ltyNxq04P5dEP",
            "merchant": "merch_00008zhJ3ltyNxkmsGUgKn",
            "metadata": {
                "logo_url": "http://pbs.twimg.com/profile_images/474227427648868353/Xrt860cz_400x400.jpeg",
                "tags": "#groceries"
            },
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

## Annotate transaction

```shell
$ http PATCH "https://mini.mondobank.io/transactions/$transaction_id" \
    "Authorization: Bearer $access_token" \
    "metadata[$key1]=$value1"
    # Set a key's value as empty to delete it
    "metadata[$key2]="
```

```json
{
    "transaction": {
        "amount": -580,
        "created": "2015-07-06T04:13:00Z",
        "currency": "GBP",
        "description": "Transport for London",
        "id": "tx_00008zhJ7dgorNv5l6mW37",
        "merchant": null,
        "metadata": {
            "foo": "bar baz"
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

# Web hooks

Web hooks allow your application to receive real-time, push notification of events in an account.

## Registering a web hook

```shell
$ http --form POST "https://production-api.gmon.io/webhooks" \
    "Authorization: Bearer $access_token" \
    "account_id=$account_id" \
    "url=$url"
```

```json
{
    "webhook": {
        "account_id": "account_id",
        "id": "webhook_id",
        "url": "http://example.com"
    }
}
```

Each time a matching event occurs, we will make a POST call to the URL you provide. If the call fails,
we will retry up to a maximum of 5 attempts, with exponential backoff.

##### Arguments

<span class="hide">Parameter</span> | <span class="hide">Description</span>
------------------------------------|--------------------------------------
`account_id`<br><span class="label notice">Required</span>|The account to receive notifications for.
`url`<br><span class="label notice">Required</span>|The URL we will send notifications to.

## List web hooks

```shell
$ http "https://production-api.gmon.io/webhooks?account_id=$account_id" \
    "Authorization: Bearer $access_token"
```

```json
{
    "webhooks": [
        {
            "account_id": "acc_000091yf79yMwNaZHhHGzp",
            "id": "webhook_000091yhhOmrXQaVZ1Irsv",
            "url": "http://example.com/callback"
        },
        {
            "account_id": "acc_000091yf79yMwNaZHhHGzp",
            "id": "webhook_000091yhhzvJSxLYGAceC9",
            "url": "http://example2.com/anothercallback"
        }
    ]
}
```

List the web hooks registered on an account.

##### Arguments

<span class="hide">Parameter</span> | <span class="hide">Description</span>
------------------------------------|--------------------------------------
`account_id`<br><span class="label notice">Required</span>|The account to list registered web hooks for.


## Deleting a web hook

```shell
$ http DELETE "https://production-api.gmon.io/webhooks/$webhook_id" \
    "Authorization: Bearer $access_token"
```

```json
{}
```

When you delete a web hook, we will no longer send notifications to it.

## Transaction created

```json
{
    "type": "transaction.created",
    "data": {
        "account_id": "acc_00008gju41AHyfLUzBUk8A",
        "amount": -350,
        "created": "2015-09-04T14:28:40Z",
        "currency": "GBP",
        "description": "Ozone Coffee Roasters",
        "id": "tx_00008zjky19HyFLAzlUk7t",
        "category": "eating_out",
        "is_load": false,
        "settled": true,
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
        }
    }
}
```

Each time a new transaction is created in a user's account, we will immediately send information about it in a `transaction.created` event.

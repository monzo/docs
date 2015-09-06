---
title: Mondo API Reference

language_tabs:
  - shell

includes:
  - errors

search: false
---

# Introduction

> API endpoint

```
https://mini.mondobank.io
```

The Mondo API is designed to be a predictable and intuitive interface for interacting with user's accounts. We offer both a REST API and web hooks.

The API isn't publicly-available at this time, but if you're interested in using it, please get in touch. Similarly, if a feature you'd like is missing, do let us know. As one of the first examples (if not *the* first example) of a widely-available bank API, we're very excited to see what you build!

# Authentication

The Mondo API implements [OAuth 2.0](http://oauth.net/2/), and is only available over HTTPS. A typical OAuth authentication flow involves several steps.

1. [Acquiring](#acquiring-an-access-token) an access token.
2. [Using](#authenticating-requests) the access token to make authenticated requests.
3. [Refreshing](#refreshing-access) the access token when it expires.

<aside class="notice">
Requests <strong>must</strong> be authenticated. Unauthenticated requests will be rejected.
</aside>

## Acquiring an access token

```shell
$ http --form POST "https://mini.mondobank.io/oauth2/token" \
    "grant_type=password" \
    "client_id=$client_id" \
    "client_secret=$client_secret" \
    "username=$user_email" \
    "password=$user_password"
```
```json
{
    "access_token": "access_token",
    "client_id": "client_id",
    "expires_in": 21600,
    "refresh_token": "refresh_token",
    "token_type": "Bearer",
    "user_id": "user_id"
}
```

An access token is tied to both your application (the client) and an individual Mondo user, and is valid for 6 hours.

<aside class="warning">
Your client may only have <em>one</em> active access token at a time, per user. Acquiring a new access token will invalidate any other active access/refresh tokens for that user.
</aside>

##### Arguments

<span class="hide">Parameter</span> | <span class="hide">Description</span>
------------------------------------|--------------------------------------
`grant_type`<br><span class="label notice">Required</span>|Should be `password`
`client_id`<br><span class="label notice">Required</span>|Your client ID
`client_secret`<br><span class="label notice">Required</span>|Your client secret
`username`<br><span class="label notice">Required</span>|The user's email address
`password`<br><span class="label notice">Required</span>|The user's password

## Authenticating requests

```shell
$ http "https://mini.mondobank.io/ping/whoami" \
    "Authorization: Bearer $access_token"
```
```json
{
    "authenticated": true,
    "client_id": "client_id",
    "user_id": "user_id"
}
```

**All** requests must be authenticated with an access token. It is supplied in the `Authorization` header using the `Bearer` scheme.

To get information about an access token, you can call the `/ping/whoami` endpoint.

## Refreshing access

```shell
$ http --form POST "http://localhost:8000/oauth2/token" \
    "grant_type=$refresh_token" \
    "client_id=$client_id" \
    "client_secret=$client_secret" \
    "refresh_token=$refresh_token"
```
```json
{
    "access_token": "access_token_2",
    "client_id": "client_id",
    "expires_in": 21600,
    "refresh_token": "refresh_token_2",
    "token_type": "Bearer",
    "user_id": "user_id"
}
```

To limit the window of opportunity for attackers in the event an access token is compromised, access tokens expire after 6 hours. To gain long-lived access to a user's account, it is necessary to "refresh" your access when it expires using a refresh token. Only ["confidential" clients](https://tools.ietf.org/html/rfc6749#section-2.1) are issued access tokens – "public" clients must ask the user to re-authenticate.

Refreshing an access token will invalidate the previous token, if it is still valid. Refreshing is a one-time operation.

##### Arguments

<span class="hide">Parameter</span> | <span class="hide">Description</span>
------------------------------------|--------------------------------------
`grant_type`<br><span class="label notice">Required</span>|Should be `refresh_token`
`client_id`<br><span class="label notice">Required</span>|Your client ID
`client_secret`<br><span class="label notice">Required</span>|Your client secret
`refresh_token`<br><span class="label notice">Required</span>|The refresh token received along with the original access token

# Pagination

# Object expansion

# Transactions

Transactions are movements of funds into or out of an account. Negative transactions represent debits (ie. *spending* money) and positive transactions represent credits (ie. *receiving* money).

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
            "merchant": null,
            "metadata": {
                "logo_url": "http://pbs.twimg.com/profile_images/474227427648868353/Xrt860cz_400x400.jpeg",
                "tags": "#groceries"
            },
            "notes": ""
        },
    ]
}
```

A list of transactions on the user's account.

##### Arguments

<span class="hide">Parameter</span> | <span class="hide">Description</span>
------------------------------------|--------------------------------------
`account_id`<br><span class="label notice">Required</span>|The account to retrieve transactions from

## Annotate transaction

# Feed items

The Mondo app is organised around the feed – a reverse-chronological stream of events. Transactions are one such feed item, and your application can create its own feed items to surface relevant information to the user.

It's important to keep a few principals in mind when creating feed items:

1. Feed items are *discrete* events that happen at a *point in time*.
2. Because of their prominence within the Mondo app, feed items should contain information of *high value*.

## Create feed item

# Webhooks

Webhooks allow your application to receive real-time, push notification of events in a user's accounts.

## Registering a webhook

## Transaction created

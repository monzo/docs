# Authentication

The Mondo API implements [OAuth 2.0](http://oauth.net/2/), a protocol that lets external apps request authorization to private details in a Mondo user's account without obtaining their password. This also lets users revoke permission to authorized apps at any time, and in time will allow more granular access to their data.

Before getting started developers need to create a client (application) in the [Mondo Developer Portal](https://developers.getmondo.co.uk). This will generate a unique client ID and secret which can be used to authorize yourself and other users to your application.

<aside class="warning">
The client secret must not be shared.
</aside>

Mondo's OAuth implementation supports the standard [Authorization Code Grant](https://tools.ietf.org/html/rfc6749#section-4.1) type. Developers should implement the web application flow described below to obtain an authorization code and then exchange it for an access token.

## Web application flow (Authorization Code Grant)

The Web Application Flow allows your app to request access to private details in another user's Mondo account, without requesting their password. This three step process is often referred to as three-legged authorization, and consists of the following steps:

1. [Redirect the user](#redirect-the-user-to-mondo) to Mondo where they can authorize your application
2. [Mondo redirects the user](#mondo-redirects-back-to-your-app) back to your app with an authorization code
3. [Exchange the authorization code](#exchange-the-authorization-code) for an access token

### Redirect the user to Mondo

```shell
# Your App redirects the web browser to Mondo:
"https://auth.getmondo.co.uk/?client_id=oauthclient_000094QU2tSWpTkuaEhnPd&redirect_uri=http://your.example.com/oauth/callback&response_type=code&state=jjHwiXGC7zSIa0sUhN0U"
```

The first step in the authorization process is redirecting the user to Mondo where they can log in and grant access to your application.

<span class="hide">Parameter</span> | <span class="hide">Description</span>
------------------------------------|--------------------------------------
`client_id`<br><span class="label notice">Required</span>|The client ID you received from Mondo.
`redirect_uri`<br><span class="label notice">Required</span>|The URL in your app where users will be sent after authorization.
`response_type`<br><span class="label notice">Required</span>|This must be set to `code`.
`state`|An unguessable random string which is used to protect against cross-site request forgery attacks.


### Mondo redirects back to your app

```shell
# Mondo redirects the web browser back to your App:
"http://your.example.com/oauth/callback?code=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaSI6Im9hdXRoY2xpZW50XzAwMDA5NFFVMnRTV3BUa3VhRWhuUGQiLCJleHAiOjE0NTM0OTY0MDAsImlhdCI6MTQ1MzQ5NTgwMCwianRpIjoiYXV0aGNvZGVfMDAwMDk0UVV2c084Vm9vSkJucnZNMSIsInVpIjoidXNlcl8wMDAwOTRNNU5ZMzJNODlEdXRhajlHIiwidiI6IjEifQ.YnrvzKPQDvStchGDMjpIvUa-SE-Br0koWZqFxFS4QDQ&state=jjHwiXGC7zSIa0sUhN0U"
```

If the user accepts your request, Mondo redirects back to your app with a temporary code in the `code` parameter as well as the state you provided in the previous step in the `state` parameter. If the states don't match, the request may have been tampered with, and the process should be aborted.

<span class="hide">Parameter</span> | <span class="hide">Description</span>
------------------------------------|--------------------------------------
`code`|The authorization code which can be exchanged for an access token.
`state`|An unguessable random string which is used to protect against cross-site request forgery attacks, which you provided when redirecting to Mondo.

### Exchange the authorization code

```shell
$ http --form POST "https://api.getmondo.co.uk/oauth2/token" \
    "grant_type=authorization_code" \
    "client_id=oauthclient_000094QU2tSWpTkuaEhnPd" \
    "client_secret=s9P2eXmMMbjH+g/TrMIYdQc5oxs7Lv4wOZrtntLXvoVlMvdAauQF/4f8a0zxF+YKTmuQlG2xoGHaZqG/uIyr" \
    "redirect_uri=http://your.example.com/oauth/callback" \
    "code=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaSI6Im9hdXRoY2xpZW50XzAwMDA5NFFVMnRTV3BUa3VhRWhuUGQiLCJleHAiOjE0NTM0OTY0MDAsImlhdCI6MTQ1MzQ5NTgwMCwianRpIjoiYXV0aGNvZGVfMDAwMDk0UVV2c084Vm9vSkJucnZNMSIsInVpIjoidXNlcl8wMDAwOTRNNU5ZMzJNODlEdXRhajlHIiwidiI6IjEifQ.YnrvzKPQDvStchGDMjpIvUa-SE-Br0koWZqFxFS4QDQ"
```

```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaSI6Im9hdXRoY2xpZW50XzAwMDA5NFFYUGJYdnRXbmZZQ2twTUgiLCJleHAiOjE0NTM2NzAzNDksImlhdCI6MTQ1MzQ5NzU0OSwianRpIjoidG9rXzAwMDA5NFFYWDlBTklLMjdxZktjYzUiLCJ1aSI6InVzZXJfMDAwMDk0TTVOWTMyTTg5RHV0YWo5RyIsInYiOiIxIn0.SEhPOg86PmbAwbz4BadK6_UUB36IVL77TfaGeg96WEc",
    "client_id": "oauthclient_000094QU2tSWpTkuaEhnPd",
    "expires_in": 172799,
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhaSI6InRva18wMDAwOTRRWFg5QU5JSzI3cWZLY2M1IiwiY2kiOiJvYXV0aGNsaWVudF8wMDAwOTRRWFBiWHZ0V25mWUNrcE1IIiwiaWF0IjoxNDUzNDk3NTQ5LCJ1aSI6InVzZXJfMDAwMDk0TTVOWTMyTTg5RHV0YWo5RyIsInYiOiIxIn0.0cEnNEYLeBT5F2eT58DqRnwK-iVCk3c2YAEn9uAod28",
    "token_type": "Bearer",
    "user_id": "user_000094M5NY32M89Dutaj9G"
}
```

Once an authorization code is received this can be exchanged by your application for an access token. An access token is tied to both your application (the client) and an individual Mondo user and is valid for several hours.

<aside class="notice">
Your client may only have <em>one</em> active access token at a time, per user. Acquiring a new access token will invalidate any other token you own for that user.
</aside>

<span class="hide">Parameter</span> | <span class="hide">Description</span>
------------------------------------|--------------------------------------
`grant_type`<br><span class="label notice">Required</span>|This must be set to `authorization_code`
`client_id`<br><span class="label notice">Required</span>|The client ID you received from Mondo.
`client_secret`<br><span class="label notice">Required</span>|The client secret which you received from Mondo.
`redirect_uri`<br><span class="label notice">Required</span>|The URL in your app where users were sent after authorization.
`code`<br><span class="label notice">Required</span>|The authorization code you received when the user was redirected back to your app.

## Password Grant

Using the password grant involves:

1. [Acquiring](#acquiring-an-access-token) an access token.
2. [Using](#authenticating-requests) the access token to make authenticated requests.
3. [Refreshing](#refreshing-access) the access token when it expires.

<aside class="warning">
The Password Grant flow can only be used to access your own account. Use the [Authorization Code Grant](#web-application-flow-authorization-code-grant) to request access to another Mondo user's account.
</aside>

### Acquiring an access token

```shell
$ http --form POST "https://api.getmondo.co.uk/oauth2/token" \
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

An access token is tied to both your application (the client) and an individual Mondo user and is valid for several hours.

<aside class="notice">
Your client may only have <em>one</em> active access token at a time, per user. Acquiring a new access token will invalidate any other token you own for that user.
</aside>

##### Arguments

<span class="hide">Parameter</span> | <span class="hide">Description</span>
------------------------------------|--------------------------------------
`grant_type`<br><span class="label notice">Required</span>|Should be `password`.
`client_id`<br><span class="label notice">Required</span>|Your client ID.
`client_secret`<br><span class="label notice">Required</span>|Your client secret.
`username`<br><span class="label notice">Required</span>|The user's email address.
`password`<br><span class="label notice">Required</span>|The user's password.

## Authenticating requests

```shell
$ http "https://api.getmondo.co.uk/ping/whoami" \
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
$ http --form POST "https://api.getmondo.co.uk/oauth2/token" \
    "grant_type=refresh_token" \
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

To limit the window of opportunity for attackers in the event an access token is compromised, access tokens expire after a number of hours. To gain long-lived access to a user's account, it's necessary to "refresh" your access when it expires using a refresh token. Only ["confidential" clients](https://tools.ietf.org/html/rfc6749#section-2.1) are issued refresh tokens – "public" clients must ask the user to re-authenticate.

Refreshing an access token will invalidate the previous token, if it is still valid. Refreshing is a one-time operation.

##### Arguments

<span class="hide">Parameter</span> | <span class="hide">Description</span>
------------------------------------|--------------------------------------
`grant_type`<br><span class="label notice">Required</span>|Should be `refresh_token`.
`client_id`<br><span class="label notice">Required</span>|Your client ID.
`client_secret`<br><span class="label notice">Required</span>|Your client secret.
`refresh_token`<br><span class="label notice">Required</span>|The refresh token received along with the original access token.

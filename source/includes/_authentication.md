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

To limit the window of opportunity for attackers in the event an access token is compromised, access tokens expire after 6 hours. To gain long-lived access to a user's account, it's necessary to "refresh" your access when it expires using a refresh token. Only ["confidential" clients](https://tools.ietf.org/html/rfc6749#section-2.1) are issued access tokens – "public" clients must ask the user to re-authenticate.

Refreshing an access token will invalidate the previous token, if it is still valid. Refreshing is a one-time operation.

##### Arguments

<span class="hide">Parameter</span> | <span class="hide">Description</span>
------------------------------------|--------------------------------------
`grant_type`<br><span class="label notice">Required</span>|Should be `refresh_token`.
`client_id`<br><span class="label notice">Required</span>|Your client ID.
`client_secret`<br><span class="label notice">Required</span>|Your client secret.
`refresh_token`<br><span class="label notice">Required</span>|The refresh token received along with the original access token.

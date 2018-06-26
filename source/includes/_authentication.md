# Authentication

The Monzo API implements [OAuth 2.0](http://oauth.net/2/) to allow users to log in to applications without exposing their credentials. The process involves several steps:

1. [**Acquire**](#acquire-an-access-token) an access token, and optionally a refresh token
2. [**Use**](#authenticating-requests) the access token to make authenticated requests
3. If you were issued a refresh token: [**refresh**](#refreshing-access) the access token when it expires

<aside class="notice">
To get started quickly, you can use the access token from the API playground and avoid implementing the OAuth login flow.
</aside>

Before you begin, you will need to create a client in the [developer tools](https://developers.monzo.com).

### Client confidentiality

Clients are designated either confidential or non-confidential.

* **Confidential** clients keep their client secret hidden. For example, a server-side app that never exposes its secret to users.
* **Non-confidential** clients cannot keep their client secret hidden. For example, client-side apps that store their client secret on the user's device, where it could be intercepted.

    Non-confidential clients are not issued refresh tokens.

## Acquire an access token

Acquiring an access token is a three-step process:

1. [Redirect the user](#redirect-the-user-to-monzo) to Monzo to authorise your app
2. [Monzo redirects the user](#monzo-redirects-back-to-your-app) back to your app with an authorization code
3. [Exchange](#exchange-the-authorization-code) the authorization code for an access token

### Redirect the user to Monzo

```shell
"https://auth.monzo.com/?
    client_id=$client_id&
    redirect_uri=$redirect_uri&
    response_type=code&
    state=$state_token"
```

Send the user to Monzo in a web browser, where they will log in and grant access to their account.

##### URL arguments

<span class="hide">Parameter</span> | <span class="hide">Description</span>
------------------------------------|--------------------------------------
`client_id`<br><span class="label notice">Required</span>|Your client ID.
`redirect_uri`<br><span class="label notice">Required</span>|A URI to which users will be redirected after authorising your app.
`response_type`<br><span class="label notice">Required</span>|Must be set to `code`.
`state`|An unguessable random string used to protect against [cross-site request forgery attacks](https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF)).


### Monzo redirects back to your app

```shell
"https://your.example.com/oauth/callback?
    code=$authorization_code&
    state=$state_token"
```

If the user allows access to their account, Monzo redirects them back to your app.

##### URL arguments

<span class="hide">Parameter</span> | <span class="hide">Description</span>
------------------------------------|--------------------------------------
`code`|A temporary authorization code which will be exchanged for an access token in the next step.
`state`|The same string you provided as `state` when sending the user to Monzo. If this value differs from what you sent, you **must** abort the authentication process.

### Exchange the authorization code

```shell
$ http --form POST "https://api.monzo.com/oauth2/token" \
    "grant_type=authorization_code" \
    "client_id=$client_id" \
    "client_secret=$client_secret" \
    "redirect_uri=$redirect_uri" \
    "code=$authorization_code"
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

When you receive an authorization code, exchange it for an access token. The resulting access token is tied to both your client and an individual Monzo user, and is valid for several hours.

##### Request arguments

<span class="hide">Parameter</span> | <span class="hide">Description</span>
------------------------------------|--------------------------------------
`grant_type`<br><span class="label notice">Required</span>|This must be set to `authorization_code`
`client_id`<br><span class="label notice">Required</span>|The client ID you received from Monzo.
`client_secret`<br><span class="label notice">Required</span>|The client secret which you received from Monzo.
`redirect_uri`<br><span class="label notice">Required</span>|The URL in your app where users were sent after authorisation.
`code`<br><span class="label notice">Required</span>|The authorization code you received when the user was redirected back to your app.

## Authenticating requests

```shell
$ http "https://api.monzo.com/ping/whoami" \
    "Authorization: Bearer $access_token"
```
```json
{
    "authenticated": true,
    "client_id": "client_id",
    "user_id": "user_id"
}
```

**All** requests must be authenticated with an access token supplied in the `Authorization` header using the `Bearer` scheme. Your client may only have *one* active access token at a time, per user. Acquiring a new access token will invalidate any other token you own for that user.

To get information about an access token, you can call the `/ping/whoami` endpoint.


## Refreshing access

```shell
$ http --form POST "https://api.monzo.com/oauth2/token" \
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

##### Request arguments

<span class="hide">Parameter</span> | <span class="hide">Description</span>
------------------------------------|--------------------------------------
`grant_type`<br><span class="label notice">Required</span>|Should be `refresh_token`.
`client_id`<br><span class="label notice">Required</span>|Your client ID.
`client_secret`<br><span class="label notice">Required</span>|Your client secret.
`refresh_token`<br><span class="label notice">Required</span>|The refresh token received along with the original access token.

## Log Out

```shell
$ http --form POST "https://api.monzo.com/oauth2/logout" \
    "Authorization: Bearer $access_token"
```

While access tokens do expire after a number of hours, you may wish to invalidate the token instantly at a specific time such as when a user chooses to log out of your application.

Once invalidated, the user must go through the authentication process again. You will not be able to refresh the access token.

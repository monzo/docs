# Open Banking Tokens

| Token Type    | Expiry                   |
| ------------- | ------------------------ |
| Access        | 30 hours                 |
| Refresh       | 4,320 hours ( ~6 months)  |
| Refresh (VRP) | 26,280 hours ( ~3 years) |

<aside class="notice">
  Refresh tokens are rotated on every successful refresh. The expiry shown is the maximum lifetime of the
  credential.
</aside>

### Refreshing Tokens

Refresh tokens are **single-use**. When a refresh token is exchanged it is immediately invalidated and replaced with a new refresh token.

Clients **must persist the newly issued refresh token atomically** before making any further refresh attempts. Refresh requests must not be made concurrently using the same refresh token.

When interacting with our `/oauth2` endpoints, the most recently issued refresh token must be used. If any previously issued refresh token is used, the request will fail with a `bad_request.refresh_token.invalid` error.

If a refresh token is dropped during rotation, the only recovery path is for the user to complete a new consent flow via the standard redirect journey.

### Open Banking Clients

Our OAuth clients have a limit of 20 active consents per a user. So if a user setups a VRP consent and then make 20 SIPs the VRP consent would be evicted. When a TPP attempts to use the VRP consents a `bad_request.refresh_token.evicted` error will be returned.

Some legacy OAuth clients have a lower limit of 10 active consents, and may therefore encounter eviction more frequently. A small number of older clients also share accounts and payments scopes, which can further increase the likelihood of consent eviction.

### Invalidating tokens

The scenarios above describe common causes of token invalidation, but they are not exhaustive.

We may revoke credentials for additional reasons that we’re unable to provide further detail on for security reasons. Customers can also revoke a TPP’s access at any time via the Monzo app.

When a consent has been revoked or invalidated, the only recovery path is for the user to complete a new consent flow.

# Variable Recurring Payments API

The Variable Recurring Payments (VRP) API lets authorised Payment Initiation Service Providers make outbound payments
from the accounts of our customers in the United Kingdom. Variable Recurring Payments enable multiple payments to be
made under a single long-lived consent without the need for authenticating and approving each payment. Further
information on Variable Recurring Payments can be
found [here](https://www.openbanking.org.uk/variable-recurring-payments-vrps/).

All payments initiated through our Variable Recurring Payments API are sent through Faster Payments.

We've implemented v3.1.10 of
the [Open Banking Domestic Variable Recurring Payments specification](https://openbankinguk.github.io/read-write-api-site3/v3.1.10/profiles/vrp-profile.html)
. All endpoints and models are as outlined in the specifications.


### Base URLs
We've included the Base URLs for our Sandbox and Production environments below.

| <span class="hide">Environment</span> | <span class="hide">Base URL</span> |
|---------------------------------------|--------------------------------------|
| Sandbox                               | `https://openbanking.s101.nonprod-ffs.io/open-banking/v3.1/pisp`|
|  Production                           | `https://openbanking.monzo.com/open-banking/v3.1/pisp`|

## Domestic Variable Recurring Payments

We've implemented version 3.1.10 of
the [Open Banking Domestic Variable Recurring Payments specification](https://openbankinguk.github.io/read-write-api-site3/v3.1.10/profiles/vrp-profile.html)
. All endpoints and models are as outlined in the specifications.

We support account identification using `UK.OBIE.SortCodeAccountNumber`. We don't support identification using
`UK.OBIE.IBAN`.

You can only make payments in `GBP`. We don't support other currencies.

### Omitted Endpoints
We have omitted the implementation of `GET /domestic-vrps/{DomesticVRPId}/payment-details`.

### Variable Recurring Payment Consent Creation

We only support creating consents with a `PeriodicAlignment` of `Consent`. Additionally, we currently only
allow `PeriodType` of `Month` and `Year`.

### Authentication

As per the Open Banking specification, we use OAuth 2 and OpenID connect for authentication. We have implemented the
redirect flow, with authentication taking place in the customer's Monzo app.

We only support the `tls_client_auth` authentication method.

### OAuth2 Tokens
We have extended our refresh token expiry for tokens associated with Variable Recurring Payment Consents to account for their long-lived nature.
Refresh tokens will have an expiry of 3 years (26,280 hours). Access tokens will continue to expire after 30 hours.

## Testing in the Sandbox

In the **sandbox** environment, you can automatically have Variable Recurring Payment Consent requests approved or
declined to help with testing. When creating the consent, you can add a `DesiredStatus` field to
the `Data/Initiation/SupplementaryData` object in the consent request. You can set this field to `Authorised`
or `Rejected`, depending on the behaviour you want.


```json
{
  "DesiredStatus": "Authorised"
}
```


### Sandbox Users

#### Heavy User

UserID: `user_0000A4C4ZChWNMEvew2U77`
AccountID: `acc_0000A4C4ZSskDOixqNPfpR`

#### Medium User

UserID: `user_0000A4C4nqORb7K9YYW3r0`
AccountID: `acc_0000A4C4o66FCYJoERQhHN`

#### Light User

UserID: `user_0000A4C4wkPFE7x9at8Ujp`
AccountID: `acc_0000A4C4wz4Ail0f3sONTV`

## Additional Help

The Open Banking team at Monzo manage the Variable Recurring Payment API. If you require additional assistance, email
us at
[openbanking@monzo.com](mailto:openbanking@monzo.com).

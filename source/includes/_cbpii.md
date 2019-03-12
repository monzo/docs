# CBPII Access

Access for companies authorised as Card Based Payment Instrument Issuers (CBPIIs) under PSD2.

Monzo provide Payments Initiation to firms authorised as Card Based Payment Instrument Issuers. To request access, email `openbanking@monzo.com`.

Access to our CBPII sandbox is available on request and onboarding takes 1 month.

Our CBPII API is based on Version 3.1 of the Open Banking Standard as documented [here](https://openbanking.atlassian.net/wiki/spaces/DZ/pages/937951380/Confirmation+of+Funds+API+Specification+-+v3.1)

## Specifics

* The Monzo CBPII api uses sort code and account number as identifiers
* OAuth2 and OpenID Connect are used
* Only client secret basic authentication is used for the token endpoint
* Our well known sandbox endpoint is: https://api.s101.nonprod-ffs.io/open-banking/.well-known/openid-configuration
* Our well known production endpoint is: https://api.monzo.com/open-banking/.well-known/openid-configuration
* We implement the redirect flow, with authentication happening on the users mobile device

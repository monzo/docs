# PISP Access

Access for companies authorised as [Payment Initiation Service Providers (AISPs)](https://www.fca.org.uk/account-information-service-ais-payment-initiation-service-pis) under PSD2.

Monzo provide Payments Initiation to firms authorised as Payment Initiation Service Providers. To request access, email `openbanking@monzo.com`.

Access to our PISP sandbox is available on request and onboarding takes 1 month.

Our Payments API is based on Version 3.1 of the Open Banking Standard as documented [here](https://openbanking.atlassian.net/wiki/spaces/DZ/pages/937754701/Payment+Initiation+API+Specification+-+v3.1)

## Specifics

* The Monzo Payment Initiation api uses sort code and account number as identifiers
* OAuth2 and OpenID Connect are used
* Only client secret basic authentication is used for the token endpoint
* Our well known sandbox endpoint is: https://api.s101.nonprod-ffs.io/open-banking/.well-known/openid-configuration
* Our well known production endpoint is: https://api.monzo.com/open-banking/.well-known/openid-configuration
* We implement the redirect flow, with authentication happening on the users mobile device
* Consents once created must be turned into payment orders within 24 hours
* Consents once approved by the PSU must be turned into payment orders within 1 hour
* All payments are sent by Faster Payments
* Domestic Single Immediate Payment is the only supported action currently

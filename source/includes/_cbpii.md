# Confirmation of Funds API

The Confirmation of Funds API lets authorised Card Based Payment Instrument Issuers check that Monzo customers have 
enough money for a purchase. 

## Getting Access

To get access to our Open Banking APIs, see the **Dynamic Client Registration** section below.

## Well-Known Endpoints

We've described the paths of our well-known endpoints for the Sandbox and Production environments below.

<span class="hide">Environment</span> | <span class="hide">Path</span>
------------------------------------|--------------------------------------
Sandbox | `https://api.s101.nonprod-ffs.io/open-banking/.well-known/openid-configuration`
Production | `https://api.monzo.com/open-banking/.well-known/openid-configuration`

## Base URLs

We've included the Base URLs for our Sandbox and Production environments below.

##### Base URLs

<span class="hide">Environment</span> | <span class="hide">Base URL</span>
------------------------------------|--------------------------------------
Sandbox | `https://openbanking.s101.nonprod-ffs.io/open-banking/v3.1/cbpii`
Production | `https://openbanking.monzo.com/open-banking/v3.1/cbpii`

## Dynamic Client Registration

We have implemented the `POST /register` endpoint in version 3.2 of the Open Banking Dynamic Client Registration specification. You can find the [full specification here](https://openbanking.atlassian.net/wiki/spaces/DZ/pages/1078034771/Dynamic+Client+Registration+-+v3.2).

You can find the appropriate URL and supported configuration in our [well-known endpoints](/#well-known-endpoints) for each environment.

## Authentication
As per the Open Banking specification, we use OAuth 2 and OpenID connect for authentication. We have implemented the 
redirect flow, with authentication taking place in the customer's Monzo app.

We only support the `tls_client_auth` authentication method.

## Confirmation of Funds
We have implemented version 3.1.2 of the [Open Banking Confirmation of Funds Specification](https://openbanking.atlassian.net/wiki/spaces/DZ/pages/1077806537/Confirmation+of+Funds+API+Specification+-+v3.1.2).

We use the **redirection flow** for approving consents.

You can identify a `DebtorAccount` using the `UK.OBIE.SortCodeAccountNumber` scheme. We'll return an error for any 
other `SchemeName`.

<aside class="info">
<strong>Strong Customer Authentication and Confirmation of Funds (CBPII)</strong><br/>
Monzo will apply Strong Customer Authentication the first time we authenticate a customer for Confirmation of Funds
(CBPII) consents. Since access is limited to information about the customer's balance, consents can be ongoing 
and do <b>not</b> require the customer to regularly re-authenticate.
</aside>

## Additional Help

The Open Banking team at Monzo manage the Confirmation of Funds API. If you require additional assistance, email us at 
[openbanking@monzo.com](mailto:openbanking@monzo.com).

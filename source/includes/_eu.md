# EU PSD2 API

<aside class="notice">
    Monzo's EU PSD2 Dedicated Interface API is currently only available for testing in the sandbox environment. Production API access will be available at a later date. 
</aside>

Our Open Banking APIs return errors in line with the [Open Banking specification](https://openbankinguk.github.io/read-write-api-site3/v3.1.10/profiles/read-write-data-api-profile.html#error-response-structure).

## API Specification

Like our UK Open Banking API, our EU PSD2 Dedicated Interface is also built to the [Open Banking spec](https://openbankinguk.github.io/read-write-api-site3/v3.1.11/profiles/read-write-data-api-profile.html). This means the structure of requests and responses is for the most part the same, with any differences reflecting product differences between UK and EU regions.

## Supported Endpoints

Monzo's EU PSD2 API currently only supports Account Information Services. Payment Initiation Services and the Confirmation of Funds API (CBPII) will be available at a later date.

## Well-Known Endpoints

The Well-Known Endpoints differ from the UK API, and can be seen below:

##### Endpoints

<span class="hide">Environment</span> | <span class="hide">Path</span>
------------------------------------|--------------------------------------
Sandbox | `https://api.s101.nonprod-ffs.io/open-banking/eu/.well-known/openid-configuration`

## Base URLs

The Base URLs also differ, with sandbox now on `openbanking-s101.eu.monzo.com`


##### Base URLs

<span class="hide">Environment</span> | <span class="hide">Base URL</span>
------------------------------------|--------------------------------------
Sandbox | `https://openbanking-s101.eu.monzo.com/open-banking/v3.1/aisp`

## Dynamic Client Registration

We have implemented the `POST /register` endpoint in version 3.2 of the Open Banking Dynamic Client Registration specification. You can find the [full specification here](https://openbanking.atlassian.net/wiki/spaces/DZ/pages/1078034771/Dynamic+Client+Registration+-+v3.2).

You can find the appropriate URL and supported configuration in our [well-known endpoints](#well-known-endpoints) for each environment.

## Authentication

As per the [Open Banking specification](https://openbanking.atlassian.net/wiki/spaces/DZ/pages/83919096/Open+Banking+Security+Profile+-+Implementer+s+Draft+v1.1.2), 
we use OAuth 2 and OpenID connect for authentication. We have implemented the redirect flow, with authentication taking 
place in the customer's Monzo app.

We only support the `tls_client_auth` authentication method.
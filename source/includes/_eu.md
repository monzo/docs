# EU PSD2 API

<aside class="notice">
    Monzo's EU PSD2 Dedicated Interface API is currently only available for testing in the sandbox environment. Please get in touch with us at <a href="mailto:openbanking@monzo.com">openbanking@monzo.com</a> if you'd like to test out our APIs. Production API access will be available at a later date.
</aside>


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

You can find the appropriate URL and supported configuration in our well known endpoint above. 

Differing from DCR requests in the UK, TPPs not registered with the Open Banking directory must use a self-signed (or not signed) SSA. This is where the `alg` claim is set to `none`

### Example DCR Request

> Header

```json
{
  "alg": "PS256",
  "kid": "8ilr3X9lD-oE19ggCRv_ITpSQQc",
  "typ": "JWT"
}
```

> Body

```json
{
  "application_type": "web",
  "aud": "PSDIE-CBI-000000",
  "exp": 1742552600,
  "grant_types": [
    "client_credentials",
    "authorization_code",
    "refresh_token"
  ],
  "iat": 1742549000,
  "id_token_signed_response_alg": "PS256",
  "iss": "278BE778-DCAE-4F7C-9713-89C338F7331C",
  "jti": "279B865B-554E-48E7-89A4-D2705BC607AF",
  "redirect_uris": [
    "https://verify-s101.eu.monzo.com/open-banking/callback"
  ],
  "request_object_signing_alg": "PS256",
  "response_types": [
    "code id_token"
  ],
  "scope": "openid accounts",
  "software_id": "278BE778-DCAE-4F7C-9713-89C338F7331C",
  "software_statement": "eyJhbGciOiJub25lIiwia2lkIjoiIiwidHlwIjoiSldUIn0.eyJpc3MiOiJNb256byBCYW5rIEx0ZCIsImlhdCI6MTc0MjU0OTAwMCwianRpIjoiIiwic29mdHdhcmVfZW52aXJvbm1lbnQiOiJzYW5kYm94Iiwic29mdHdhcmVfbW9kZSI6IlRlc3QiLCJzb2Z0d2FyZV9pZCI6IjI3OEJFNzc4LURDQUUtNEY3Qy05NzEzLTg5QzMzOEY3MzMxQyIsInNvZnR3YXJlX2NsaWVudF9pZCI6IjI3OEJFNzc4LURDQUUtNEY3Qy05NzEzLTg5QzMzOEY3MzMxQyIsInNvZnR3YXJlX2NsaWVudF9uYW1lIjoiTW9uem8iLCJzb2Z0d2FyZV9jbGllbnRfZGVzY3JpcHRpb24iOiJNYW5hZ2UgeW91ciBtb25leSBpbiBvbmUgcGxhY2UiLCJzb2Z0d2FyZV92ZXJzaW9uIjoiMS4wIiwic29mdHdhcmVfY2xpZW50X3VyaSI6Imh0dHBzOi8vZGV2ZWxvcGVycy5tb256by5jb20iLCJzb2Z0d2FyZV9yZWRpcmVjdF91cmlzIjpbImh0dHBzOi8vdmVyaWZ5LXMxMDEuZXUubW9uem8uY29tL29wZW4tYmFua2luZy9jYWxsYmFjayJdLCJzb2Z0d2FyZV9yb2xlcyI6WyJBSVNQIl0sIm9yZ2FuaXNhdGlvbl9jb21wZXRlbnRfYXV0aG9yaXR5X2NsYWltcyI6eyJhdXRob3JpdHlfaWQiOiJGQ0FHQlIiLCJyZWdpc3RyYXRpb25faWQiOiI3MzA0MjciLCJzdGF0dXMiOiJBY3RpdmUiLCJhdXRob3Jpc2F0aW9ucyI6W3sibWVtYmVyX3N0YXRlIjoiR0IiLCJyb2xlcyI6WyJQSVNQIiwiQUlTUCIsIkFTUFNQIl19LHsibWVtYmVyX3N0YXRlIjoiSUUiLCJyb2xlcyI6WyJQSVNQIiwiQUlTUCIsIkFTUFNQIl19LHsibWVtYmVyX3N0YXRlIjoiTkwiLCJyb2xlcyI6WyJBU1BTUCIsIlBJU1AiLCJBSVNQIl19XX0sInNvZnR3YXJlX2xvZ29fdXJpIjoiaHR0cHM6Ly9wdWJsaWMtaW1hZ2VzLm1vbnpvLmNvbS9sb2dvL2F2YXRhcl9ibHVlLnBuZyIsIm9yZ19zdGF0dXMiOiJBY3RpdmUiLCJvcmdfaWQiOiJQU0RJRS1DQkktMDAwMDAwIiwib3JnX25hbWUiOiJNb256byBCYW5rIExpbWl0ZWQiLCJvcmdfY29udGFjdHMiOlt7Im5hbWUiOiJUZWNobmljYWwiLCJlbWFpbCI6Im9wZW5iYW5raW5nQG1vbnpvLmNvbSIsInBob25lIjoiMDc1NTMxMjM4MDciLCJ0eXBlIjoiVGVjaG5pY2FsIn0seyJuYW1lIjoiQnVzaW5lc3MiLCJlbWFpbCI6Im9wZW5iYW5raW5nQG1vbnpvLmNvbSIsInBob25lIjoiMDc1NTMxMjM4MDciLCJ0eXBlIjoiQnVzaW5lc3MifV0sIm9yZ19qd2tzX2VuZHBvaW50IjoiaHR0cHM6Ly9hcGkuczEwMS5ub25wcm9kLWZmcy5pby9vcGVuLWJhbmtpbmcvZXUvandrcy5qc29uIiwib3JnX2p3a3NfcmV2b2tlZF9lbmRwb2ludCI6IiIsInNvZnR3YXJlX2p3a3NfZW5kcG9pbnQiOiIiLCJzb2Z0d2FyZV9qd2tzX3Jldm9rZWRfZW5kcG9pbnQiOiIiLCJzb2Z0d2FyZV9wb2xpY3lfdXJpIjoiaHR0cHM6Ly9tb256by5jb20vbGVnYWwvdGVybXMtYW5kLWNvbmRpdGlvbnMiLCJzb2Z0d2FyZV90b3NfdXJpIjoiaHR0cHM6Ly9tb256by5jb20vbGVnYWwvdGVybXMtYW5kLWNvbmRpdGlvbnMiLCJzb2Z0d2FyZV9vbl9iZWhhbGZfb2Zfb3JnIjoiIn0.",
  "tls_client_auth_subject_dn": "C=GB,O=Monzo Bank Limited,organizationIdentifier=PSDIE-CBI-000000,CN=monzo.com",
  "token_endpoint_auth_method": "tls_client_auth"
}
```

Notes on specific fields: 

#### Header

| Field | Notes |
| ----- | ----- |
| `alg` | Must be `"PS256"` |
| `typ` | Must be `"jwt"` | 


#### Body
| Field | Notes |
| ----- | ----- |
| `software_id` | Must be a valid v4 UUID | 
| `scope` | As only the AIS API is currently supported, must be `"openid accounts"`


> Header


```json
{
  "alg": "none",
  "typ": "JWT"
}
```

### Example SSA

> Body

```json
{
  "iss": "Monzo Bank Ltd",
  "iat": 1742549000,
  "software_environment": "sandbox",
  "software_mode": "Test",
  "software_id": "278BE778-DCAE-4F7C-9713-89C338F7331C",
  "software_client_id": "278BE778-DCAE-4F7C-9713-89C338F7331C",
  "software_client_name": "Monzo",
  "software_client_description": "Manage your money in one place",
  "software_version": "1.0",
  "software_client_uri": "https://developers.monzo.com",
  "software_redirect_uris": [
    "https://verify-s101.eu.monzo.com/open-banking/callback"
  ],
  "software_roles": [
    "AISP"
  ],
  "organisation_competent_authority_claims": {
    "authority_id": "FCAGBR",
    "registration_id": "730427",
    "status": "Active",
    "authorisations": [
      {
        "member_state": "IE",
        "roles": [
          "PISP",
          "AISP",
          "ASPSP"
        ]
      }
    ]
  },
  "software_logo_uri": "https://public-images.monzo.com/logo/avatar_blue.png",
  "org_status": "Active",
  "org_id": "PSDIE-CBI-000000",
  "org_name": "Monzo Bank Limited",
  "org_contacts": [
    {
      "name": "Technical",
      "email": "openbanking@monzo.com",
      "phone": "07553123807",
      "type": "Technical"
    },
    {
      "name": "Business",
      "email": "openbanking@monzo.com",
      "phone": "07553123807",
      "type": "Business"
    }
  ],
  "org_jwks_endpoint": "https://api.s101.nonprod-ffs.io/open-banking/eu/jwks.json",
  "software_policy_uri": "https://monzo.com/legal/terms-and-conditions",
  "software_tos_uri": "https://monzo.com/legal/terms-and-conditions",
}
```


Notes on specific fields: 

#### Header

| Field | Notes |
| ----- | ----- |
| `alg` | Must be set to `"none"` for a self signed software statement, otherwise `"PS256"` |
| `typ` | Must be `"jwt"` |


#### Body
| Field | Notes |
| ----- | ----- |
| `software_id` | Must be a valid v4 UUID | 
| `org_id` | PSD2 Authorization Number, e.g. `"PSDIE-CBI-123456"` |

As per the example in the DCR request above, this should be included in base64 format, ending in `.` to signify a self signed SSA.

## Authentication

As per the [Open Banking specification](https://openbanking.atlassian.net/wiki/spaces/DZ/pages/83919096/Open+Banking+Security+Profile+-+Implementer+s+Draft+v1.1.2), 
we use OAuth 2 and OpenID connect for authentication. We have implemented the redirect flow, with authentication taking 
place in the customer's Monzo app.

We only support the `tls_client_auth` authentication method. 

As per the Well-Known endpoint above, note the `authorization_endpoint` for the sandbox is `https://verify-s101.eu.monzo.com/open-banking/authorize`

## Certificates

We expect the use of eIDAS QWAC and QSealC certificates issued by a QTSP. We currently have a manually maintained allow-list of trusted QTSPs. If we don't currently trust the QTSP that issues your certificate, then please get in touch at <openbanking@monzo.com>.

## EU Account Information Services API

It works in the same way as described in the <a href="/open-banking/#account-information-services-api">Account Information Services API</a>, with some differences outlined below.

### EU Accounts

See the <a href="/open-banking/#accounts">Accounts</a> section.

* In the EU, a customer's pots are returned as accounts.

> Example of a Current Account and Pot returned:

```json
 {
  "Data": {
    "Account": [
      {
        "AccountId": "acc_0000AvDK9NmomdubVdW9jd",
        "Status": "Enabled",
        "StatusUpdateDateTime": "2025-06-17T07:09:35.3Z",
        "Currency": "EUR",
        "AccountType": "Personal",
        "AccountSubType": "CurrentAccount",
        "Description": "Personal Account",
        "Account":
        [
          {
            "SchemeName": "UK.OBIE.IBAN",
            "Identification": "IE05MONZ00000003102060",
            "Name": "Camila McSimpburg"
          }
        ],
        "OpeningDate": "2025-06-17",
        "SwitchStatus": "UK.CASS.NotSwitched"
      },
      {
        "AccountId": "acc_0000Avmn7n4tTdiAoOXbe5",
        "Status": "Enabled",
        "StatusUpdateDateTime": "2025-07-04T09:49:08.53Z",
        "Currency": "EUR",
        "AccountType": "Personal",
        "AccountSubType": "Savings",
        "Description": "Personal Pot",
        "Account":
        [
          {
            "SchemeName": "",
            "Identification": "",
            "Name": "Holiday"
          }
        ],
        "OpeningDate": "2025-07-04",
    },
    ]
  },
  "Links": {
    "Self": "https://openbanking.s101.nonprod-ffs.io/open-banking/v3.1/aisp/accounts"
  },
  "Meta": {}
}
```

### EU Balances
See  <a href="/open-banking/#balances">Balances</a> section.

* `includePots` parameter is not supported, as pots are presented as separate accounts in the EU.

### EU Pots

<aside class="warning">
    We do not support the <a href="/open-banking/#pots">pots endpoint</a> for the EU. Please use the <a href="/open-banking/#eu-accounts">EU Accounts endpoint</a> to fetch the list of pots.
</aside>

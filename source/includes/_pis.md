# Payment Initiation Services API

The Payment Initiation Services API lets authorised Payment Initiation Service Providers make outbound payments from 
the accounts of our customers in the United Kingdom. All payments initiated through our Payment Initiation Services 
API are sent through Faster Payments.

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
Sandbox | `https://openbanking.s101.nonprod-ffs.io/open-banking/v3.1/pisp`
Production | `https://openbanking.monzo.com/open-banking/v3.1/pisp`

## Dynamic Client Registration

We have implemented the `POST /register` endpoint in version 3.2 of the Open Banking Dynamic Client Registration specification. You can find the [full specification here](https://openbanking.atlassian.net/wiki/spaces/DZ/pages/1078034771/Dynamic+Client+Registration+-+v3.2).

You can find the appropriate URL and supported configuration in our [well-known endpoints](#well-known-endpoints) for each environment.

## Authentication

As per the Open Banking specification, we use OAuth 2 and OpenID connect for authentication. We have implemented the 
redirect flow, with authentication taking place in the customer's Monzo app.

We only support the `tls_client_auth` authentication method.

Once created, you'll need to turn any consent into a payment order within 24 hours. Once the consent is approved, you'll
have one hour.

## Domestic Payments

We've implemented version 3.1.10 of the [Open Banking Domestic Payments specification](https://openbankinguk.github.io/read-write-api-site3/v3.1.10/resources-and-data-models/pisp/domestic-payments.html).

When you request a consent for Domestic Payments, you should provide `UK.OBIE.FPS` as the `LocalInstrument`.

We support account identification using `UK.OBIE.SortCodeAccountNumber`. We don't support identification using 
`UK.OBIE.IBAN`.

You can only make payments in `GBP`. We don't support other currencies.

<aside class="notice">
If there are insufficient funds in the account, authorisation will fail and an error will be returned on redirection with the code `access_denied` and `error_description` being "Insufficient funds in selected account to make requested payment."
</aside>

### Domestic Payments Limits

There are default limits for daily outbound payments:

| Account type                       | Default limit |
| -----------------------------------| ------------- |
| Personal                           | £10000        |
| Joint                              | £10000        |
| Business (sole trader)             | £25000        |
| Business (private limited company) | £50000        |

<aside class="notice">
Please note that limits for business account are different depending on business company type.  See <a href="#business-account-company-types">Account Information Services API - Business company types</a> for details.
</aside>

<aside class="notice">
Please note that these are <b>default</b> limits applied to payments and can be increased if asked by the customer.
</aside>

## Scheduled Payments

We've implemented version 3.1.10 of the [Open Banking Scheduled Payments specification](https://openbankinguk.github.io/read-write-api-site3/v3.1.10/resources-and-data-models/aisp/scheduled-payments.html).

For consistency with our internal systems and the rest of our API, you will need to provide times in **RFC3339 format.**

When you request a consent for Domestic Payments, you should provide `UK.OBIE.FPS` as the `LocalInstrument`.

We support account identification using `UK.OBIE.SortCodeAccountNumber`. We don't support identification using 
`UK.OBIE.IBAN`.

At the moment, we don't support the `payment-details` endpoint.

You can only make payments in `GBP`. We don't support other currencies.

<aside class="notice">
All of our scheduled payments are sent in the early hours of the morning on the day you request.
</aside>

## Standing Orders

We have implemented version 3.1.10 of the [Open Banking Standing Order specification](https://openbankinguk.github.io/read-write-api-site3/v3.1.10/resources-and-data-models/aisp/standing-orders.html).

For consistency with our internal systems and the rest of our API, you will need to provide times in **RFC3339 format.**

We support a subset of the standing order frequencies laid out in the specification. These are the same as the 
frequencies we support in the Monzo app.

<span class="hide">Supported Frequency</span> | <span class="hide">Description</span>
------------------------------------|--------------------------------------
`EvryDay` | Every day (including weekends)
`IntrvlWkDay` | We allow the week interval to be `1` (every week), `2` (every 2 weeks) or `4` (every 4 weeks). We ignore the day specified, and instead repeat based on the day of the week of the `FirstPaymentDate`.
`IntrvlMnthDay` | We allow the month interval to be `1` (every month), `3` (every quarter) or `12` (every year). We ignore the day of month and repeat based on the day of month of the `FirstPaymentDate`.

We support account identification using `UK.OBIE.SortCodeAccountNumber`. We don't support identification using 
`UK.OBIE.IBAN`.

Since we use the `FirstPaymentDate` to decide when payments will repeat, we don't use the `RecurringPaymentDateTime` or 
`RecurringPaymentAmount` fields. We'll return an error if you include them.

You can make standing orders with an end date by specifying either a `NumberOfPayments` or a `FinalPaymentDateTime`, but
we don't let you include both.

At the moment, we don't support the `payment-details` endpoint.

You can only make payments in `GBP`. We don't support other currencies.

## International Payments

We've implemented version 3.1.11 of the [Open Banking International Payments specification](https://openbankinguk.github.io/read-write-api-site3/v3.1.11/resources-and-data-models/pisp/international-payments.html).

### International Payment Consent 
```json
{
  "Data":
  {
    "Initiation":
    {
      "CurrencyOfTransfer": "EUR",
      "DestinationCountryCode": "GB",
      "EndToEndIdentification": "FRESCO.21302.GFX.20",
      "InstructionIdentification": "ACME413",
      "LocalInstrument": "UK.OBIE.SEPACreditTransfer",
      "CreditorAccount":
      {
        "SchemeName": "UK.OBIE.IBAN",
        "Identification": "GB62MONZ12345708578920",
        "Name": "Name Surname"
      },
      "ExchangeRateInformation":
      {
        "RateType": "Indicative",
        "UnitCurrency": "GBP"
      },
      "InstructedAmount":
      {
        "Amount": "100.00",
        "Currency": "GBP"
      },
      "RemittanceInformation":
      {
        "Reference": "FRESCO-101",
        "Unstructured": "Internal ops code 5120101"
      }
    },
    "ReadRefundAccount": "Yes"
  },
  "Risk":
  {
    "PaymentContextCode": "TransferToThirdParty",
    "BeneficiaryAccountType": "Personal"
  }
}
```

Note that we only support indicative exchange rates (`ExchangeRateInformation.RateType` must be set to `Indicative`).

### International Payment currencies and rails support

The table below outlines the currencies and supported payment rails, along with the required parameters for the `Initiation` object (`-` indicates that the parameter is not required).

| CurrencyOfTransfer | LocalInstrumentCode          | CreditorAccount.SchemeName | CreditorAccount.Identification | CreditorAccount.SecondaryIdentification | CreditorAgent.SchemeName | CreditorAgent.Identification | Creditor.PostalAddress | Notes                                                                        |
|--------------------|------------------------------|----------------------------|--------------------------------|-----------------------------------------|--------------------------|------------------------------|------------------------|------------------------------------------------------------------------------|
| AUD                | -                            | `UK.OBIE.BBAN`             | Account Number                 | -                                       | `UK.OBIE.NCC.AU`         | BSB Code                     | -                      |                                                                              |
| AUD                | -                            | `UK.MONZO.BPAY`            | Biller Pay Code                | Customer Reference Number               | -                        | -                            | -                      | `Risk.BeneficiaryAccountType` must be `Business` or `BusinessSavingsAccount` |
| CAD                | -                            | `UK.OBIE.BBAN`             | Account Number                 | -                                       | `UK.OBIE.NCC.CA`         | 8-digit Routing Number       | Required               |                                                                              |
| CAD                | -                            | `UK.MONZO.Interac`         | Email Address                  | -                                       | -                        | -                            | Required               |                                                                              |
| EUR                | `UK.OBIE.SEPACreditTransfer` | `UK.OBIE.IBAN`             | IBAN                           | -                                       | -                        | -                            | -                      |                                                                              |
| EUR                | `UK.OBIE.SWIFT`              | `UK.OBIE.IBAN`             | IBAN                           | -                                       | `UK.OBIE.BICFI`          | BIC                          | -                      |                                                                              |
| INR                | -                            | `UK.OBIE.BBAN`             | Account Number                 | -                                       | `UK.OBIE.NCC.IN`         | IFSC Code                    | -                      |                                                                              |
| INR                | -                            | `UK.MONZO.UPI`             | UPI ID (`customername@bank`)   | -                                       | -                        | -                            | -                      |                                                                              |
| RON                | -                            | `UK.OBIE.IBAN`             | IBAN                           | -                                       | `UK.OBIE.BICFI`          | BIC                          | Required               |                                                                              |
| USD                | `UK.MONZO.ABA`               | `UK.OBIE.BBAN`             | Account Number                 | -                                       | `UK.OBIE.NCC.US`         | ABA Routing Number           | Required               |                                                                              |
| USD                | `UK.MONZO.FEDWIRE`           | `UK.OBIE.BBAN`             | Account Number                 | -                                       | `UK.OBIE.NCC.US`         | Fedwire Routing Number       | Required               |                                                                              |
| USD                | `UK.OBIE.SWIFT`              | `UK.OBIE.BBAN`             | Account Number                 | -                                       | `UK.OBIE.BICFI`          | BIC                          | Required               |                                                                              |

`CreditorAccount.Name` is required for all currencies.

`Initiation.DestinationCountryCode` is required for all currencies.

If `Creditor.PostalAddress` is required, the following fields must be provided:

  * `TownName`
  * `PostCode`
  * Either `AddressLine` or `BuildingNumber` + `StreetName`

`Risk.BeneficiaryAccountType` is required and supports the following values:
  * `Personal`
  * `JointPersonal`
  * `PersonalSavingsAccount`
  * `Business`
  * `BusinessSavingsAccount`

For USD payments, the account type (`Checking` or `Savings`) is determined based on `Risk.BeneficiaryAccountType`.

<aside class="notice">
If there are insufficient funds in the account, authorisation will fail and an error will be returned on redirection with the code `access_denied` and `error_description` being "Insufficient funds in selected account to make requested payment."
</aside>

### International Payment Order

The consent's `CutOffDateTime` is set to 30 minutes after creation. A payment must be initiated within this timeframe (otherwise the payment order will be automatically rejected).

```json
{
  "Data":
  {
    "ConsentId": "obpispinternationalpaymentconsent_0000Ar128pFItDBIlaJ9fd",
    "Initiation":
    {
      "CurrencyOfTransfer": "EUR",
      "DestinationCountryCode": "GB",
      "EndToEndIdentification": "FRESCO.21302.GFX.20",
      "InstructionIdentification": "ACME413",
      "LocalInstrument": "UK.OBIE.SEPACreditTransfer",
      "CreditorAccount":
      {
        "SchemeName": "UK.OBIE.IBAN",
        "Identification": "GB62MONZ12345708578920",
        "Name": "Name Surname"
      },
      "ExchangeRateInformation":
      {
        "RateType": "Indicative",
        "UnitCurrency": "GBP"
      },
      "InstructedAmount":
      {
        "Amount": "100.00",
        "Currency": "GBP"
      },
      "RemittanceInformation":
      {
        "Reference": "FRESCO-101",
        "Unstructured": "Internal ops code 5120101"
      }
    }
  },
  "Risk":
  {
    "PaymentContextCode": "TransferToThirdParty",
    "BeneficiaryAccountType": "Personal"
  }
}
```

## Refund Accounts
```json
{
  "Data": {
    "Initiation": {
      "CreditorAccount": {
        "Identification": "12345612345678",
        "SchemeName": "UK.OBIE.SortCodeAccountNumber"
      },
      "ReadRefundAccount": "Yes"
    }
  }
}
```
We have enabled reading refund account details as part of domestic and international payment consent resource creation, if requested by the PISP. To read the refund account details set the `ReadRefundAccount` field to `Yes` in the consent creation request.

The refund account data will be returned in the payment order creation response. The name on the refund account should pass any confirmation of payee checks.

```json
{
  "Data": {
    "Initiation": {
      "CreditorAccount": {
        "SchemeName": "UK.OBIE.SortCodeAccountNumber",
        "Identification": "12345612345678"
      }
    },
    "ConsentId": "obpispdomesticpaymentconsent_0000AJ93jc7CkiSo8cYCzx",
    "DomesticPaymentId": "obdompayment_0000AJ93nDHX1aE8HE66YT",
    "CreationDateTime": "2022-05-05T14:47:36.545Z",
    "Status": "Pending",
    "StatusUpdateDateTime": "2022-05-05T14:47:36.545Z",
    "ExpectedExecutionDateTime": "2022-05-05T14:47:36.545Z",
    "ExpectedSettlementDateTime": "2022-05-05T14:47:36.545Z",
    "Refund": {
      "Account": {
        "SchemeName": "UK.OBIE.SortCodeAccountNumber",
        "Identification": "12345612345678",
        "Name": "First Last"
      }
    },
    "Debtor": {
      "Name": "First Last",
      "SchemeName": "UK.OBIE.SortCodeAccountNumber",
      "Identification": "12345612345678"
    }
  },
  "Links": {
    "Self": "https://openbanking.s101.nonprod-ffs.io/open-banking/v3.1/pisp/obpispdomesticpaymentconsent_0000AJ93jc7CkiSo8cYCzx"
  },
  "Meta": {}
}

```

## Rejected Payments

When a payment is rejected, we aim to provide TPPs with as much detail as possible. If available, the specific reason for the rejection will be included in the response. TPPs can find the rejection reason within the `RejectionReason` field in the following locations, depending on the type of payment:

- Single Immediate Payments (SIPs)
  - `Data/Initiation/SupplementaryData` [OBDomestic2](https://openbankinguk.github.io/read-write-api-site3/v3.1.10/resources-and-data-models/pisp/domestic-payment-consents.html#obdomestic2)
- Variable Recurring Payments (VRPs)
  - `Data/Instruction/SupplementaryData` [OBDomesticVRPInstruction](https://openbankinguk.github.io/read-write-api-site3/v3.1.10/resources-and-data-models/vrp/domestic-vrps.html#obdomesticvrpinstruction)

| Rejection Reason                                | Description                                                                   |
| ----------------------------------------------- | ----------------------------------------------------------------------------- |
| `Insufficient funds`                            | The account does not have enough funds to make the transfer.                  |
| `Something went wrong`                          | We've retired making the payment, but have failed too many times              |
| `FPS not acknowledged`                          | The beneficiary bank hasn't accepted our FPS message                          |
| `Additional security checks were not completed` | The customer either abandoned or cancelled the additional security check flow |
| `Payment reference contains offensive language` | We don't allow references to contain offensive language                       |
| `Payment limits exceeded`                       | The payment would exceed the customer's limits                                |
| `Scheme limits exceeded`                        | The payment would exceed the scheme's limit                                   |

### Other Rejection Scenarios

In some cases, we may not be able to provide specific details about why a payment was rejected. If none of the listed rejection reasons apply, you may encounter the following messages:

**Please ask the customer to contact customer support**:  
For further details on the rejection, the customer will need to get in touch with Monzo's customer support team which they can do via the in-app chat.

**Sorry, we're unable to provide additional information on why this payment was rejected**:  
In certain circumstances, we're unable to share any further information regarding why the payment was rejected.


## Testing in the Sandbox

In the **sandbox** environment, you can automatically have domestic payment requests approved or declined to help with testing. When creating the payment consent, you can add a `DesiredStatus` field to the `Data/Initiation/SupplementaryData` object in the consent request. You can set this field to `Authorised` or `Rejected`, depending on the behaviour you want.

If you want your payment to come from a specific User and Account then you can also add those values, but you must add **both** or a random test User and Account is used instead.

We require that the `SupplementaryData` content is provided in the same order between the consent creation request and the payment request.

```json
{
  "DesiredStatus": "Authorised"
}
```

```json
{
  "DesiredStatus": "Rejected",
  "UserID": "user_000xxx",
  "AccountID": "account_000yyy"
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

The Open Banking team at Monzo manage the Payment Initiation Services API. If you require additional assistance, email us at 
[openbanking@monzo.com](mailto:openbanking@monzo.com).

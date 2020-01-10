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

You can find the appropriate URL and supported configuration in our [well-known endpoints](/#well-known-endpoints) for each environment.

## Authentication

As per the Open Banking specification, we use OAuth 2 and OpenID connect for authentication. We have implemented the 
redirect flow, with authentication taking place in the customer's Monzo app.

We only support the `tls_client_auth` authentication method.

Once created, you'll need to turn any consent into a payment order within 24 hours. Once the consent is approved, you'll
have one hour.

## Domestic Payments

We've implemented version 3.1.2 of the [Open Banking Domestic Payments specification](https://openbanking.atlassian.net/wiki/spaces/DZ/pages/1077805881/Domestic+Payments+v3.1.2).

When you request a consent for Domestic Payments, you should provide `UK.OBIE.FPS` as the `LocalInstrument`.

We support account identification using `UK.OBIE.SortCodeAccountNumber`. We don't support identification using 
`UK.OBIE.IBAN`.

You can only make payments in `GBP`. We don't support other currencies.

## Scheduled Payments

We've implemented version 3.1.2 of the [Open Banking Scheduled Payments specification](https://openbanking.atlassian.net/wiki/spaces/DZ/pages/1077805996/Domestic+Scheduled+Payment+v3.1.2).

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

We have implemented version 3.1.2 of the [Open Banking Standing Order specification](https://openbanking.atlassian.net/wiki/spaces/DZ/pages/1077806077/Domestic+Standing+Orders+v3.1.2).

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

## Testing in the Sandbox

In the **sandbox** environment, you can automatically have domestic payment requests approved or declined to help with testing. When creating the payment consent, you can add a `DesiredStatus` field to the `Data/Initiation/SupplementaryData` object in the consent request. You can set this field to `Authorised` or `Rejected`, depending on the behaviour you want.

If you want your payment to come from a specific User and Account then you can also add those values, but you must add **both** or a random test User and Account is used instead.

```
{
  "DesiredStatus": "Authorised"
}
```

```
{
  "DesiredStatus": "Rejected",
  "UserID": "user_000xxx",
  "AccountID": "account_000yyy"
}
```

## Additional Help

The Open Banking team at Monzo manage the Payment Initiation Services API. If you require additional assistance, email us at 
[openbanking@monzo.com](mailto:openbanking@monzo.com).

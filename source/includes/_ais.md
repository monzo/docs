# Account Information Services API

The Account Information Services API lets authorised Account Information Service Providers access balances, transactions, 
and more for our customers in the United Kingdom.

## Getting Access

The Open Banking team at Monzo manage access to the Account Information Services API. To get in touch, email us at 
[openbanking@monzo.com](mailto:openbanking@monzo.com).

## Well-Known Endpoints

We've described the paths of our well-known endpoints for the Sandbox and Production environments below.

##### Endpoints

<span class="hide">Environment</span> | <span class="hide">Path</span>
------------------------------------|--------------------------------------
Sandbox | `https://api.s101.nonprod-ffs.io/open-banking/.well-known/openid-configuration`
Production | `https://api.monzo.com/open-banking/.well-known/openid-configuration`

## Base URLs

We've included the Base URLs for our Sandbox and Production environments below.

##### Base URLs

<span class="hide">Environment</span> | <span class="hide">Base URL</span>
------------------------------------|--------------------------------------
Sandbox | `https://openbanking.s101.nonprod-ffs.io/open-banking/v3.1/aisp`
Production | `https://openbanking.monzo.com/open-banking/v3.1/aisp`

## Authentication

As per the [Open Banking specification](https://openbanking.atlassian.net/wiki/spaces/DZ/pages/83919096/Open+Banking+Security+Profile+-+Implementer+s+Draft+v1.1.2), 
we use OAuth 2 and OpenID connect for authentication. We have implemented the redirect flow, with authentication taking 
place in the customer's Monzo app.

We only support the `tls_client_auth` authentication method.

## Accounts

We've implemented version 3.1.2 of the [Open Banking accounts specification](https://openbanking.atlassian.net/wiki/spaces/DZ/pages/1077805362/Accounts+v3.1.2).

Once you have a consent for a customer, you'll be able to see their:

* Personal (individual) accounts
* Joint accounts
* Business accounts

If the account has been closed, it will still be returned in the response, but with an updated `Status`.

<aside class="notice">
To access a customer's Pots, use the Pots endpoint described further on in this documentation.
</aside>

## Balances

We've implemented version 3.1.2 of the [Open Banking balances specification](https://openbanking.atlassian.net/wiki/spaces/DZ/pages/1077805375/Balances+v3.1.2).

When you query this endpoint, you'll see the customer's `InterimAvailable` balance. This is the same real-time balance 
that our customers see in the Monzo app, and it includes pending and settled transactions.

## Transactions

We've implemented version 3.1.2 of the [Open Banking transactions specification](https://openbanking.atlassian.net/wiki/spaces/DZ/pages/1077805388/Transactions+v3.1.2).

For consistency with our internal systems and the rest of our API, you will need to provide the start and end times in 
[**RFC3339 format**](https://www.ietf.org/rfc/rfc3339.txt).

Your consent needs to have either the `ReadTransactionsBasic` or `ReadTransactionsDetail` permissions to access 
this endpoint.

When you query this endpoint, you'll receive all of the transactions that the customer made in the date range specified 
in the request. Like in the Monzo app, we organise transactions in this response based on creation (presentment) time,
not the time the transaction settles.

Transaction amounts can change after the transaction is first created, and you can use the `Status` field to help 
identify transactions that are still pending.

You'll only be allowed to fetch transactions that were made in the range defined by `TransactionFromDateTime` and 
`TransactionToDateTime` in your consent. If you try to access transactions outside this range, it won't work.

## Parties

We've implemented version 3.1.2. of the [Open Banking parties specification](https://openbanking.atlassian.net/wiki/spaces/DZ/pages/1077805687/Parties+v3.1.2)

We have only implemented `GET /party` endpoint, and not the account-specific endpoints. This returns the customer's 
ID, their preferred name, and their legal name.

<aside class="notice">
You should use the customer's preferred name when you talk to them.
</aside>

Your consent needs to have the `ReadPartyPSU` permission to access this endpoint.

<aside class="warning">
<strong>Strong Customer Authentication Needed</strong><br/>
If it's been more than 5 minutes since the customer completed Strong Customer Authentication with 
your client, you'll get a Forbidden error when you try to access this endpoint.  
</aside>

## Pots

Since Pots on Monzo have lots of additional properties that AISPs might find useful, we have implemented a Pots 
endpoint as an extension to the Open Banking specification.

### List Pots

```json
 {
    "Data": {
        "Pot": [
            {
                "PotId": "pot_00009g4AB7nItyHI3R7CVt",
                "AccountId": "acc_00009JrJEKwJrNqKfjwSS",
                "Name": "Savings",
                "Type": "default",
                "CreditDebitIndicator": "Debit",
                "Balance": {
                    "Amount": "5.0000",
                    "Currency": "GBP"
                },
                "Style": "cassette",
                "Goal": {
                    "Amount": "1000.0000",
                    "Currency": "GBP"
                },
                "Created": "2019-02-21T17:13:39.315Z",
                "Updated": "2019-02-21T17:13:39.315Z",
                "Status": "Open"
            },
            {
                "PotId": "pot_00009kIt1QKIXu98cu1RM9",
                "AccountId": "acc_00009JrJEKwJrNqKfjwSS",
                "Name": "Bobs And Bits",
                "Type": "flexible_savings",
                "CreditDebitIndicator": "Debit",
                "Balance": {
                    "Amount": "1000.0000",
                    "Currency": "GBP"
                },
                "Style": "",
                "ImageUrl": "...",
                "Goal": {
                    "Amount": "9999.0000",
                    "Currency": "GBP"
                },
                "Created": "2019-06-28T11:10:29.478Z",
                "Updated": "2019-06-28T11:11:09.173Z",
                "Status": "Open"
            },
            {
                "PotId": "pot_00009kIt8JXWB3R9bYUWkD",
                "AccountId": "acc_00009JrJEKwJrNqKfjwSS",
                "Name": "My Savings Pot",
                "Type": "fixed_savings",
                "CreditDebitIndicator": "Debit",
                "Balance": {
                    "Amount": "1100.0000",
                    "Currency": "GBP"
                },
                "Style": "cassette",
                "LockType": "until_date",
                "LockedUntil": "2020-07-01T00:00:00Z",
                "Created": "2019-06-28T11:11:44.195Z",
                "Updated": "2019-06-28T11:11:44.195Z",
                "Status": "Open"
            }
        ]
    }
}
```

##### Endpoints

<span class="hide"></span> | <span class="hide"></span>
------------------------------------|--------------------------------------
Sandbox | `https://openbanking.s101.nonprod-ffs.io/open-banking/v3.1/aisp/pots`
Production | `https://openbanking.monzo.com/open-banking/v3.1/aisp/pots`

Note that the fields we return as part of the response depend on whether your consent has the  `ReadAccountsBasic` 
or `ReadAccountsDetailed` permission. In the former case, we will omit the Pot name and Image URL from the response.

We'll only return open pots as part of our response. If a customer closes a pot, it won't appear in the response
any more.

## Direct Debits

We've implemented version 3.1.2 of the [Open Banking Direct Debits specification](https://openbanking.atlassian.net/wiki/spaces/DZ/pages/1077805417/Direct+Debits+v3.1.2).

We have only implemented `GET /direct-debits` endpoint, and not the account-specific endpoints.

Your consent needs to have the `ReadDirectDebits` permission to access this endpoint.

<aside class="warning">
<strong>Strong Customer Authentication and Direct Debits</strong><br/>
If it's been more than 5 minutes since the customer completed Strong Customer Authentication, you'll only be able to
access Direct Debits that were collected within the last 90 days.
</aside>

## Scheduled Payments

We've implemented version 3.1.2 of the [Open Banking Scheduled Payments specification](https://openbanking.atlassian.net/wiki/spaces/DZ/pages/1077805716/Scheduled+Payments+v3.1.2).

We have only implemented `GET /scheduled-payments` endpoint, and not the account-specific endpoints.

Your consent needs to have either the `ReadScheduledPaymentsBasic` or `ReadScheduledPaymentsDetail` permissions to access this endpoint.

<aside class="info">
<strong>Strong Customer Authentication and Scheduled Payments</strong><br/>
You can access all scheduled payments as long as the customer has completed Strong Customer Authentication in the last
90 days. 
</aside>

## Standing Orders

We've implemented version 3.1.2 of the [Open Banking Standing Orders specification](https://openbanking.atlassian.net/wiki/spaces/DZ/pages/1077805430/Standing+Orders+v3.1.2).

We have only implemented `GET /standing-orders` endpoint, and not the account-specific endpoints.

Your consent needs to have either the `ReadStandingOrdersBasic` or `ReadStandingOrdersDetail` permissions to access this endpoint.

<aside class="warning">
<strong>Strong Customer Authentication and Standing Orders</strong><br/>
If it's been more than 5 minutes since the customer completed Strong Customer Authentication, you'll only be able to
access standing orders that have been executed in the last 90 days. You'll also be able to access any standing orders
where the first payment is in the future and hasn't yet been executed. 
</aside>

## Testing in the Sandbox

Our Sandbox environment is a handy playground where you can test your integration before putting it live.
**We run exactly the same code in our sandbox environment as we do production** to make switching between 
them as easy as possible.

In the **sandbox** environment, you can automatically have account information consents approved or declined to 
help with testing. To do this, you should set some specific fields in the `Data/SupplementaryData` object:

```
{
  "DesiredStatus": "Authorised",
  "UserID": "user_000xxx"
}
```

<aside class="notice">
The <code>Data/SupplementaryData</code> object in an Account Consent request is not part of the Open Banking 
specification, but we accept it specifically in the Sandbox environment to mirror how we allow consent automatic 
approval in the Payment Initiation API.
</aside>

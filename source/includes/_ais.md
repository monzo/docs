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

Although we support `client_secret_basic` authentication, our preferred authentication method is `tls_client_auth` and 
we won't issue you with a client secret unless you ask for one.

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

Of the three endpoints defined we have implemented the third: `GET /party`. This returns the customer's ID, their preferred name and their legal name.

<aside class="notice">
You should use the customer's preferred name when you talk to them.
</aside>

Your consent needs to have the `ReadPartyPSU` permission to access this endpoint.

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

We'll only return open pots as part of our response.

## Testing in the Sandbox

In the **sandbox** environment, you can automatically have account information consents approved or declined to help with testing. To do this, you should set some specific fields in the `Data/Initiation/SupplementaryData` object:

<code>
{
  "DesiredStatus: "Authorised", // You can also set this to "Rejected"
  "UserID": "user_000xxx" // You should use the UserID of your test user
}
</code>

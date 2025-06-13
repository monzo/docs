# Account Information Services API

The Account Information Services API lets authorised Account Information Service Providers access balances, transactions, 
and more for our customers in the United Kingdom.

## Getting Access

To get access to our Open Banking APIs, see the **Dynamic Client Registration** section below.

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

## Dynamic Client Registration

We have implemented the `POST /register` endpoint in version 3.2 of the Open Banking Dynamic Client Registration specification. You can find the [full specification here](https://openbanking.atlassian.net/wiki/spaces/DZ/pages/1078034771/Dynamic+Client+Registration+-+v3.2).

You can find the appropriate URL and supported configuration in our [well-known endpoints](#well-known-endpoints) for each environment.

## Authentication

As per the [Open Banking specification](https://openbanking.atlassian.net/wiki/spaces/DZ/pages/83919096/Open+Banking+Security+Profile+-+Implementer+s+Draft+v1.1.2), 
we use OAuth 2 and OpenID connect for authentication. We have implemented the redirect flow, with authentication taking 
place in the customer's Monzo app.

We only support the `tls_client_auth` authentication method.

## Accounts

```json
 {
  "Data": {
    "Account": [
      {
        "AccountId": "acc_0000AAca1egQMHUQX14Mt7",
        "Status": "Enabled",
        "StatusUpdateDateTime": "2021-08-23T15:46:29.775Z",
        "Currency": "GBP",
        "AccountType": "Personal",
        "AccountSubType": "CurrentAccount",
        "Description": "Personal Account",
        "Account": [
          {
            "SchemeName": "UK.OBIE.SortCodeAccountNumber",
            "Identification": "12345699155454",
            "Name": "Camila McSimpburg"
          },
          {
            "SchemeName": "UK.OBIE.IBAN",
            "Identification": "GB25MONZ12345699155454",
            "Name": "Camila McSimpburg"
          }
        ],
        "OpeningDate": "2021-08-23",
        "SwitchStatus": "UK.CASS.NotSwitched"
      }
    ]
  },
  "Links": {
    "Self": "https://openbanking.s101.nonprod-ffs.io/open-banking/v3.1/aisp/accounts"
  },
  "Meta": {}
}
```

We've implemented version 3.1.10 of the [Open Banking accounts specification](https://openbankinguk.github.io/read-write-api-site3/v3.1.10/resources-and-data-models/aisp/Accounts.html).

Once you have a consent for a customer, you'll be able to see their:

* Personal (individual) accounts
* Joint accounts
* Business accounts
* Flex account

If the account has been closed, it will still be returned in the response, but with an updated `Status`.

<aside class="notice">
To access a customer's Pots, use the Pots endpoint described further on in this documentation.
</aside>

Note that the fields we return as part of the response depend on whether your consent has the  `ReadAccountsBasic`
or `ReadAccountsDetail` permission. In the former case, we will omit the account scheme data such as account number and sort code or IBAN.

### Business Account - Company types

Business account has company type, which is shown in the `Description` field:

| Company type            | Description field         |
| ------------------------| ------------------------- |
| Sole srader             | `Sole Trader`             |
| Private limited company | `Private Limited Company` |

Company type affects payment limits, see [Payment Initiation Services API - Domestic Payments Limits](#domestic-payments-limits) for details.

## Balances

We've implemented version 3.1.10 of the [Open Banking balances specification](https://openbankinguk.github.io/read-write-api-site3/v3.1.10/resources-and-data-models/aisp/Balances.html).

When you query this endpoint, you'll see the customer's `InterimAvailable` balance. This is the same real-time balance 
that our customers see in the Monzo app, and it includes pending and settled transactions.

We support an optional query param `includePots`. When set to `true` an additional `Information` balance type will be returned. This balance will be the aggregated account balance made up of the main account balance plus the balance of each pot owned by the account.

### Flex

When querying a flex's balance, you'll be returned two balances:

- The `InterimAvailable` balance: This is the current amount owed on the flex account. Its the amount the customer would need to pay today to pay off their flex.

- The `Information` balance: This is the current flex balance plus all future interest. Its the balance displayed within the Monzo app.


## Transactions

```json
 {
  "Data": {
    "Transaction": [
      {
        "AccountId": "acc_0000AAca1egQMHUQX14Mt7",
        "TransactionId": "tx_0000AGpfr2kVwbONyQ4XFR",
        "CreditDebitIndicator": "Credit",
        "Status": "Booked",
        "BookingDateTime": "2022-02-25T10:35:39.636Z",
        "TransactionInformation": "Mr. Payroll Services",
        "Amount": {
          "Amount": "150.0000",
          "Currency": "GBP"
        },
        "ProprietaryBankTransactionCode": {
          "Code": "bacs",
          "Issuer": "Monzo"
        },
        "DebtorAccount": {
          "SchemeName": "UK.OBIE.SortCodeAccountNumber",
          "Identification": "12345612345678",
          "Name": "Mr Payroll Service"
        },
        "SupplementaryData": {
          "Declined": false,
          "RawTransactionDescription": "MR PAYROLL SERVICE"
        }
      }
    ]
  },
  "Links": {
    "Self": "https://openbanking.s101.nonprod-ffs.io/open-banking/v3.1/aisp/accounts/acc_0000AAca1egQMHUQX14Mt7/transactions?fromBookingDateTime=2022-02-03T00%3A00%3A00"
  },
  "Meta": {}
}
```

We've implemented version 3.1.10 of the [Open Banking transactions specification](https://openbankinguk.github.io/read-write-api-site3/v3.1.10/resources-and-data-models/aisp/Transactions.html).

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

`Rejected` transaction status was added in version 3.1.8 of the [Open Banking transactions specification](https://openbankinguk.github.io/read-write-api-site3/v3.1.8/resources-and-data-models/aisp/Transactions.html).
This status will begin to be returned from the AIS API on the 25th of September 2022.  

By default, we return transactions oldest to newest - we refer to this as ascending order. To return transactions in reverse, or descending, order an additional query parameter can be provided as part of the `/transactions` request.
Using `order=desc` will result in the transactions being returned newest to oldest. If you wish to keep transactions ordered oldest to newest then omit the `order` parameter or set `order=asc`. All `Links` will respect the omission or use of the `order` parameter.

The `ProprietaryBankTransactionCode` property has two sub-properties: `Issuer` and `Code`. `Issuer` will always be set to Monzo, and the possible values for `Code` are listed below.

- `3dsecure`
- `account_interest`
- `bacs`
- `card_delivery`
- `chaps`
- `collections_settlement`
- `emergency_cash`
- `faster_payments`
- `instalment_loan`
- `ledger_adjustment`
- `locked_money`
- `mastercard`
- `monzo_business_account_billing`
- `monzo_flex`
- `monzo_paid`
- `overdraft`
- `p2p_payment`
- `payport_faster_payments`
- `rbs_cheque`
- `sepa`
- `signup_referral`
- `spread_the_cost`
- `topup`
- `uk_business_pot`
- `uk_cash_deposits_paypoint`
- `uk_retail_pot`

## Parties

We've implemented version 3.1.10. of the [Open Banking parties specification](https://openbankinguk.github.io/read-write-api-site3/v3.1.10/resources-and-data-models/aisp/Parties.html)

We have implemented the `GET /party` and `GET /accounts/{accountId}/party` endpoints for reading details of the consent authoriser and `GET /accounts/{accountId}/parties` for reading the details of all account holders/owners. These endpoints return the IDs, preferred names, and legal names of account holders/owners.

<aside class="notice">
You should use the customer's preferred name when you talk to them.
</aside>

Your consent needs to have the `ReadPartyPSU` permission to access the `GET /party` endpoint and the `ReadParty` permission to access the `GET /account/{accountId}/parties` and `GET /account/{accountId}/party` endpoints.

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

##### Field Descriptions
| Field name           | Optional  | Description                                                                   | Type                                  |
| -------------------- | --------- | ----------------------------------------------------------------------------- | --------------------------------------|
| PotId                | ❌         | Unique ID representing the pot                                                | string                                |
| AccountId            | ❌         | Unique ID of the account that owns the pot                                    | string                                |
| Name                 | ✅         | Pot's name                                                                    | string                                |
| Type                 | ❌         | Type of pot: `default`, `flexible_savings`, `fixed_savings`, `instant_access` | string                                |
| CreditDebitIndicator | ❌         | Indicates whether the pot's balance is positive or negative                   | `OBCreditDebitCode`                   |
| Balance              | ❌         | The pot's currency & current balance                                          | `OBActiveOrHistoricCurrencyAndAmount` |
| Style                | ❌         | Internal ID for the cover image of the pot, if a custom image isn't set       | string                                |
| ImageUrl             | ✅         | URL to the pot's cover image                                                  | string                                |
| Goal                 | ✅         | Customer's savings target for their pot                                       | `OBActiveOrHistoricCurrencyAndAmount` |
| LockType             | ✅         | Pot's lock type, if  locked will return `until_date`                          | string                                |
| LockedUntil          | ✅         | When the pot will unlock                                                      | string                                |
| Created              | ❌         | When the pot was created                                                      | string                                |
| Updated              | ❌         | When the pot was last updated                                                 | string                                |
| Closed               | ✅         | When the pot was closed                                                       | string                                |
| Status               | ❌         | Pot's current status: `Open` or `Closed`                                      | string                                |

## Direct Debits

We've implemented version 3.1.10 of the [Open Banking Direct Debits specification](https://openbankinguk.github.io/read-write-api-site3/v3.1.10/resources-and-data-models/aisp/direct-debits.html).

We have only implemented `GET /accounts/{AccountId}/direct-debits` endpoint.

Your consent needs to have the `ReadDirectDebits` permission to access this endpoint.

<aside class="warning">
<strong>Strong Customer Authentication and Direct Debits</strong><br/>
If it's been more than 5 minutes since the customer completed Strong Customer Authentication, you'll only be able to
access Direct Debits that were collected within the last 90 days.
</aside>

## Scheduled Payments

We've implemented version 3.1.10 of the [Open Banking Scheduled Payments specification](https://openbankinguk.github.io/read-write-api-site3/v3.1.10/resources-and-data-models/aisp/scheduled-payments.html).

We have only implemented `GET /accounts/{AccountId}/scheduled-payments` endpoint.

Your consent needs to have either the `ReadScheduledPaymentsBasic` or `ReadScheduledPaymentsDetail` permissions to access this endpoint.

<aside class="info">
<strong>Strong Customer Authentication and Scheduled Payments</strong><br/>
You can access all scheduled payments as long as the customer has completed Strong Customer Authentication in the last
90 days. 
</aside>

## Standing Orders

We've implemented version 3.1.10 of the [Open Banking Standing Orders specification](https://openbankinguk.github.io/read-write-api-site3/v3.1.10/resources-and-data-models/aisp/standing-orders.html).

We have only implemented `GET /accounts/{AccountId}/standing-orders` endpoint.

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

The Open Banking team at Monzo manage the Account Information Services API. If you require additional assistance, email us at 
[openbanking@monzo.com](mailto:openbanking@monzo.com).

# Balance

Retrieve information about an account's balance.

## Read balance

```shell
$ http "https://api.getmondo.co.uk/balance?account_id=$account_id" \
    "Authorization: Bearer $access_token"
```

```json
{
	"balance": 5000,
	"currency": "GBP",
	"spend_today": 0
}
```

Returns balance information for a specific account.


##### Request Parameters

<span class="hide">Parameter</span> | <span class="hide">Description</span>
------------------------------------|--------------------------------------
`account_id`<br><span class="label notice">Required</span>|The id of the account.

##### Response Parameters

<span class="hide">Parameter</span> | <span class="hide">Description</span>
------------------------------------|--------------------------------------
`balance`|The currently available balance of the account, as a 64bit integer in minor units of the currency, eg. pennies for GBP, or cents for EUR and USD.
`currency`|The ISO 4217 currency code.
`spend_today`|The amount spent from this account today (considered from approx 4am onwards), as a 64bit integer in minor units of the currency.

# Balance

Retrieve information about an account's balance.

## Read balance

```shell
$ http "https://api.monzo.com/balance" \
    "Authorization: Bearer $access_token" \
    "account_id==$account_id"
```

```json
{
	"balance": 5000,
	"total_balance": 6000,
	"currency": "GBP",
	"spend_today": 0
}
```

Returns balance information for a specific account.


##### Request arguments

<span class="hide">Parameter</span> | <span class="hide">Description</span>
------------------------------------|--------------------------------------
`account_id`<br><span class="label notice">Required</span>|The id of the account.

##### Response arguments

<span class="hide">Parameter</span> | <span class="hide">Description</span>
------------------------------------|--------------------------------------
`balance`|The currently available balance of the account, as a 64bit integer in minor units of the currency, eg. pennies for GBP, or cents for EUR and USD.
`total_balance`|The sum of the currently available balance of the account and the combined total of all [the user's pots](https://monzo.com/docs/#list-pots).
`currency`|The ISO 4217 currency code.
`spend_today`|The amount spent from this account today (considered from approx 4am onwards), as a 64bit integer in minor units of the currency.

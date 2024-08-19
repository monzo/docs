# Pots

A pot is a place to keep some money separate from the main spending account.

## List pots

```shell
$ http "https://api.monzo.com/pots" \
    "current_account_id==$account_id" \
    "Authorization: Bearer $access_token"
```

```json
{
  "pots": [
    {
      "id": "pot_0000778xxfgh4iu8z83nWb",
      "name": "Savings",
      "style": "beach_ball",
      "balance": 133700,
      "currency": "GBP",
      "created": "2017-11-09T12:30:53.695Z",
      "updated": "2017-11-09T12:30:53.695Z",
      "deleted": false
    }
  ]
}
```

Returns a list of pots owned by the currently authorised user that are associated with the specified account.

## Deposit into a pot


```shell
$ http --form PUT "https://api.monzo.com/pots/$pot_id/deposit" \
    "Authorization: Bearer $access_token" \
    "source_account_id=$account_id" \
    "amount=$amount" \
    "dedupe_id=$dedupe_id"
```
Move money from an account owned by the currently authorised user into one of their pots.

```json
{
    "id": "pot_00009exampleP0tOxWb",
    "name": "Wedding Fund",
    "style": "beach_ball",
    "balance": 550100,
    "currency": "GBP",
    "created": "2017-11-09T12:30:53.695Z",
    "updated": "2018-02-26T07:12:04.925Z",
    "deleted": false
}
```


##### Request arguments

<span class="hide">Parameter</span> | <span class="hide">Description</span>
------------------------------------|--------------------------------------
`source_account_id`<br><span class="label notice">Required</span>|The id of the account to withdraw from.
`amount`<br><span class="label notice">Required</span>|The amount to deposit, as a 64bit integer in minor units of the currency, eg. pennies for GBP, or cents for EUR and USD.
`dedupe_id`<br><span class="label notice">Required</span>|A unique string used to de-duplicate deposits. Ensure this remains static between retries to ensure only one deposit is created.

##### Response arguments

<span class="hide">Parameter</span> | <span class="hide">Description</span>
------------------------------------|--------------------------------------
`id`|The pot id.
`name`|The pot name.
`style`|The pot background image.
`balance`|The new pot balance.
`currency`|The pot currency.
`created`|When this pot was created.
`updated`|When this pot was last updated.
`deleted`|Whether this pot is deleted. The API will be updated soon to not return deleted pots.

## Withdraw from a pot


```shell
$ http --form PUT "https://api.monzo.com/pots/$pot_id/withdraw" \
    "Authorization: Bearer $access_token" \
    "destination_account_id=$account_id" \
    "amount=$amount" \
    "dedupe_id=$dedupe_id"
```
Move money from a pot owned by the currently authorised user into one of their accounts.

```json
{
    "id": "pot_00009exampleP0tOxWb",
    "name": "Flying Lessons",
    "style": "blue",
    "balance": 350000,
    "currency": "GBP",
    "created": "2017-11-09T12:30:53.695Z",
    "updated": "2018-02-26T07:12:04.925Z",
    "deleted": false
}
```

<aside class="warning">
<strong>Added Security</strong><br/>
If the pot is protected with <a href="https://monzo.com/blog/introducing-our-industry-first-security-tools">added security</a>, withdrawals cannot be made via this API and must be made in-app.
</aside>

##### Request arguments

<span class="hide">Parameter</span> | <span class="hide">Description</span>
------------------------------------|--------------------------------------
`destination_account_id`<br><span class="label notice">Required</span>|The id of the account to deposit into.
`amount`<br><span class="label notice">Required</span>|The amount to deposit, as a 64bit integer in minor units of the currency, eg. pennies for GBP, or cents for EUR and USD.
`dedupe_id`<br><span class="label notice">Required</span>|A unique string used to de-duplicate deposits. Ensure this remains static between retries to ensure only one withdrawal is created.

##### Response arguments

<span class="hide">Parameter</span> | <span class="hide">Description</span>
------------------------------------|--------------------------------------
`id`|The pot id.
`name`|The pot name.
`style`|The pot background image.
`balance`|The new pot balance.
`currency`|The pot currency.
`created`|When this pot was created.
`updated`|When this pot was last updated.
`deleted`|Whether this pot is deleted. The API will be updated soon to not return deleted pots.

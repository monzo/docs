# Pots

A pot is a place to keep some money separate from the main spending account.

## List pots

```shell
$ http "https://api.monzo.com/pots" \
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

Returns a list of pots owned by the currently authorised user.

## Deposit into a pot

```shell
$ http --form PUT "https://api.monzo.com/pots/$pot_id/deposit" \
    "Authorization: Bearer $access_token" \
    "source_account_id=$account_id" \
    "amount=$amount" \
    "dedupe_id=$dedupe_id"
```

Move money from an account owned by the currently authorised user into one of their pots.

##### Request arguments

<span class="hide">Parameter</span> | <span class="hide">Description</span>
------------------------------------|--------------------------------------
`source_account_id`<br><span class="label notice">Required</span>|The id of the account to withdraw from.
`amount`<br><span class="label notice">Required</span>|
`dedupe_id`<br><span class="label notice">Required</span>|A unique string used to de-duplicate deposits. Ensure this remains static between retries to ensure only one deposit is created.

##### Response arguments

<span class="hide">Parameter</span> | <span class="hide">Description</span>
------------------------------------|--------------------------------------

## Withdraw from a pot

```shell
$ http --form PUT "https://api.monzo.com/pots/$pot_id/withdraw" \
    "Authorization: Bearer $access_token" \
    "destination_account_id=$account_id" \
    "amount=$amount" \
    "dedupe_id=$dedupe_id"
```

Move money from a pot owned by the currently authorised user into one of their accounts.

##### Request arguments

<span class="hide">Parameter</span> | <span class="hide">Description</span>
------------------------------------|--------------------------------------
`destination_account_id`<br><span class="label notice">Required</span>|The id of the account to deposit into.
`amount`<br><span class="label notice">Required</span>|
`dedupe_id`<br><span class="label notice">Required</span>|A unique string used to de-duplicate deposits. Ensure this remains static between retries to ensure only one withdrawal is created.

##### Response arguments

<span class="hide">Parameter</span> | <span class="hide">Description</span>
------------------------------------|--------------------------------------

# Pots

A Pot is a place to keep some money separate from your main spending account.

## List pots

Returns a list of pots owned by the currently authorised user.

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
## Deposit into a Pot

Move money into a pot.

Replace :id with the pot id you're sending money to.

Amount is in pennies.

```shell
$ http --form PUT "https://api.monzo.com/pots/:id/deposit" \
    "Authorization: Bearer $access_token"
    "source_account_id=$account_id" \
    "amount"=1000 \
    "dedupe_id"=$timestamp
```

## Withdraw from a Pot

Move money out of a pot and back to your main account.

```shell
$ http --form PUT "https://api.monzo.com/pots/:id/withdraw" \
    "Authorization: Bearer $access_token"
    "destination_account_id=$account_id" \
    "amount"=1000 \
    "dedupe_id"=$timestamp
```

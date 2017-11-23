# Pots

A Pot is a place to keep some money seperate from your main spending account.

## List pots

Returns a list of accounts owned by the currently authorised user.

```shell
$ http "https://api.monzo.com/pots/listV1" \
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

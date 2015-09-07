# Expanding Objects

Some objects contain the id of another object in their response. To save a round trip, some of these objects can be expanded inline with the expand request parameter. Objects that can be expanded are noted.

```shell
$ http "https://mini.mondobank.io/transactions" \
    "Authorization: Bearer $access_token" \
    "account_id==$account_id" \
    "expand[]=merchant"
```

```json
{
    "amount": -5663,
    "created": "2015-05-27T03:45:00Z",
    "currency": "GBP",
    "description": "Ocado",
    "id": "tx_00008zhJ3ltyNxq04P5dEP",
    "merchant": {
        "id": "merch_00008zhJ3ltyNxkmsGUgKn",
        "group_id": "grp_merch_00008zhJkmsGUgKn3ltyNx",
        "created": "2015-05-27T03:45:00Z",
        "name": "Ocado",
        "logo": "http://pbs.twimg.com/profile_images/474227427648868353/Xrt860cz_400x400.jpeg",
        "address": {
          "address": "44 Paul Street",
	        "city": "London",
	        "region": "Greater London",
	        "country": "GB",
	        "postcode": "EC2A 4LB",
	        "latitude": 51.523777,
	        "longitude": -0.083965
        }
    },
    "metadata": {
        "logo_url": "http://pbs.twimg.com/profile_images/474227427648868353/Xrt860cz_400x400.jpeg",
        "tags": "#groceries"
    },
    "notes": ""
}
```

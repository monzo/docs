# Feed items

The Mondo app is organised around the feed – a reverse-chronological stream of events. Transactions are one such feed item, and your application can create its own feed items to surface relevant information to the user.

It's important to keep a few principals in mind when creating feed items:

1. Feed items are *discrete* events that happen at a *point in time*.
2. Because of their prominence within the Mondo app, feed items should contain information of *high value*.

## Create feed item

```shell
$ http POST "https://api.getmondo.co.uk/feed" \
    "Authorization: Bearer $access_token" \
    "account_id=$account_id" \
    "type=image" \
    "title=My custom item" \
    "image_url=www.example.com/image.png" \
    "background_color=#FCF1EE" \
    "body=Some body text to display"
```

```json
{}
```

Creates a new feed item on the user's feed

##### Arguments

<span class="hide">Parameter</span> | <span class="hide">Description</span>
------------------------------------|--------------------------------------
`account_id`<br><span class="label notice">Required</span>|The account to create feed item for.
`type`<br><span class="label notice">Required</span>|Type of feed item. Only supports `image` currently.
`title`<br><span class="label notice">Required</span>|The title to display.
`image_url`<br><span class="label notice">Required</span>|URL of the image to display.
`background_color`<br><span class="label">Optional</span>|Hex value for the background colour of the feed item. Defaults to `#FFFFFF`
`body`<br><span class="label">Optional</span>|The body text of the feed item.

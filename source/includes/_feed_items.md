# Feed items

The Monzo app is organised around the feed – a reverse-chronological stream of events. Transactions are one such feed item, and your application can create its own feed items to surface relevant information to the user.

It's important to keep a few principals in mind when creating feed items:

1. Feed items are *discrete* events that happen at a *point in time*.
2. Because of their prominence within the Monzo app, feed items should contain information of *high value*.
3. While the appearance of feed items can be customised, care should be taken to match the style of the Monzo app so that your feed items feel part of the experience.

## Create feed item

```shell
$ http --form POST "https://api.monzo.com/feed" \
    "Authorization: Bearer $access_token" \
    "account_id=$account_id" \
    "type=basic" \
    "url=https://www.example.com/a_page_to_open_on_tap.html" \
    "params[title]=My custom item" \
    "params[image_url]=www.example.com/image.png" \
    "params[background_color]=#FCF1EE" \
    "params[body_color]=#FCF1EE" \
    "params[title_color]=#333333" \
    "params[body]=Some body text to display"
```

```json
{}
```

Creates a new feed item on the user's feed. These can be dismissed.

##### Request arguments (for all feed item types)

<span class="hide">Parameter</span> | <span class="hide">Description</span>
------------------------------------|--------------------------------------
`account_id`<br><span class="label notice">Required</span>|The account to create a feed item for.
`type`<br><span class="label notice">Required</span>|Type of feed item. Currently only `basic` is supported.
`params`<br><span class="label notice">Required</span>|A *map* of parameters which vary based on `type`
`url`<br><span class="label">Optional</span>|A URL to open when the feed item is tapped. If no URL is provided, the app will display a fallback view based on the title & body.


### Per-type arguments

Each type of feed item supports customisation with a specific list of `params`. Currently we only support creation of the `basic` feed item which requires the parameters below. These should be sent as form parameters as in the example to the right.

##### Basic

The basic type displays an `image`, with `title` text and optional `body` text.  
*Note the image supports animated gifs!*

<img src="images/nyanfeed.gif" />

##### Request arguments

<span class="hide">Parameter</span> | <span class="hide">Description</span>
------------------------------------|--------------------------------------
`title`<br><span class="label notice">Required</span>|The title to display.
`image_url`<br><span class="label notice">Required</span>|URL of the image to display. This will be displayed as an icon in the feed, and on the expanded page if no `url` has been provided.
`body`<br><span class="label">Optional</span>|The body text of the feed item.
`background_color`<br><span class="label">Optional</span>|Hex value for the background colour of the feed item in the format `#RRGGBB`. Defaults to to standard app colours (ie. white background).
`title_color`<br><span class="label">Optional</span>|Hex value for the colour of the title text in the format `#RRGGBB`. Defaults to standard app colours.
`body_color`<br><span class="label">Optional</span>|Hex value for the colour of the body text in the format `#RRGGBB`. Defaults to standard app colours.

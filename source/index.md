---
title: Monzo API Reference

language_tabs:
  - shell

includes:
  - authentication
  - pagination
  - object_expansion
  - accounts
  - balance
  - transactions
  - feed_items
  - webhooks
  - attachments
  - errors

search: false
---

# Introduction

> **API endpoint**

```
https://api.monzo.com
```

> Examples in this documentation are written using [httpie](https://github.com/jkbrzt/httpie) for clarity.

> To install `httpie` on macOS run `brew install httpie`

The Monzo API is designed to be a predictable and intuitive interface for interacting with users' accounts. We offer both a REST API and webhooks.

Our developers' community in Slack is the place to get help with our API, discuss ideas, and show off what you build. Hit the button to join:

<script async defer src="https://devslack.monzo.com/slackin.js"></script>

<aside class="announce">
    <strong>The Monzo API is not yet suitable for building public applications.</strong><br>
    You may only connect to your own account or those of a small set of users you explicitly whitelist. Please read our <a href="https://monzo.com/blog/2017/05/11/api-update/">blog post</a> for more detail.
</aside>

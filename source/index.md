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
  - pots
  - transactions
  - feed_items
  - attachments
  - receipts
  - webhooks
  - errors
  - ais

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

<aside class="warning">
    <strong>The Monzo Developer API is not suitable for building public applications.</strong><br>
    You may only connect to your own account or those of a small set of users you explicitly whitelist. Please read our <a href="https://monzo.com/blog/2017/05/11/api-update/">blog post</a> for more detail.
</aside>

<aside class="notice">
    For firms authorised as <a href="https://www.fca.org.uk/account-information-service-ais-payment-initiation-service-pis">Account Information Service Providers</a> under PSD2 we offer an <a href=#aisp-access>AISP API</a>.
</aside>

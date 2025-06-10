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
  - pis
  - vrp
  - cbpii
  - ob_errors
  - scarts

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

The [Developers category](https://community.monzo.com/c/developers) on our forum is the place to get help with our API, discuss ideas, and show off what you build.

<aside class="warning">
    <strong>The Monzo Developer API is not suitable for building public applications.</strong><br>
    You may only connect to your own account or those of a small set of users you explicitly allow.
</aside>

<aside class="notice">
    For firms authorised as <a href="https://www.fca.org.uk/account-information-service-ais-payment-initiation-service-pis">Account Information Service Providers</a> under PSD2 we offer an <a href=#account-information-services-api>AISP API</a>.
    We also offer an <a href=#payment-initiation-services-api>API for authorised PISPs</a> and <a href=#confirmation-of-funds-api>CBPIIs</a>.
</aside>

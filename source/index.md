---
title: Mondo API Reference

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
  - web_hooks
  - attachments
  - errors

search: false
---

# Introduction

> **API endpoint**

```
https://api.getmondo.co.uk
```

> Examples in this documentation are written using [httpie](https://github.com/jkbrzt/httpie) for clarity.

> To install `httpie` on OS X run `brew install httpie`

The Mondo API is designed to be a predictable and intuitive interface for interacting with users' accounts. We offer both a REST API and web hooks.

The API is in beta and isn't publicly-available yet. If you're interested in using it, please sign up to our [developers mailing list](http://eepurl.com/bGPKOD). We will occasionally send out things like API change information and hackathon announcements. Similarly, if a feature you'd like is missing (or broken!), do [let us know](mailto:developers@getmondo.co.uk).

As one of the first – if not *the* first – example of a widely-available bank API, we're very excited to see what you build!

<aside class="warning">
The Mondo API is currently under active development and breaking changes may be introduced.
</aside>

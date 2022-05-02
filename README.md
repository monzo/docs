Monzo API Docs
========

[Monzo is a new kind of bank](https://monzo.com).

This is the public repo for the [Monzo API documentation](https://monzo.com/docs). It was generated using [Slate](https://github.com/slatedocs/slate).

Testing Locally
-----------------------
You'll need Docker.

From the root of the repo:
```
> docker run --rm --name slate -p 4567:4567 -v $(pwd)/source:/srv/slate/source slatedocs/slate serve
```

Then just visit http://localhost:4567 in your browser!

Upgrading Slate
-----------------------

Follow the instructions on [Slate's GitHub page](https://github.com/slatedocs/slate/wiki/Updating-Slate)


Need help? Found a bug?
-----------------------

Just [submit an issue](https://github.com/monzo/docs/issues) to this GitHub repo if you need any help. And, of course, feel free to submit pull requests with bug fixes or changes.

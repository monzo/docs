Monzo API Docs
========

[Monzo is a new kind of bank](https://monzo.com).

This is the public repo for the [Monzo API documentation](https://monzo.com/docs). It was generated using [Slate](https://github.com/lord/slate).

Testing Locally
-----------------------
You'll need Docker.

From the root of the repo:
```
> docker build .
```

Once you've built your image, make note of the image hash:
```
...
Successfully built abcdef1234
```

And run it, forwarding the port, including the first few characters of the image:
```
> docker run -p 4567:4567 abcde
```

Then just visit http://localhost:4567 in your browser!


Need help? Found a bug?
-----------------------

Just [submit an issue](https://github.com/monzo/docs/issues) to this GitHub repo if you need any help. And, of course, feel free to submit pull requests with bug fixes or changes.

Deploying changes
----------------------
Follow the deployment guide [here](https://www.notion.so/monzo/Deploying-Monzo-API-Docs-f18f80a4b12d4811af83c4aa6a77dfe2)

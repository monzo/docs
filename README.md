Monzo API Docs
========

[Monzo is a new kind of bank](https://monzo.com).

This is the public repo for the [Monzo API documentation](https://monzo.com/docs). It was generated using [Slate](https://github.com/slatedocs/slate).

Setting up your environment
-----------------------

Docker is the recommended way to work with this repository, as we can use slate's official Docker image and not worry
about dependencies, however if you want to work with the project natively `rbenv` is recommended.

Testing Locally
-----------------------

From the root of the repo:
```
> docker run --rm --name slate -p 4567:4567 -v $(pwd)/source:/srv/slate/source slatedocs/slate serve
```

Then just visit http://localhost:4567 in your browser!

Upgrading Slate
-----------------------

Follow the instructions on [Slate's GitHub page](https://github.com/slatedocs/slate/wiki/Updating-Slate)

Deploying your changes
-----------------------

Make sure all your changes are committed and then build the project

```
docker run --rm --name slate -v $(pwd)/build:/srv/slate/build -v $(pwd)/source:/srv/slate/source slatedocs/slate build
```

This will create the `build/` folder (don't worry about committing this, it's part of the `.gitignore` file). You can now 
deploy: 

```
./deploy.sh --push-only
```

Note the --push-only flag is required as otherwise the script will try to build the project first natively, which we've
already done with Docker.

Need help? Found a bug?
-----------------------

Just [submit an issue](https://github.com/monzo/docs/issues) to this GitHub repo if you need any help. And, of course, feel free to submit pull requests with bug fixes or changes.

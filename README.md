Monzo API Docs
========

[Monzo is a new kind of bank](https://monzo.com).

This is the public repo for the [Monzo API documentation](https://monzo.com/docs).


## Prerequisites

- Ruby, version 1.9.3 or newer
- Bundler — If Ruby is already installed, but the bundle command doesn't work, just run the below in terminal
```gem install bundler``` 

## Setting Up

- Fork this repository on Github.
- Clone your forked repository (not our original one) to your hard drive with  
```git clone https://github.com/<YOURUSERNAME>/docs.git```
- ```cd docs```
- Install all dependencies: 
```shell
bundle install
```
- Start the test server: 
```shell
bundle exec middleman server
```
Once the server is running, you can add changes to different markdown files and reload the page to see how it affects the layout and content. 

Once you are happy with your additions - [send us a pull request](https://github.com/mondough/docs/pulls), so we can share the love with other people

Need Help? Found a bug?
--------------------

Just [submit an issue](https://github.com/monzo/docs/issues) to this GitHub repo if you need any help. And, of course, feel free to submit pull requests with bug fixes or changes.

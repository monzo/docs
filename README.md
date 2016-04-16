Mondo API Docs
========

[Mondo is a new kind of bank](https://getmondo.co.uk). We try to keep as much of our code open source, so you can check the quality of your bank and how we work (apart from the security features). 

This is the repo for the [Mondo API documentation](https://getmondo.co.uk/docs), which are open-source, so you can fork them, raise issues and send pull requests. 

It was generated using [Slate](http://tripit.github.io/slate).

## Prerequisites

- Ruby, version 1.9.3 or newer
- Bundler — If Ruby is already installed, but the bundle command doesn't work, just run the below in terminal
```gem install bundler``` 

## Setting Up

- Fork this repository on Github.
- Clone your forked repository (not our original one) to your hard drive with 

```git clone https://github.com/<YOURUSERNAME>/docs.git```
- ```cd mondocs```
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

Just [submit an issue](https://github.com/mondough/docs/issues) to this GitHub repo if you need any help. 

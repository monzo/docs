.PHONY: deps
deps:
	bundle install

.PHONY: dev
dev: deps
	bundle exec middleman server

.PHONY: publish
publish: deps
	rake publish

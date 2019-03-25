install: install-deps install-flow-typed

start:
	npx nodemon --exec npx babel-node server/bin/slack.js

start-debug:
	DEBUG='chat*' npx nodemon --exec npx babel-node server/bin/slack.js

install-deps:
	npm install

install-flow-typed:
	npx flow-typed install

build:
	rm -rf dist
	npm run build

test:
	npm test

check-types:
	npx flow

lint:
	npx eslint .

publish:
	npm publish

.PHONY: test

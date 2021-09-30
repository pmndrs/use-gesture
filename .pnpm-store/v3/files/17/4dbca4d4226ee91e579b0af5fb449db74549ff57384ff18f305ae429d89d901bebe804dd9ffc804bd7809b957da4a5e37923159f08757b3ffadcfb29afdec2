
build: components index.js
	@component build --dev

components: component.json
	@component install --dev

clean:
	rm -fr build components template.js

test:
	@./node_modules/.bin/mocha --reporter spec

test-browser:
	@./node_modules/.bin/component-test browser

.PHONY: clean test test-browser

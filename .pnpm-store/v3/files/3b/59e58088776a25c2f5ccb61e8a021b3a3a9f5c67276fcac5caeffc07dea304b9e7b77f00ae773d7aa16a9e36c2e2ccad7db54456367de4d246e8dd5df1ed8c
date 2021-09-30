
test:
	@./node_modules/.bin/mocha \
		--require should \
		--reporter dot \
		--bail

build: components index.js
	@component build --dev

components: component.json
	@component install --dev

clean:
	rm -fr build components template.js

.PHONY: clean test

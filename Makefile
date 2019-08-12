index.js: index.ts Makefile
	tsc --esModuleInterop --target ES2016 index.ts

.PHONY: test
test: index.js
	prove test.js

.PHONY: watchtest
watchtest:
	while true; do inotifywait -e modify -r .; make test; done;

.PHONY: clean
clean:
	rm -f ./index.js
	rm -rfv ./node_modules
	rm -f ./yarn.lock

/// <reference types="node"/>

/**
Check if a Buffer/Uint8Array is a [PNG](https://en.wikipedia.org/wiki/Portable_Network_Graphics) image.

@param buffer - The buffer to check. It only needs the first 8 bytes.
@returns Whether `buffer` contains a PNG image.

@example
```
// Node.js:
import readChunk = require('read-chunk');
import isPng = require('is-png');

const buffer = readChunk.sync('unicorn.png', 0, 8);

isPng(buffer);
//=> true

// Browser:
(async () => {
	const response = await fetch('unicorn.png');
	const buffer = await response.arrayBuffer();

	isPng(new Uint8Array(buffer));
	//=> true
})();
```
*/
declare function isPng(buffer: Uint8Array | Buffer): boolean;

export = isPng;

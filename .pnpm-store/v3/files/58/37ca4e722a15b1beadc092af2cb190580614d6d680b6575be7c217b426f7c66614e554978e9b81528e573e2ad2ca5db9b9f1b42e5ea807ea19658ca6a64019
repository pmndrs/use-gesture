# imagemin [![Build Status](https://travis-ci.org/imagemin/imagemin.svg?branch=master)](https://travis-ci.org/imagemin/imagemin)

> Minify images seamlessly

---

<div align="center">
	<sup>Gumlet is helping make open source sustainable by sponsoring Sindre Sorhus.</sup>
	<a href="https://www.gumlet.com">
		<div>
			<img src="https://sindresorhus.com/assets/thanks/gumlet-logo.svg" width="300"/>
		</div>
		<sup><b>Optimised Image Delivery made simple</b></sup>
	</a>
</div>

---


## Install

```
$ npm install imagemin
```


## Usage

```js
const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');

(async () => {
	const files = await imagemin(['images/*.{jpg,png}'], {
		destination: 'build/images',
		plugins: [
			imageminJpegtran(),
			imageminPngquant({
				quality: [0.6, 0.8]
			})
		]
	});

	console.log(files);
	//=> [{data: <Buffer 89 50 4e …>, destinationPath: 'build/images/foo.jpg'}, …]
})();
```


## API

### imagemin(input, options?)

Returns `Promise<object[]>` in the format `{data: Buffer, sourcePath: string, destinationPath: string}`.

#### input

Type: `string[]`

File paths or [glob patterns](https://github.com/sindresorhus/globby#globbing-patterns).

#### options

Type: `object`

##### destination

Type: `string`

Set the destination folder to where your files will be written. If no destination is specified, no files will be written.

##### plugins

Type: `Array`

[Plugins](https://www.npmjs.com/browse/keyword/imageminplugin) to use.

##### glob

Type: `boolean`<br>
Default: `true`

Enable globbing when matching file paths.

### imagemin.buffer(buffer, options?)

Returns `Promise<Buffer>`.

#### buffer

Type: `Buffer`

Buffer to optimize.

#### options

Type: `object`

##### plugins

Type: `Array`

[Plugins](https://www.npmjs.com/browse/keyword/imageminplugin) to use.

## Hosted API

We also provide a hosted API for imagemin which may simplify your use case.

<a href="https://imagemin.saasify.sh">
	<img src="https://badges.saasify.sh?text=View%20Hosted%20API" height="40"/>
</a>

## Related

- [imagemin-cli](https://github.com/imagemin/imagemin-cli) - CLI for this module
- [imagemin-app](https://github.com/imagemin/imagemin-app) - GUI app for this module
- [gulp-imagemin](https://github.com/sindresorhus/gulp-imagemin) - Gulp plugin
- [grunt-contrib-imagemin](https://github.com/gruntjs/grunt-contrib-imagemin) - Grunt plugin

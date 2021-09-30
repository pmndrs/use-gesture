
# opentype.js &middot; [![Build Status](https://img.shields.io/travis/opentypejs/opentype.js.svg?style=flat-square)](https://travis-ci.org/opentypejs/opentype.js) [![npm](https://img.shields.io/npm/v/opentype.js.svg?style=flat-square)](https://www.npmjs.com/package/opentype.js) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/opentypejs/opentype.js/blob/master/LICENSE) [![david-dm](https://david-dm.org/opentypejs/opentype.js.svg)](https://david-dm.org/opentypejs/opentype.js) [![Gitter](https://badges.gitter.im/opentypejs/opentype.js.svg)](https://gitter.im/opentypejs/opentype.js)

opentype.js is a JavaScript parser and writer for TrueType and OpenType fonts.

It gives you access to the <strong>letterforms</strong> of text from the browser or Node.js.
See [https://opentype.js.org/](https://opentype.js.org/) for a live demo.

Features
========

* Create a bézier path out of a piece of text.
* Support for composite glyphs (accented letters).
* Support for WOFF, OTF, TTF (both with TrueType `glyf` and PostScript `cff` outlines)
* Support for kerning (Using GPOS or the kern table).
* Support for ligatures.
* Support for TrueType font hinting.
* Support arabic text rendering (See issue #364 & PR #359 #361)
* A low memory mode is available as an option (see #329)
* Runs in the browser and Node.js.

Installation
============

### Using [npm](http://npmjs.org/) package manager

    npm install opentype.js

    const opentype = require('opentype.js');

    import opentype from 'opentype.js'

    import { load } from 'opentype.js'

Using TypeScript? [See this example](examples/typescript)

Note: OpenType.js uses ES6-style imports, so if you want to edit it and debug it in Node.js run `npm run build` first and use `npm run watch` to automatically rebuild when files change.

### Directly

[Download the latest ZIP](https://github.com/opentypejs/opentype.js/archive/master.zip) and grab the files in the `dist`
folder. These are compiled.

### Using via a CDN

To use via a CDN, include the following code in your html:

    <script src="https://cdn.jsdelivr.net/npm/opentype.js@latest/dist/opentype.min.js"></script>

### Using Bower (Deprecated [see official post](https://bower.io/blog/2017/how-to-migrate-away-from-bower/))

To install using [Bower](https://bower.io/), enter the following command in your project directory:

    bower install opentype.js

You can then include them in your scripts using:

    <script src="/bower_components/opentype.js/dist/opentype.js"></script>


API
===
### Loading a font
![OpenType.js example Hello World](https://raw.github.com/opentypejs/opentype.js/master/g/hello-world.png)

Use `opentype.load(url, callback)` to load a font from a URL. Since this method goes out the network, it is asynchronous.
The callback gets `(err, font)` where `font` is a `Font` object. Check if the `err` is null before using the font.
```javascript
opentype.load('fonts/Roboto-Black.ttf', function(err, font) {
    if (err) {
        alert('Font could not be loaded: ' + err);
    } else {
        // Now let's display it on a canvas with id "canvas"
        const ctx = document.getElementById('canvas').getContext('2d');

        // Construct a Path object containing the letter shapes of the given text.
        // The other parameters are x, y and fontSize.
        // Note that y is the position of the baseline.
        const path = font.getPath('Hello, World!', 0, 150, 72);

        // If you just want to draw the text you can also use font.draw(ctx, text, x, y, fontSize).
        path.draw(ctx);
    }
});
```

You can also use `es6 async/await` syntax to load your fonts

```javascript
async function make(){
    const font = await opentype.load('fonts/Roboto-Black.ttf');
    const path = font.getPath('Hello, World!', 0, 150, 72);
    console.log(path);
}
```

If you already have an `ArrayBuffer`, you can use `opentype.parse(buffer)` to parse the buffer. This method always
returns a Font, but check `font.supported` to see if the font is in a supported format. (Fonts can be marked unsupported
if they have encoding tables we can't read).

    const font = opentype.parse(myBuffer);

### Loading a font synchronously (Node.js)
Use `opentype.loadSync(url)` to load a font from a file and return a `Font` object.
Throws an error if the font could not be parsed. This only works in Node.js.

    const font = opentype.loadSync('fonts/Roboto-Black.ttf');

### Writing a font
Once you have a `Font` object (either by using `opentype.load` or by creating a new one from scratch) you can write it
back out as a binary file.

In the browser, you can use `Font.download()` to instruct the browser to download a binary .OTF file. The name is based
on the font name.
```javascript
// Create the bézier paths for each of the glyphs.
// Note that the .notdef glyph is required.
const notdefGlyph = new opentype.Glyph({
    name: '.notdef',
    unicode: 0,
    advanceWidth: 650,
    path: new opentype.Path()
});

const aPath = new opentype.Path();
aPath.moveTo(100, 0);
aPath.lineTo(100, 700);
// more drawing instructions...
const aGlyph = new opentype.Glyph({
    name: 'A',
    unicode: 65,
    advanceWidth: 650,
    path: aPath
});

const glyphs = [notdefGlyph, aGlyph];
const font = new opentype.Font({
    familyName: 'OpenTypeSans',
    styleName: 'Medium',
    unitsPerEm: 1000,
    ascender: 800,
    descender: -200,
    glyphs: glyphs});
font.download();
```

If you want to inspect the font, use `font.toTables()` to generate an object showing the data structures that map
directly to binary values. If you want to get an `ArrayBuffer`, use `font.toArrayBuffer()`.


### The Font object
A Font represents a loaded OpenType font file. It contains a set of glyphs and methods to draw text on a drawing context, or to get a path representing the text.

* `glyphs`: an indexed list of Glyph objects.
* `unitsPerEm`: X/Y coordinates in fonts are stored as integers. This value determines the size of the grid. Common values are 2048 and 4096.
* `ascender`: Distance from baseline of highest ascender. In font units, not pixels.
* `descender`: Distance from baseline of lowest descender. In font units, not pixels.

#### `Font.getPath(text, x, y, fontSize, options)`
Create a Path that represents the given text.
* `x`: Horizontal position of the beginning of the text. (default: 0)
* `y`: Vertical position of the *baseline* of the text. (default: 0)
* `fontSize`: Size of the text in pixels (default: 72).

Options is an optional object containing:
* `kerning`: if true takes kerning information into account (default: true)
* `features`: an object with [OpenType feature tags](https://docs.microsoft.com/en-us/typography/opentype/spec/featuretags) as keys, and a boolean value to enable each feature.
Currently only ligature features "liga" and "rlig" are supported (default: true).
* `hinting`: if true uses TrueType font hinting if available (default: false).

_Note: there is also `Font.getPaths` with the same arguments which returns a list of Paths._

#### `Font.draw(ctx, text, x, y, fontSize, options)`
Create a Path that represents the given text.
* `ctx`: A 2D drawing context, like Canvas.
* `x`: Horizontal position of the beginning of the text. (default: 0)
* `y`: Vertical position of the *baseline* of the text. (default: 0)
* `fontSize`: Size of the text in pixels (default: 72).

Options is an optional object containing:
* `kerning`: if true takes kerning information into account (default: true)
* `features`: an object with [OpenType feature tags](https://docs.microsoft.com/en-us/typography/opentype/spec/featuretags) as keys, and a boolean value to enable each feature.
Currently only ligature features "liga" and "rlig" are supported (default: true).
* `hinting`: if true uses TrueType font hinting if available (default: false).

#### `Font.drawPoints(ctx, text, x, y, fontSize, options)`
Draw the points of all glyphs in the text. On-curve points will be drawn in blue, off-curve points will be drawn in red. The arguments are the same as `Font.draw`.

#### `Font.drawMetrics(ctx, text, x, y, fontSize, options)`
Draw lines indicating important font measurements for all glyphs in the text.
Black lines indicate the origin of the coordinate system (point 0,0).
Blue lines indicate the glyph bounding box.
Green line indicates the advance width of the glyph.

#### `Font.stringToGlyphs(string)`
Convert the string to a list of glyph objects.
Note that there is no strict 1-to-1 correspondence between the string and glyph list due to
possible substitutions such as ligatures. The list of returned glyphs can be larger or smaller than the length of the given string.

#### `Font.charToGlyph(char)`
Convert the character to a `Glyph` object. Returns null if the glyph could not be found. Note that this function assumes that there is a one-to-one mapping between the given character and a glyph; for complex scripts this might not be the case.

#### `Font.getKerningValue(leftGlyph, rightGlyph)`
Retrieve the value of the [kerning pair](https://en.wikipedia.org/wiki/Kerning) between the left glyph (or its index) and the right glyph (or its index). If no kerning pair is found, return 0. The kerning value gets added to the advance width when calculating the spacing between glyphs.

#### `Font.getAdvanceWidth(text, fontSize, options)`
Returns the advance width of a text.

This is something different than Path.getBoundingBox() as for example a
suffixed whitespace increases the advancewidth but not the bounding box
or an overhanging letter like a calligraphic 'f' might have a quite larger
bounding box than its advance width.

This corresponds to canvas2dContext.measureText(text).width
* `fontSize`: Size of the text in pixels (default: 72).
* `options`: See Font.getPath

#### The Glyph object
A Glyph is an individual mark that often corresponds to a character. Some glyphs, such as ligatures, are a combination of many characters. Glyphs are the basic building blocks of a font.

* `font`: A reference to the `Font` object.
* `name`: The glyph name (e.g. "Aring", "five")
* `unicode`: The primary unicode value of this glyph (can be `undefined`).
* `unicodes`: The list of unicode values for this glyph (most of the time this will be 1, can also be empty).
* `index`: The index number of the glyph.
* `advanceWidth`: The width to advance the pen when drawing this glyph.
* `xMin`, `yMin`, `xMax`, `yMax`: The bounding box of the glyph.
* `path`: The raw, unscaled path of the glyph.

##### `Glyph.getPath(x, y, fontSize)`
Get a scaled glyph Path object we can draw on a drawing context.
* `x`: Horizontal position of the glyph. (default: 0)
* `y`: Vertical position of the *baseline* of the glyph. (default: 0)
* `fontSize`: Font size in pixels (default: 72).

##### `Glyph.getBoundingBox()`
Calculate the minimum bounding box for the unscaled path of the given glyph. Returns an `opentype.BoundingBox` object that contains x1/y1/x2/y2.
If the glyph has no points (e.g. a space character), all coordinates will be zero.

##### `Glyph.draw(ctx, x, y, fontSize)`
Draw the glyph on the given context.
* `ctx`: The drawing context.
* `x`: Horizontal position of the glyph. (default: 0)
* `y`: Vertical position of the *baseline* of the glyph. (default: 0)
* `fontSize`: Font size, in pixels (default: 72).

##### `Glyph.drawPoints(ctx, x, y, fontSize)`
Draw the points of the glyph on the given context.
On-curve points will be drawn in blue, off-curve points will be drawn in red.
The arguments are the same as `Glyph.draw`.

##### `Glyph.drawMetrics(ctx, x, y, fontSize)`
Draw lines indicating important font measurements for all glyphs in the text.
Black lines indicate the origin of the coordinate system (point 0,0).
Blue lines indicate the glyph bounding box.
Green line indicates the advance width of the glyph.
The arguments are the same as `Glyph.draw`.

### The Path object
Once you have a path through `Font.getPath` or `Glyph.getPath`, you can use it.

* `commands`: The path commands. Each command is a dictionary containing a type and coordinates. See below for examples.
* `fill`: The fill color of the `Path`. Color is a string representing a [CSS color](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value). (default: 'black')
* `stroke`: The stroke color of the `Path`. Color is a string representing a [CSS color](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value). (default: `null`: the path will not be stroked)
* `strokeWidth`: The line thickness of the `Path`. (default: 1, but since the `stroke` is null no stroke will be drawn)

##### `Path.draw(ctx)`
Draw the path on the given 2D context. This uses the `fill`, `stroke` and `strokeWidth` properties of the `Path` object.
* `ctx`: The drawing context.

##### `Path.getBoundingBox()`
Calculate the minimum bounding box for the given path. Returns an `opentype.BoundingBox` object that contains x1/y1/x2/y2.
If the path is empty (e.g. a space character), all coordinates will be zero.

##### `Path.toPathData(decimalPlaces)`
Convert the Path to a string of path data instructions.
See https://www.w3.org/TR/SVG/paths.html#PathData
* `decimalPlaces`: The amount of decimal places for floating-point values. (default: 2)

##### `Path.toSVG(decimalPlaces)`
Convert the path to a SVG &lt;path&gt; element, as a string.
* `decimalPlaces`: The amount of decimal places for floating-point values. (default: 2)

#### Path commands
* **Move To**: Move to a new position. This creates a new contour. Example: `{type: 'M', x: 100, y: 200}`
* **Line To**: Draw a line from the previous position to the given coordinate. Example: `{type: 'L', x: 100, y: 200}`
* **Curve To**: Draw a bézier curve from the current position to the given coordinate. Example: `{type: 'C', x1: 0, y1: 50, x2: 100, y2: 200, x: 100, y: 200}`
* **Quad To**: Draw a quadratic bézier curve from the current position to the given coordinate. Example: `{type: 'Q', x1: 0, y1: 50, x: 100, y: 200}`
* **Close**: Close the path. If stroked, this will draw a line from the first to the last point of the contour. Example: `{type: 'Z'}`


## Versioning

We use [SemVer](https://semver.org/) for versioning.


## License

MIT


Thanks
======
I would like to acknowledge the work of others without which opentype.js wouldn't be possible:

* [pdf.js](https://mozilla.github.io/pdf.js/): for an awesome implementation of font parsing in the browser.
* [FreeType](https://www.freetype.org/): for the nitty-gritty details and filling in the gaps when the spec was incomplete.
* [ttf.js](https://ynakajima.github.io/ttf.js/demo/glyflist/): for hints about the TrueType parsing code.
* [CFF-glyphlet-fonts](https://pomax.github.io/CFF-glyphlet-fonts/): for a great explanation/implementation of CFF font writing.
* [tiny-inflate](https://github.com/foliojs/tiny-inflate): for WOFF decompression.
* [Microsoft Typography](https://docs.microsoft.com/en-us/typography/opentype/spec/otff): the go-to reference for all things OpenType.
* [Adobe Compact Font Format spec](http://download.microsoft.com/download/8/0/1/801a191c-029d-4af3-9642-555f6fe514ee/cff.pdf) and the [Adobe Type 2 Charstring spec](http://download.microsoft.com/download/8/0/1/801a191c-029d-4af3-9642-555f6fe514ee/type2.pdf): explains the data structures and commands for the CFF glyph format.
* All contributing authors mentioned in the [AUTHORS](https://github.com/opentypejs/opentype.js/blob/master/AUTHORS.md) file.

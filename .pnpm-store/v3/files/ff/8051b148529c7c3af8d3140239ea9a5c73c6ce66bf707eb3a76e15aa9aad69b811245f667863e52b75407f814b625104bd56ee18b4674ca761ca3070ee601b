// This build file creates a static version of the OpenType.js library used for
// processing fonts. It's isolated within a "factory" function wrapper so it can
// easily be marshalled into a web worker. It also removes some bits from the
// OpenType library that are never needed by Troika's text rendering.


import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import { terser } from "rollup-plugin-terser"
import buble from 'rollup-plugin-buble'
//import visualizer from 'rollup-plugin-visualizer'

const {LERNA_ROOT_PATH} = process.env
if (!LERNA_ROOT_PATH) {
  throw new Error("Please execute `npm run build-opentype` from the repository root.")
}


const OUTPUT_TEMPLATE = `
/*! 
 * Custom build of OpenType.js (https://opentype.js.org/) for use in Troika text rendering. 
 * Original MIT license applies: https://github.com/nodebox/opentype.js/blob/master/LICENSE
 */
export default function() {
  // Trick opentype into being able to run in a web worker
  if (typeof window === 'undefined') {
    self.window = self
  }

  %output%

  return opentype
}
`

const [banner, footer] = OUTPUT_TEMPLATE.split('%output%')


export default {
  // Starting from the src modules rather than dist as that gives us more fine-grained control
  input: LERNA_ROOT_PATH + '/node_modules/opentype.js/src/opentype.js',
  plugins: [
    nodeResolve(),
    commonjs(),
    {
      name: 'custom',
      transform(source, id) {
        // Exclude the rather large module that implements TrueType Hinting, as hinting is never
        // utilized in Troika's text rendering implementation. Saves 20KB or so in minified bundle.
        if (/hintingtt.js/.test(id)) {
          return 'export default function(){throw new Error("Hinting disabled")}'
        }

        if (/bbox.js/.test(id)) {
          return 'export default function(){}'
        }

        // Remove all require('fs') references as we never run in Node and they tend to confuse
        // downstream bundlers.
        source = source.replace(/require\('fs'\)/g, '{}')

        // Replace writing-related exports of the various tables with stubs so their impls get pruned
        // out, since we never need to write font files.
        if (/tables/.test(id)) {
          source = source.replace(/(export .*make:)[^,}]+/, "$1function(){}")
          source = source.replace(/(export .*fontToTable:)[^,}]+/, "$1function(){}")
        }
        if (/types.js/.test(id)) {
          source = source.replace('export { decode, encode, sizeOf };', 'var dummy={};export { decode, dummy as encode, dummy as sizeOf };')
        }
        if (/font.js/.test(id)) {
          ['download', 'draw', 'drawMetrics', 'drawPoints', 'getPath', 'getPaths'].forEach(name => {
            removeMethodAssignment(`Font.prototype.${name}`)
          })
          source += '\nFont.prototype["$troika_Bidi"] = Bidi;'
        }
        if (/glyph.js/.test(id)) {
          ['draw', 'drawMetrics', 'drawPoints', 'getContours', 'getBoundingBox'].forEach(name => {
            removeMethodAssignment(`Glyph.prototype.${name}`)
          })
        }
        if(/path.js/.test(id)) {
          ['toDOMElement', 'toSVG', 'toPathData', 'draw', 'getBoundingBox'].forEach(name => {
            removeMethodAssignment(`Path.prototype.${name}`)
          })
        }

        return source

        function removeMethodAssignment(name) {
          const re = new RegExp(`(${name}\\s*=)`)
          source = source.replace(re, `$1 function(){};\nvar prunable${Math.round(Math.random()*1e12)}=`)
        }
      }
    },
    buble(),
    terser({
      ecma: 5, //2015, //sets for both compress and format
      compress: {
      },
      mangle: {
        properties: {
          regex: /^(parse|begin)|(tables|Tables)$/
        }
      }
    }),
    // visualizer({
    //   //sourcemap: true,
    //   gzipSize: true,
    //   brotliSize: true
    // })
  ],
  output: {
    format: 'iife',
    name: 'opentype',
    file: 'libs/opentype.factory.js',
    banner,
    footer
  }
}

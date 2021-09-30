/**
 * An adapter that allows Typr.js to be used as if it were (a subset of) the OpenType.js API.
 * Also adds support for WOFF files (not WOFF2).
 */

import opentypeFactory from '../../libs/opentype.factory.js'
import { defineWorkerModule } from 'troika-worker-utils'

function parserFactory(opentype) {
  const cmdArgs = {
    M: ['x', 'y'],
    L: ['x', 'y'],
    Q: ['x1', 'y1', 'x', 'y'],
    C: ['x1', 'y1', 'x2', 'y2', 'x', 'y'],
    Z: []
  }

  const collapsedLigGlyph = {}

  function wrapFontObj(otFont) {
    const glyphMap = Object.create(null)

    // Patch
    otFont.TODO_stringToGlyphs = function (s, options) {
      // We left ourselves a reference to Bidi in the build script
      const bidi = new otFont.$troika_Bidi()

      // Patch bidi. to leave -1's in place of collapsed ligature glyphs so we can still
      // track character indices in the string
      bidi.getTextGlyphs = function (text) {
        this.processText(text);
        return this.tokenizer.tokens.map(token => {
          const index = token.state.deleted ? -1 : token.activeState.value
          return Array.isArray(index) ? index[0] : index
        })
      };

      // Create and register 'glyphIndex' state modifier
      const charToGlyphIndexMod = token => this.charToGlyphIndex(token.char)
      bidi.registerModifier('glyphIndex', null, charToGlyphIndexMod)

      // roll-back to default features
      let features = options ?
        this.updateFeatures(options.features) :
        this.defaultRenderOptions.features

      bidi.applyFeatures(this, features)

      const indexes = bidi.getTextGlyphs(s)

      // convert glyph indexes to glyph objects
      return indexes.map(idx => {
        return idx === -1 ? collapsedLigGlyph : (this.glyphs.get(idx) || this.glyphs.get(0))
      })
    }

    return {
      unitsPerEm: otFont.unitsPerEm,
      ascender: otFont.ascender,
      descender: otFont.descender,
      forEachGlyph (text, fontSize, letterSpacing, callback) {
        const opentypeOpts = {
          kerning: true,
          features: { liga: true, rlig: true },
          letterSpacing
        }
        let charIndex = 0
        otFont.forEachGlyph(text, 0, 0, fontSize, opentypeOpts, (otGlyph, glyphX) => {
          if (otGlyph !== collapsedLigGlyph) {
            let glyphObj = glyphMap[otGlyph.index]
            if (!glyphObj) {
              glyphObj = glyphMap[otGlyph.index] = {
                index: otGlyph.index,
                advanceWidth: otGlyph.advanceWidth,
                xMin: otGlyph.xMin,
                yMin: otGlyph.yMin,
                xMax: otGlyph.xMax,
                yMax: otGlyph.yMax,
                pathCommandCount: otGlyph.path.commands.length,
                forEachPathCommand (callback) {
                  const cbArgs = []
                  otGlyph.path.commands.forEach(cmd => {
                    const argNames = cmdArgs[cmd.type]
                    const argCount = argNames.length
                    cbArgs.length = argCount + 1
                    cbArgs[0] = cmd.type
                    for (let i = 0; i < argCount; i++) {
                      cbArgs[i + 1] = cmd[argNames[i]]
                    }
                    callback.apply(null, cbArgs)
                  })
                }
              }
            }
            callback(glyphObj, glyphX, charIndex)
          }
          charIndex += (text.codePointAt(charIndex) > 0xffff ? 2 : 1)
        })
      }
    }
  }

  return function parse(buffer) {
    const otFont = opentype.parse(buffer, {lowMemory: true})
    return wrapFontObj(otFont)
  }
}


const workerModule = /*#__PURE__*/defineWorkerModule({
  name: 'OpenType Font Parser',
  dependencies: [opentypeFactory, parserFactory],
  init(opentypeFactory, parserFactory) {
    const opentype = opentypeFactory()
    return parserFactory(opentype)
  }
})


export default workerModule

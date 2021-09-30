/**
 * Initializes and returns a function to generate an SDF texture for a given glyph.
 * @param {function} createGlyphSegmentsIndex - factory for a GlyphSegmentsIndex implementation.
 * @param {number} config.sdfExponent
 * @param {number} config.sdfMargin
 *
 * @return {function(Object): {renderingBounds: [minX, minY, maxX, maxY], textureData: Uint8Array}}
 */
function createSDFGenerator(createGlyphSegmentsIndex, config) {
  const { sdfExponent, sdfMargin } = config

  /**
   * How many straight line segments to use when approximating a glyph's quadratic/cubic bezier curves.
   */
  const CURVE_POINTS = 16

  /**
   * Find the point on a quadratic bezier curve at t where t is in the range [0, 1]
   */
  function pointOnQuadraticBezier(x0, y0, x1, y1, x2, y2, t) {
    const t2 = 1 - t
    return {
      x: t2 * t2 * x0 + 2 * t2 * t * x1 + t * t * x2,
      y: t2 * t2 * y0 + 2 * t2 * t * y1 + t * t * y2
    }
  }

  /**
   * Find the point on a cubic bezier curve at t where t is in the range [0, 1]
   */
  function pointOnCubicBezier(x0, y0, x1, y1, x2, y2, x3, y3, t) {
    const t2 = 1 - t
    return {
      x: t2 * t2 * t2 * x0 + 3 * t2 * t2 * t * x1 + 3 * t2 * t * t * x2 + t * t * t * x3,
      y: t2 * t2 * t2 * y0 + 3 * t2 * t2 * t * y1 + 3 * t2 * t * t * y2 + t * t * t * y3
    }
  }

  /**
   * Generate an SDF texture segment for a single glyph.
   * @param {object} glyphObj
   * @param {number} sdfSize - the length of one side of the SDF image.
   *        Larger images encode more details. Must be a power of 2.
   * @return {{textureData: Uint8Array, renderingBounds: *[]}}
   */
  function generateSDF(glyphObj, sdfSize) {
    //console.time('glyphSDF')

    const textureData = new Uint8Array(sdfSize * sdfSize)

    // Determine mapping between glyph grid coords and sdf grid coords
    const glyphW = glyphObj.xMax - glyphObj.xMin
    const glyphH = glyphObj.yMax - glyphObj.yMin

    // Choose a maximum search distance radius in font units, based on the glyph's max dimensions
    const fontUnitsMaxSearchDist = Math.max(glyphW, glyphH)

    // Margin - add an extra 0.5 over the configured value because the outer 0.5 doesn't contain
    // useful interpolated values and will be ignored anyway.
    const fontUnitsMargin = Math.max(glyphW, glyphH) / sdfSize * (sdfMargin * sdfSize + 0.5)

    // Metrics of the texture/quad in font units
    const textureMinFontX = glyphObj.xMin - fontUnitsMargin
    const textureMinFontY = glyphObj.yMin - fontUnitsMargin
    const textureMaxFontX = glyphObj.xMax + fontUnitsMargin
    const textureMaxFontY = glyphObj.yMax + fontUnitsMargin
    const fontUnitsTextureWidth = textureMaxFontX - textureMinFontX
    const fontUnitsTextureHeight = textureMaxFontY - textureMinFontY
    const fontUnitsTextureMaxDim = Math.max(fontUnitsTextureWidth, fontUnitsTextureHeight)

    function textureXToFontX(x) {
      return textureMinFontX + fontUnitsTextureWidth * x / sdfSize
    }

    function textureYToFontY(y) {
      return textureMinFontY + fontUnitsTextureHeight * y / sdfSize
    }

    if (glyphObj.pathCommandCount) { //whitespace chars will have no commands, so we can skip all this
      // Decompose all paths into straight line segments and add them to a quadtree
      const lineSegmentsIndex = createGlyphSegmentsIndex(glyphObj)
      let firstX, firstY, prevX, prevY
      glyphObj.forEachPathCommand((type, x0, y0, x1, y1, x2, y2) => {
        switch (type) {
          case 'M':
            prevX = firstX = x0
            prevY = firstY = y0
            break
          case 'L':
            if (x0 !== prevX || y0 !== prevY) { //yup, some fonts have zero-length line commands
              lineSegmentsIndex.addLineSegment(prevX, prevY, (prevX = x0), (prevY = y0))
            }
            break
          case 'Q': {
            let prevPoint = {x: prevX, y: prevY}
            for (let i = 1; i < CURVE_POINTS; i++) {
              let nextPoint = pointOnQuadraticBezier(
                prevX, prevY,
                x0, y0,
                x1, y1,
                i / (CURVE_POINTS - 1)
              )
              lineSegmentsIndex.addLineSegment(prevPoint.x, prevPoint.y, nextPoint.x, nextPoint.y)
              prevPoint = nextPoint
            }
            prevX = x1
            prevY = y1
            break
          }
          case 'C': {
            let prevPoint = {x: prevX, y: prevY}
            for (let i = 1; i < CURVE_POINTS; i++) {
              let nextPoint = pointOnCubicBezier(
                prevX, prevY,
                x0, y0,
                x1, y1,
                x2, y2,
                i / (CURVE_POINTS - 1)
              )
              lineSegmentsIndex.addLineSegment(prevPoint.x, prevPoint.y, nextPoint.x, nextPoint.y)
              prevPoint = nextPoint
            }
            prevX = x2
            prevY = y2
            break
          }
          case 'Z':
            if (prevX !== firstX || prevY !== firstY) {
              lineSegmentsIndex.addLineSegment(prevX, prevY, firstX, firstY)
            }
            break
        }
      })

      // For each target SDF texel, find the distance from its center to its nearest line segment,
      // map that distance to an alpha value, and write that alpha to the texel
      for (let sdfX = 0; sdfX < sdfSize; sdfX++) {
        for (let sdfY = 0; sdfY < sdfSize; sdfY++) {
          const signedDist = lineSegmentsIndex.findNearestSignedDistance(
            textureXToFontX(sdfX + 0.5),
            textureYToFontY(sdfY + 0.5),
            fontUnitsMaxSearchDist
          )

          // Use an exponential scale to ensure the texels very near the glyph path have adequate
          // precision, while allowing the distance field to cover the entire texture, given that
          // there are only 8 bits available. Formula visualized: https://www.desmos.com/calculator/uiaq5aqiam
          let alpha = Math.pow((1 - Math.abs(signedDist) / fontUnitsTextureMaxDim), sdfExponent) / 2
          if (signedDist < 0) {
            alpha = 1 - alpha
          }

          alpha = Math.max(0, Math.min(255, Math.round(alpha * 255))) //clamp
          textureData[sdfY * sdfSize + sdfX] = alpha
        }
      }
    }

    //console.timeEnd('glyphSDF')

    return {
      textureData: textureData,

      renderingBounds: [
        textureMinFontX,
        textureMinFontY,
        textureMaxFontX,
        textureMaxFontY
      ]
    }
  }


  return generateSDF
}


export { createSDFGenerator }

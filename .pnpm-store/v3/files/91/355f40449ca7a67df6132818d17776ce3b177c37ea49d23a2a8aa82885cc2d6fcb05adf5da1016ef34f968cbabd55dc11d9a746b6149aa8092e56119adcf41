/**
 * Index for performing fast spatial searches of a glyph's line segments.
 * @return {{addLineSegment:function, findNearestSignedDistance:function}}
 */
export function createGlyphSegmentsIndex() {
  let needsSort = false
  const segments = []

  function sortSegments() {
    if (needsSort) {
      // sort by maxX, this will let us short-circuit some loops below
      segments.sort(function(a, b) {
        return a.maxX - b.maxX
      })
      needsSort = false
    }
  }

  /**
   * Add a line segment to the index.
   * @param x0
   * @param y0
   * @param x1
   * @param y1
   */
  function addLineSegment(x0, y0, x1, y1) {
    const segment = {
      x0, y0, x1, y1,
      minX: Math.min(x0, x1),
      minY: Math.min(y0, y1),
      maxX: Math.max(x0, x1),
      maxY: Math.max(y0, y1)
    }
    segments.push(segment)
    needsSort = true
  }

  /**
   * For a given x/y, search the index for the closest line segment and return
   * its signed distance. Negative = inside, positive = outside, zero = on edge
   * @param x
   * @param y
   * @returns {number}
   */
  function findNearestSignedDistance(x, y) {
    sortSegments()
    let closestDistSq = Infinity
    let closestDist = Infinity

    for (let i = segments.length; i--;) {
      const seg = segments[i]
      if (seg.maxX + closestDist <= x) break //sorting by maxX means no more can be closer, so we can short-circuit
      if (x + closestDist > seg.minX && y - closestDist < seg.maxY && y + closestDist > seg.minY) {
        const distSq = absSquareDistanceToLineSegment(x, y, seg.x0, seg.y0, seg.x1, seg.y1)
        if (distSq < closestDistSq) {
          closestDistSq = distSq
          closestDist = Math.sqrt(closestDistSq)
        }
      }
    }

    // Flip to negative distance if inside the poly
    if (isPointInPoly(x, y)) {
      closestDist = -closestDist
    }
    return closestDist
  }

  // Determine whether the given point lies inside or outside the glyph. Uses a simple
  // ray casting algorithm using a ray pointing east from the point.
  function isPointInPoly(x, y) {
    sortSegments()
    let inside = false
    for (let i = segments.length; i--;) {
      const seg = segments[i]
      if (seg.maxX <= x) break //sorting by maxX means no more can cross, so we can short-circuit
      if (seg.minY < y && seg.maxY > y) {
        const intersects = ((seg.y0 > y) !== (seg.y1 > y)) && (x < (seg.x1 - seg.x0) * (y - seg.y0) / (seg.y1 - seg.y0) + seg.x0)
        if (intersects) {
          inside = !inside
        }
      }
    }
    return inside
  }

  // Find the absolute distance from a point to a line segment at closest approach
  function absSquareDistanceToLineSegment(x, y, lineX0, lineY0, lineX1, lineY1) {
    const ldx = lineX1 - lineX0
    const ldy = lineY1 - lineY0
    const lengthSq = ldx * ldx + ldy * ldy
    const t = lengthSq ? Math.max(0, Math.min(1, ((x - lineX0) * ldx + (y - lineY0) * ldy) / lengthSq)) : 0
    const dx = x - (lineX0 + t * ldx)
    const dy = y - (lineY0 + t * ldy)
    return dx * dx + dy * dy
  }

  return {
    addLineSegment,
    findNearestSignedDistance
  }
}

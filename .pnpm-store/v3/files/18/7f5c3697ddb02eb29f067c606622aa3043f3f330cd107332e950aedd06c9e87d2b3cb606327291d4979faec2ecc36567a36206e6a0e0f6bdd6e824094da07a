/**
 * Basic quadtree impl for performing fast spatial searches of a glyph's line segments.
 */
export function createGlyphSegmentsQuadtree(glyphObj) {
  // Pick a good initial power-of-two bounding box that will hold all possible segments
  const {xMin, yMin, xMax, yMax} = glyphObj
  const dx = xMax - xMin
  const dy = yMax - yMin
  const cx = Math.round(xMin + dx / 2)
  const cy = Math.round(yMin + dy / 2)
  const r = Math.pow(2, Math.floor(Math.log(Math.max(dx, dy)) * Math.LOG2E))
  const INF = Infinity

  const root = {
    0: null,
    1: null,
    2: null,
    3: null,
    data: null,
    cx: cx,
    cy: cy,
    r: r,
    minX: INF,
    minY: INF,
    maxX: -INF,
    maxY: -INF
  }

  /**
   * Add a line segment to the quadtree.
   * @param x0
   * @param y0
   * @param x1
   * @param y1
   */
  function addLineSegment(x0, y0, x1, y1) {
    const cx = (x0 + x1) / 2
    const cy = (y0 + y1) / 2
    const segment = {
      x0, y0, x1, y1, cx, cy,
      minX: Math.min(x0, x1),
      minY: Math.min(y0, y1),
      maxX: Math.max(x0, x1),
      maxY: Math.max(y0, y1),
      next: null
    }
    insertSegment(segment, root)
  }

  function insertSegment(segment, node) {
    // update node min/max stats
    const {minX, minY, maxX, maxY, cx, cy} = segment
    if (minX < node.minX) node.minX = minX
    if (minY < node.minY) node.minY = minY
    if (maxX > node.maxX) node.maxX = maxX
    if (maxY > node.maxY) node.maxY = maxY

    // leaf
    let leafSegment = node.data
    if (leafSegment) {
      // coincident; push as linked list
      if (leafSegment.cx === cx && leafSegment.cy === cy) {
        while (leafSegment.next) leafSegment = leafSegment.next
        leafSegment.next = segment
      }
      // non-coincident; split leaf to branch
      else {
        node.data = null
        insertSegment(leafSegment, node)
        insertSegment(segment, node)
      }
    }
    // branch
    else {
      // find target sub-index for the segment's centerpoint
      const subIndex = (cy < node.cy ? 0 : 2) + (cx < node.cx ? 0 : 1)

      // subnode already at index: recurse
      if (node[subIndex]) {
        insertSegment(segment, node[subIndex])
      }
      // create new leaf
      else {
        node[subIndex] = {
          0: null,
          1: null,
          2: null,
          3: null,
          data: segment,
          cx: node.cx + node.r / 2 * (subIndex % 2 ? 1 : -1),
          cy: node.cy + node.r / 2 * (subIndex < 2 ? -1 : 1),
          r: node.r / 2,
          minX: minX,
          minY: minY,
          maxX: maxX,
          maxY: maxY
        }
      }
    }
  }

  function walkTree(callback) {
    walkBranch(root, callback)
  }

  function walkBranch(root, callback) {
    if (callback(root) !== false && !root.data) {
      for (let i = 0; i < 4; i++) {
        if (root[i] !== null) {
          walkBranch(root[i], callback)
        }
      }
    }
  }

  /**
   * For a given x/y, search the quadtree for the closest line segment and return
   * its signed distance. Negative = inside, positive = outside, zero = on edge
   * @param x
   * @param y
   * @param maxSearchRadius
   * @returns {number}
   */
  function findNearestSignedDistance(x, y, maxSearchRadius) {
    let closestDist = maxSearchRadius
    let closestDistSq = closestDist * closestDist

    walkTree(function visit(node) {
      // Ignore nodes that can't possibly have segments closer than what we've already found. We base
      // this on a simple rect bounds check; radial would be more accurate but much slower.
      if (
        x - closestDist > node.maxX || x + closestDist < node.minX ||
        y - closestDist > node.maxY || y + closestDist < node.minY
      ) {
        return false
      }

      // Leaf - check each segment's actual distance
      for (let segment = node.data; segment; segment = segment.next) {
        const distSq = absSquareDistanceToLineSegment(x, y, segment.x0, segment.y0, segment.x1, segment.y1)
        if (distSq < closestDistSq) {
          closestDistSq = distSq
          closestDist = Math.sqrt(distSq)
        }
      }
    })

    // Flip to negative distance if inside the poly
    if (isPointInPoly(x, y)) {
      closestDist = -closestDist
    }
    return closestDist
  }

  // Determine whether the given point lies inside or outside the glyph. Uses a simple
  // ray casting algorithm using a ray pointing east from the point, optimized by using
  // the quadtree search to test as few lines as possible.
  function isPointInPoly(x, y) {
    let inside = false
    walkTree(node => {
      // Ignore nodes whose bounds can't possibly cross our east-pointing ray
      if (node.maxX < x || node.minY > y || node.maxY < y) {
        return false
      }

      // Leaf - test each segment for whether it crosses our east-pointing ray
      for (let segment = node.data; segment; segment = segment.next) {
        const {x0, y0, x1, y1} = segment
        const intersects = ((y0 > y) !== (y1 > y)) && (x < (x1 - x0) * (y - y0) / (y1 - y0) + x0)
        if (intersects) {
          inside = !inside
        }
      }
    })
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

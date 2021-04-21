export function clamp(v, min, max) {
  return Math.max(min, Math.min(v, max))
}

export const V = {
  toVector(v) {
    return Array.isArray(v) ? v : [v, v]
  },
  add(v1, v2) {
    return [v1[0] + v2[0], v1[1] + v2[1]]
  },
  sub(v1, v2) {
    return [v1[0] - v2[0], v1[1] - v2[1]]
  },
  addTo(v1, v2) {
    v1[0] += v2[0]
    v1[1] += v2[1]
  },
  subTo(v1, v2) {
    v1[0] -= v2[0]
    v1[1] -= v2[1]
  },
  clamp(v1, v2, v3) {
    return [clamp(v1[0], v2[0], v2[1]), clamp(v1[1], v3[0], v3[1])]
  }
}

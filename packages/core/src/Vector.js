export const V = {
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
  }
}

export const coordinatesConfigResolver = {
  axis(_v, _k, { axis }) {
    this.lockDirection = axis === 'lock'
    if (!this.lockDirection) return axis
  }
}

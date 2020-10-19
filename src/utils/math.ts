// vector add
export function addV<T extends number[]>(v1: T, v2: T): T {
  return v1.map((v, i) => v + v2[i]) as T
}

// vector substract
export function subV<T extends number[]>(v1: T, v2: T): T {
  return v1.map((v, i) => v - v2[i]) as T
}

/**
 * Calculates distance
 * @param movement the difference between current and initial vectors
 * @returns distance
 */
export function calculateDistance(movement: number[]): number {
  return Math.hypot(...movement)
}

interface Kinematics {
  velocities: number[]
  velocity: number
  distance: number
  direction: number[]
}

export function calculateAllGeometry<T extends number[]>(movement: T, delta: T = movement) {
  const dl = calculateDistance(delta)

  const alpha = dl === 0 ? 0 : 1 / dl

  const direction = delta.map(v => alpha * v) as T
  const distance = calculateDistance(movement)

  return { distance, direction }
}

/**
 * Calculates all kinematics
 * @template T the expected vector type
 * @param movement the difference between current and initial vectors
 * @param delta the difference between current and previous vectors
 * @param delta_t the time difference between current and previous timestamps
 * @returns all kinematics
 */
export function calculateAllKinematics<T extends number[]>(movement: T, delta: T, dt: number): Kinematics {
  const dl = calculateDistance(delta)

  const alpha = dl === 0 ? 0 : 1 / dl
  const beta = dt === 0 ? 0 : 1 / dt

  const velocity = beta * dl
  const velocities = delta.map(v => beta * v)
  const direction = delta.map(v => alpha * v)
  const distance = calculateDistance(movement)

  return { velocities, velocity, distance, direction }
}

/**
 * Because IE doesn't support `Math.sign` function, so we use the polyfill version of the function.
 * This polyfill function is suggested by Mozilla:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sign#Polyfill
 * @param x target number
 */
export function sign(x: number) {
  if (Math.sign) return Math.sign(x)
  return Number(x > 0) - Number(x < 0) || +x
}

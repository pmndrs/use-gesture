// vector add
export function addV<T extends number[]>(v1: T, v2: T): T {
  return v1.map((v, i) => v + v2[i]) as T
}

// vector substract
export function subV<T extends number[]>(v1: T, v2: T): T {
  return v1.map((v, i) => v - v2[i]) as T
}
/**
 * Calculates velocity
 * @param delta the difference between current and previous vectors
 * @param delta_t the time offset
 * @param len the length of the delta vector
 * @returns velocity
 */
function calculateVelocity(delta: number[], delta_t: number, len: number): number {
  len = len || Math.hypot(...delta)
  return delta_t ? len / delta_t : 0
}

/**
 * Calculates velocities vector
 * @template T the expected vector type
 * @param delta the difference between current and previous vectors
 * @param delta_t the time offset
 * @returns velocities vector
 */
function calculateVelocities<T extends number[]>(delta: T, delta_t: number): T {
  return (delta_t ? delta.map(v => v / delta_t) : Array(delta.length).fill(0)) as T
}

/**
 * Calculates distance
 * @param movement the difference between current and initial vectors
 * @returns distance
 */
export function calculateDistance(movement: number[]): number {
  return Math.hypot(...movement)
}

/**
 * Calculates direction
 * @template T the expected vector type
 * @param delta
 * @param len
 * @returns direction
 */
export function calculateDirection<T extends number[]>(delta: T, len?: number): T {
  len = len || Math.hypot(...delta) || 1
  return delta.map(v => v / len!) as T
}

interface Kinematics<T extends number[]> {
  velocities: T
  velocity: number
  distance: number
  direction: T
}

/**
 * Calculates all kinematics
 * @template T the expected vector type
 * @param movement the difference between current and initial vectors
 * @param delta the difference between current and previous vectors
 * @param delta_t the time difference between current and previous timestamps
 * @returns all kinematics
 */
export function calculateAllKinematics<T extends number[]>(movement: T, delta: T, delta_t: number): Kinematics<T> {
  const len = Math.hypot(...delta)

  return {
    velocities: calculateVelocities(delta, delta_t),
    velocity: calculateVelocity(delta, delta_t, len),
    distance: calculateDistance(movement),
    direction: calculateDirection(delta, len),
  }
}



// vector add
export const addV = <T extends number[]>(v1: T, v2: T): T => v1.map((v, i) => v + v2[i]) as T

// vector substract
export const subV = <T extends number[]>(v1: T, v2: T): T => v1.map((v, i) => v - v2[i]) as T

/**
 * Calculates velocity
 * @param delta the difference between current and previous vectors
 * @param delta_t the time offset
 * @param len the length of the delta vector
 * @returns velocity
 */
export function calculateVelocity(delta: number[], delta_t: number, len: number): number {
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
export function calculateVelocities<T extends number[]>(delta: T, delta_t: number): T {
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

export function getIntentional(movement: number, threshold: number): number | false {
  const abs = Math.abs(movement)
  return abs >= threshold ? Math.sign(movement) * threshold : false
}

// Based on @aholachek ;)
// https://twitter.com/chpwn/status/285540192096497664
// iOS constant = 0.55
export const rubberBand = (distance: number, dimension: number, constant = 0.15) => {
  if (distance === 0 && dimension === 0) return 0
  return (distance * dimension * constant) / (dimension + constant * distance)
}

export const rubberBandIfOutOfBounds = (delta: number, min: number, max: number, constant?: number) => {
  if (min !== Infinity && delta < min) {
    return -rubberBand(min - delta, max - min, constant) + min
  }
  if (max !== Infinity && delta > max) {
    return rubberBand(delta - max, max - min, constant) + max
  }
  return delta
}

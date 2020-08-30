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

/**
 * Because IE doesn't support `Math.sign` function, so we use the polyfill version of the function.
 * This polyfill function came from
 * :https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sign#Polyfill
 * @param x target number
 */
export function sign(x: number) {
  if (Math.sign) return Math.sign(x)
  return Number(x > 0) - Number(x < 0) || +x
}

export function getIntentionalDisplacement(movement: number, threshold: number): number | false {
  const abs = Math.abs(movement)
  return abs >= threshold ? sign(movement) * threshold : false
}

function minMax(value: number, min: number, max: number) {
  return Math.max(min, Math.min(value, max))
}

// Based on @aholachek ;)
// https://twitter.com/chpwn/status/285540192096497664
// iOS constant = 0.55

// https://medium.com/@nathangitter/building-fluid-interfaces-ios-swift-9732bb934bf5
function rubberband2(distance: number, constant: number) {
  // default constant from the article is 0.7
  return Math.pow(distance, constant * 5)
}

function rubberband(distance: number, dimension: number, constant: number) {
  if (dimension === 0 || Math.abs(dimension) === Infinity) return rubberband2(distance, constant)
  return (distance * dimension * constant) / (dimension + constant * distance)
}

export function rubberbandIfOutOfBounds(position: number, min: number, max: number, constant = 0.15) {
  if (constant === 0) return minMax(position, min, max)

  if (position < min) {
    return -rubberband(min - position, max - min, constant) + min
  }
  if (position > max) {
    return rubberband(position - max, max - min, constant) + max
  }
  return position
}

export declare function addV<T extends number[]>(v1: T, v2: T): T;
export declare function subV<T extends number[]>(v1: T, v2: T): T;
/**
 * Calculates distance
 * @param movement the difference between current and initial vectors
 * @returns distance
 */
export declare function calculateDistance(movement: number[]): number;
interface Kinematics {
    velocities: number[];
    velocity: number;
    distance: number;
    direction: number[];
}
export declare function calculateAllGeometry<T extends number[]>(movement: T, delta?: T): {
    distance: number;
    direction: T;
};
/**
 * Calculates all kinematics
 * @template T the expected vector type
 * @param movement the difference between current and initial vectors
 * @param delta the difference between current and previous vectors
 * @param delta_t the time difference between current and previous timestamps
 * @returns all kinematics
 */
export declare function calculateAllKinematics<T extends number[]>(movement: T, delta: T, dt: number): Kinematics;
/**
 * Because IE doesn't support `Math.sign` function, so we use the polyfill version of the function.
 * This polyfill function is suggested by Mozilla:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sign#Polyfill
 * @param x target number
 */
export declare function sign(x: number): number;
export {};

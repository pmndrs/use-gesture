/**
 * Mixes in a method to return just a plain object with no additional methods
 * @private
 * @param data - Any plain JSON response returned from the API
 * @return Enhanced object with toPlainObject method
 */
export default function toPlainObject<T = Record<string, unknown>, R = T>(data: T): T & {
    /**
     * Returns this entity as a plain JS object
     */
    toPlainObject(): R;
};

/**
 * Read-only token
 * See https://github.com/Borewit/strtok3 for more information
 */
export interface IGetToken<T> {

  /**
   * Length of encoded token in bytes
   */
  len: number;

  /**
   * Decode value from buffer at offset
   * @param buffer - Buffer to read the decoded value from
   * @param offset - Decode offset
   * @return Decoded value
   */
  get(buffer: Buffer, offset: number): T;
}

export interface IToken<T> extends IGetToken<T> {
  /**
   * Encode value to buffer
   * @param buffer - Buffer to write the encoded value to
   * @param offset - Buffer write offset
   * @param value - Value to decode of type T
   */
  put(buffer: Buffer, offset: number, value: T): number
}

import { encodeFloatToFourInts, decodeFloatFromFourInts } from '../src/ShaderFloatArray.js'



describe('encodeFloatToFourInts', () => {
  const testFloat = 0.123456789

  test('Writes four values to an Array', () => {
    const out = []
    encodeFloatToFourInts(testFloat, out, 0)
    expect(out.length).toBe(4)
    for (let i = 0; i < 4; i++) {
      expect(typeof out[i]).toBe('number')
    }
  })

  test('Writes to a Uint8Array the same as an Array', () => {
    const array = new Array(4)
    const typedArray = new Uint8Array(4)
    encodeFloatToFourInts(testFloat, array, 0)
    encodeFloatToFourInts(testFloat, typedArray, 0)
    expect(array).toEqual(Array.from(typedArray))
  })

  test('Writes starting at the startIndex', () => {
    const out = []
    encodeFloatToFourInts(testFloat, out, 1)
    expect(out.length).toBe(5)
    expect(out[0]).toBeUndefined()
    for (let i = 1; i < 5; i++) {
      expect(typeof out[i]).toBe('number')
    }
  })

})

describe('decodeFloatFromFourInts', () => {
  const testInts = [ 31, 122, 198, 80 ]

  test('Reads from an Array', () => {
    const decoded = decodeFloatFromFourInts(testInts, 0)
    expect(typeof decoded).toBe('number')
    expect(decoded <= 1 && decoded >= 0).toBe(true)
  })

  test('Reads from a Uint8Array the same as an Array', () => {
    const decodedFromArray = decodeFloatFromFourInts(testInts, 0)
    const decodedFromTypedArray = decodeFloatFromFourInts(new Uint8Array(testInts), 0)
    expect(decodedFromArray).toEqual(decodedFromTypedArray)
  })

  test('Reads starting at the startIndex', () => {
    const arr1 = [0, 0, 0].concat(testInts)
    const arr2 = [1, 1].concat(testInts)
    expect(decodeFloatFromFourInts(arr1, 3)).toEqual(decodeFloatFromFourInts(arr2, 2))
  })

})

describe('encoding + decoding', () => {
  // Build a repeatable random-ish set of input values between 0 and 1
  const values = [0, 1]
  for (let i = 1; i < 10000; i++) {
    values.push((Math.sin(i) + 1) / 2)
  }

  test('Precision loss is small', () => {
    const typedArray = new Uint8Array(4)
    for (let i = 0; i < values.length; i++) {
      encodeFloatToFourInts(values[i], typedArray, 0)
      const decoded = decodeFloatFromFourInts(typedArray, 0)
      expect(decoded).toBeCloseTo(values[i], 9)
    }
  })

  test('0 and 1 have no precision loss', () => {
    const typedArray = new Uint8Array(4)
    encodeFloatToFourInts(0, typedArray, 0)
    expect(decodeFloatFromFourInts(typedArray, 0)).toBe(0)
    encodeFloatToFourInts(1, typedArray, 0)
    expect(decodeFloatFromFourInts(typedArray, 0)).toBe(1)
  })

})


describe.skip('ShaderFloatArray', () => {
  //TODO
})

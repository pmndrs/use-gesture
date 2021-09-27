const promisesAplusTests = require('promises-aplus-tests')
import Thenable, {BespokeThenable, NativePromiseThenable} from '../src/Thenable.js'

// simple bridge from mocha `specify` to jest's equivalent
global.specify = test

/**
 * Compliance tests for BespokeThenable
 * We use the `promises-aplus-tests` suite to run a full Promises/A+ compliance test
 */
promisesAplusTests.mocha({
  deferred() {
    const thenable = new BespokeThenable()
    return {
      promise: thenable,
      resolve: thenable.resolve,
      reject: thenable.reject
    }
  }
})



test('Uses NativePromiseThenable when native Promise is available', () => {
  // Test env always has native Promise
  // TODO find a way to test the non-native-Promise case?
  expect(Thenable).toBe(NativePromiseThenable)
})


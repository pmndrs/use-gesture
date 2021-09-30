require('./_jsdom-worker.js')
const {defineWorkerModule} = require('../src/WorkerModules.js')
const {default: ThenableWorkerModule} = require('../src/ThenableWorkerModule.js')


beforeEach(() => {
  // Functions that are run in the worker can place breadcrumbs in this object that
  // `expect` matchers can then retrieve and test later on.
  global._testDataBucket = {}
})



test('Does not throw when invoked as a function module (no-op)', () => {
  expect(() => {
    ThenableWorkerModule()
  }).not.toThrow()
})

test('Registers a Thenable function', () => {
  const moduleFn = defineWorkerModule({
    dependencies: [ThenableWorkerModule],
    init: function(Thenable) {
      expect(Thenable).toEqual(expect.any(Function))
      expect(Thenable()).toEqual(expect.objectContaining({then: expect.any(Function)}))
      return function() {}
    }
  })
  return moduleFn()
})

test('Shares a single Thenable instance', () => {
  _testDataBucket.depInstances = []
  const modulePromises = []
  for(let i = 0; i < 5; i++) {
    const moduleFn = defineWorkerModule({
      dependencies: [ThenableWorkerModule],
      init: function(Thenable) {
        _testDataBucket.depInstances.push(Thenable)
        return function() {}
      }
    })
    modulePromises.push(moduleFn())
  }
  return Promise.all(modulePromises).then(results => {
    expect(_testDataBucket.depInstances.length).toBe(5)
    for (let i = 1; i < 5; i++) {
      expect(_testDataBucket.depInstances[i]).toBe(_testDataBucket.depInstances[0])
    }
  })
})



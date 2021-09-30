import Thenable from './Thenable.js'
import {defineWorkerModule} from './WorkerModules.js'

/**
 * Just the {@link Thenable} function wrapped as a worker module. If another worker
 * module needs Thenable as a dependency, it's better to pass this module rather than
 * the raw function in its `dependencies` array so it only gets registered once.
 */
export default /*#__PURE__*/defineWorkerModule({
  name: 'Thenable',
  dependencies: [Thenable],
  init: function(Thenable) {
    return Thenable
  }
})

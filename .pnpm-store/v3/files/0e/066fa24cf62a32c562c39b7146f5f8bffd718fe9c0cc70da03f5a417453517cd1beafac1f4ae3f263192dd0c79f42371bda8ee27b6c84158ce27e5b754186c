const isInteractive = require('./isInteractive')
const Spinner = require('./spinner')
const PlainSpinner = require('./plainSpinner')

const spinnerFactory = function (...options) {
  let SpinnerFunction = isInteractive() ? Spinner : PlainSpinner
  return new SpinnerFunction(...options)
}

module.exports = spinnerFactory

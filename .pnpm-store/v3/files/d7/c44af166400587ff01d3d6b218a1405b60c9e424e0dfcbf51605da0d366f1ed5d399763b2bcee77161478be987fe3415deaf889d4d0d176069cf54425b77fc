'use strict'

/**
 * Returns job number if project is run on CI or `1` on local.
 *
 * @return {number} CI job number
 *
 * @example
 * const ciJobNumber = require('ci-job-number')
 *
 * if (ciJobNumber() === 1) {
 *   runSpellingCheck()
 * } else {
 *   console.warn('To speed up CI spelling check runs only in first job')
 * }
 */
module.exports = function ciJobNumber () {
  if (process.env.CI_JOB_NUMBER) {
    return parseInt(process.env.CI_JOB_NUMBER)
  } else if (process.env.TRAVIS) {
    return parseInt(process.env.TRAVIS_JOB_NUMBER.split('.')[1])
  } else if (process.env.APPVEYOR) {
    return parseInt(process.env.APPVEYOR_JOB_NUMBER)
  } else if (process.env.CIRCLECI) {
    return parseInt(process.env.CIRCLE_NODE_INDEX) + 1
  } else if (process.env.SEMAPHORE) {
    return parseInt(process.env.SEMAPHORE_CURRENT_THREAD)
  } else if (process.env.GITLAB_CI) {
    return parseInt(process.env.CI_NODE_INDEX || '1')
  } else {
    return 1
  }
}

#!/usr/bin/env node

let ciJobNumber = require('ci-job-number')
let { yellow } = require('colorette')

if (ciJobNumber() !== 1) {
  process.stderr.write(
    yellow('Size Limit runs only on first CI job, to save CI resources\n')
  )
  process.exit(0)
}

require('./run.js')(process)

#!/usr/bin/env node

const fetch = require('node-fetch')
const shared = require('./shared')
const chunks = []

process.stdin.resume()
process.stdin.setEncoding('utf8')

process.stdin.on('data', function (chunk) {
  chunks.push(chunk)
})

process.stdin.on('end', function () {
  const input = JSON.parse(chunks.join(''))
  const request = shared.deserializeRequest(fetch, ...input)

  fetch(request)
    .then(response => response.buffer()
      .then(buffer => respond([
        buffer.toString(),
        shared.serializeResponse(response)
      ]))
      .catch(error => respond([
        '',
        shared.serializeResponse(response),
        shared.serializeError(error)
      ]))
    )
    .catch(error => respond(shared.serializeError(error)))
})

function respond (message) {
  console.log(JSON.stringify(message))
}

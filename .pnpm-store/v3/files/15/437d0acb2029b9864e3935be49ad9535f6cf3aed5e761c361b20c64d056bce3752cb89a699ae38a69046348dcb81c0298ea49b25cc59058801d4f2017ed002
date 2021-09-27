const exec = require('child_process').execFileSync
const path = require('path')
const { URL } = require('url')
const _fetch = require('node-fetch')
const shared = require('./shared')

function fetch (resource, init) {
  const request = []

  if (resource instanceof fetch.Request) {
    request.push(...shared.serializeRequest(resource))
  } else if (resource instanceof URL) {
    request.push(resource.href, {})
  } else {
    request.push(resource, {})
  }

  Object.assign(request[1], init)

  request[1].headers = new _fetch.Headers(request[1].headers)

  if (request[1].body) {
    const contentType = extractContentType(request)
    if (contentType && !request[1].headers.get('content-type')) { request[1].headers.append('content-type', contentType) }
    request[1].body = shared.parseBody(init.body).toString()
  }

  request[1].headers = shared.serializeHeaders(request[1].headers)

  // TODO credentials

  const response = JSON.parse(sendMessage(request))
  if ('headers' in response[1]) {
    return shared.deserializeResponse(fetch, ...response)
  } else {
    throw shared.deserializeError(fetch, ...response)
  }
}

function sendMessage (message) {
  return exec(process.execPath, [path.join(__dirname, 'worker.js')], {
    windowsHide: true,
    maxBuffer: Infinity,
    input: JSON.stringify(message),
    shell: false
  }).toString()
}

function extractContentType (input) {
  const request = new _fetch.Request(...input)
  return request.headers.get('content-type') || undefined
}

const _body = Symbol('bodyBuffer')
const _bodyError = Symbol('bodyError')

class SyncRequest extends _fetch.Request {
  constructor (resource, init = {}) {
    const buffer = shared.parseBody(init.body)

    super(resource, init)
    defineBuffer(this, buffer)
  }

  clone () {
    checkBody(this)
    return new SyncRequest(...shared.serializeRequest(this))
  }
}

class SyncResponse extends _fetch.Response {
  constructor (body, init, options = {}) {
    const {
      buffer = shared.parseBody(body),
      bodyError
    } = options

    super(body, init)
    defineBuffer(this, buffer)
    if (bodyError) defineBodyError(this, bodyError)
  }

  clone () {
    checkBody(this)
    const buffer = Buffer.from(this[_body])
    return new SyncResponse(
      shared.createStream(buffer),
      shared.serializeResponse(this),
      {
        buffer,
        bodyError: this[_bodyError]
      }
    )
  }
}

class Body {
  static mixin (proto) {
    for (const name of Object.getOwnPropertyNames(Body.prototype)) {
      if (name === 'constructor') { continue }
      const desc = Object.getOwnPropertyDescriptor(Body.prototype, name)
      Object.defineProperty(proto, name, {
        ...desc,
        enumerable: true
      })
    }
  }

  arrayBuffer () {
    checkBody(this)
    const buf = consumeBody(this)
    return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength)
  }

  text () {
    checkBody(this)
    return consumeBody(this).toString()
  }

  json () {
    checkBody(this)
    try {
      return JSON.parse(consumeBody(this).toString())
    } catch (err) {
      throw new fetch.FetchError(`invalid json response body at ${this.url} reason: ${err.message}`, 'invalid-json')
    }
  }

  buffer () {
    checkBody(this)
    return Buffer.from(consumeBody(this))
  }

  textConverted () {
    throw new fetch.FetchError('textConverted not implemented')
  }
}

function _super (self, method) {
  return Object.getPrototypeOf(Object.getPrototypeOf(self))[method].bind(self)
}

function checkBody (body) {
  if (body[_bodyError]) {
    throw body[_bodyError]
  }
  if (body.bodyUsed) {
    throw new TypeError(`body used already for: ${body.url}`)
  }
}

function consumeBody (body) {
  _super(body, 'buffer')().catch(error => console.error(error))
  return body[_body] || Buffer.alloc(0)
}

function defineBuffer (body, buffer) {
  Object.defineProperty(body, _body, {
    value: buffer,
    enumerable: false
  })
}

function defineBodyError (body, error) {
  Object.defineProperty(body, _bodyError, {
    value: shared.deserializeError(fetch, ...error),
    enumerable: false
  })
}

Body.mixin(SyncRequest.prototype)
Body.mixin(SyncResponse.prototype)
Object.defineProperties(SyncRequest.prototype, { clone: { enumerable: true } })
Object.defineProperties(SyncResponse.prototype, { clone: { enumerable: true } })

fetch.Headers = _fetch.Headers
fetch.FetchError = _fetch.FetchError
fetch.Request = SyncRequest
fetch.Response = SyncResponse
module.exports = fetch

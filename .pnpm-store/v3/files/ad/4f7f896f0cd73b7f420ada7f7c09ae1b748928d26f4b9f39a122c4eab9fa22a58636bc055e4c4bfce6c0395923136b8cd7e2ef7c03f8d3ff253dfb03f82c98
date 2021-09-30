const Stream = require('stream')

function serializeHeaders (headers) {
  return headers.raw()
}

function deserializeHeaders (fetch, old = {}) {
  const headers = new fetch.Headers()
  for (const name in old) {
    for (const value of old[name]) {
      headers.append(name, value)
    }
  }
  return headers
}

function serializeRequest (request) {
  return [
    request.url,
    {
      method: request.method,
      headers: request.headers,
      body: request.body,
      mode: request.mode,
      credentials: request.credentials,
      cache: request.cache,
      redirect: request.redirect,
      referrer: request.referrer,
      referrerPolicy: request.referrerPolicy,
      integrity: request.integrity,
      keepalive: request.keepalive,
      // signal: request.signal,

      // node-fetch props
      follow: request.follow,
      timeout: request.timeout,
      compress: request.compress,
      size: request.size
      // agent: request.agent
    }
  ]
}

function deserializeRequest (fetch, resource, init) {
  return new fetch.Request(resource, {
    ...init,
    body: init.body ? Buffer.from(init.body) : undefined,
    headers: deserializeHeaders(fetch, init.headers)
  })
}

function serializeResponse (response) {
  return {
    url: response.url,
    headers: response.headers.raw(),
    status: response.status,
    statusText: response.statusText,
    counter: response.redirected ? 1 : 0 // could be more than one, but no way of telling
  }
}

function deserializeResponse (fetch, body, init, bodyError) {
  const buffer = parseBody(body)

  return new fetch.Response(
    body ? createStream(buffer) : createStream(null),
    {
      ...init,
      headers: deserializeHeaders(fetch, init.headers)
    },
    {
      buffer,
      bodyError
    }
  )
}

const errors = {
  TypeError
}

function serializeError ({ constructor, message, type, code }) {
  return [
    constructor.name,
    [message, type, { code }]
  ]
}

function deserializeError (fetch, name, init) {
  if (name in errors) {
    return new errors[name](...init)
  } else {
    return new fetch.FetchError(...init)
  }
}

function parseBodyType (body) {
  if (body == null) {
    return 'Null'
  } else if (body.constructor.name === 'URLSearchParams') {
    return 'URLSearchParams'
  } else if (Buffer.isBuffer(body)) {
    return 'Buffer'
  } else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
    return 'ArrayBuffer'
  } else if (ArrayBuffer.isView(body)) {
    return 'ArrayBufferView'
  } else if (body instanceof Stream) {
    return 'Stream'
  } else {
    return 'String'
  }
}

function parseBody (body, type = parseBodyType(body)) {
  switch (type) {
    case 'Null': return null
    case 'URLSearchParams': return Buffer.from(body.toString())
    case 'Buffer': return body
    case 'ArrayBuffer': return Buffer.from(body)
    case 'ArrayBufferView': return Buffer.from(body.buffer, body.byteOffset, body.byteLength)
    case 'String': return Buffer.from(String(body))
    default: throw new TypeError(`sync-fetch does not support bodies of type: ${type}`)
  }
}

function createStream (buffer) {
  return new Stream.Transform({
    read () {
      this.push(buffer)
      this.push(null)
    }
  })
}

module.exports = {
  serializeHeaders,
  deserializeHeaders,
  serializeRequest,
  deserializeRequest,
  serializeResponse,
  deserializeResponse,
  serializeError,
  deserializeError,

  parseBodyType,
  parseBody,
  createStream
}

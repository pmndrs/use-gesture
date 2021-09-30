/* eslint-env browser */

const { Buffer } = require('buffer/')

function syncFetch (...args) {
  const [url, opts] = parseArgs(...args)

  const xhr = new XMLHttpRequest()
  xhr.withCredentials = opts.credentials === 'include'
  xhr.timeout = opts.timeout

  // Request
  xhr.open(opts.method || 'GET', url, false)

  try {
    xhr.responseType = 'arraybuffer'
  } catch (e) {
    // not in Worker scope
    // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseType#Synchronous_XHR_restrictions
  }

  for (const header of opts.headers) {
    xhr.setRequestHeader(...header)
  }

  xhr.send(opts.body || null)

  // Response
  let headers = xhr.getAllResponseHeaders()
  headers = headers && headers.split('\r\n').filter(Boolean).map(header => header.split(': ', 2))

  return new syncFetch.Response(xhr.response, {
    url: xhr.responseURL,
    status: xhr.status,
    statusText: xhr.statusText,
    headers,
    redirected: xhr.responseURL !== url
  })
}

function parseArgs (resource, init) {
  const request = []

  if (resource instanceof syncFetch.Request) {
    request.push(resource.url)
    request.push({
      method: resource.method,
      headers: resource.headers,
      body: resource.body
    })
  } else {
    request.push(resource, {})
  }

  Object.assign(request[1], init)

  request[1].headers = new syncFetch.Headers(request[1].headers || {})

  return request
}

const INTERNALS = Symbol('SyncFetch Internals')

class SyncRequest extends Request {
  constructor (resource, init = {}, body = init.body) {
    super(resource, init)
    this[INTERNALS] = {
      body: body ? Buffer.from(body) : null
    }
  }

  clone () {
    checkBody(this)
    return new SyncRequest(this.url, this)
  }
}

class SyncResponse extends Response {
  constructor (body, init = {}) {
    body = body ? Buffer.from(body) : null
    super(createStream(body), init)
    this[INTERNALS] = {
      url: init.url,
      redirected: init.redirected,
      body
    }
  }

  get url () {
    return this[INTERNALS].url
  }

  get redirected () {
    return this[INTERNALS].redirected
  }

  clone () {
    checkBody(this)
    return new SyncResponse(this[INTERNALS].body, {
      url: this.url,
      headers: this.headers,
      status: this.status,
      statusText: this.statusText,
      redirected: this.redirected
    })
  }
}

class Body {
  constructor (body) {
    this[INTERNALS] = {
      body: Buffer.from(body)
    }
  }

  static mixin (prototype) {
    for (const name of Object.getOwnPropertyNames(Body.prototype)) {
      if (name === 'constructor') { continue }
      const desc = Object.getOwnPropertyDescriptor(Body.prototype, name)
      Object.defineProperty(prototype, name, { ...desc, enumerable: true })
    }
  }

  arrayBuffer () {
    checkBody(this)
    const buffer = consumeBody(this)
    return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength)
  }

  blob () {
    checkBody(this)
    const type = this.headers && this.headers.get('content-type')
    return new Blob([consumeBody(this)], type && { type })
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
      throw new TypeError(`invalid json response body at ${this.url} reason: ${err.message}`, 'invalid-json')
    }
  }

  buffer () {
    checkBody(this)
    return consumeBody(this).clone()
  }
}

function checkBody (body) {
  if (body.bodyUsed) {
    throw new TypeError(`body used already for: ${body.url}`)
  }
}

function consumeBody (body) {
  _super(body, 'arrayBuffer')()
  return body[INTERNALS].body || Buffer.alloc(0)
}

function _super (self, method) {
  return Object.getPrototypeOf(Object.getPrototypeOf(self))[method].bind(self)
}

function createStream (body) {
  return new ReadableStream({
    start (controller) {
      controller.enqueue(body)
      controller.close()
    }
  })
}

Body.mixin(SyncRequest.prototype)
Body.mixin(SyncResponse.prototype)

syncFetch.Headers = self.Headers
syncFetch.Request = SyncRequest
syncFetch.Response = SyncResponse
module.exports = syncFetch

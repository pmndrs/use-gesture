exports.enter = {mdxjsEsm: enterMdxjsEsm}
exports.exit = {mdxjsEsm: exitMdxjsEsm, mdxjsEsmData: exitMdxjsEsmData}

function enterMdxjsEsm(token) {
  this.enter({type: 'mdxjsEsm', value: ''}, token)
  this.buffer() // Capture EOLs
}

function exitMdxjsEsm(token) {
  var value = this.resume()
  var node = this.exit(token)

  node.value = value

  if (token.estree) {
    node.data = {estree: token.estree}
  }
}

function exitMdxjsEsmData(token) {
  this.config.enter.data.call(this, token)
  this.config.exit.data.call(this, token)
}

const process = require('process')
const readline = require('readline')
const c = require('colorette')

const spinnersList = require('./spinnerAnimation')
const logSymbols = require('./logSymbols')
const { show: showCursor, hide: hideCursor } = require('./cursor')

function Spinner(textStr = '', opts = {}) {
  let text = textStr
  let timer = null

  let stream = opts.stream || process.stderr

  return {
    text,
    stopAndPrint({ color, symbol }) {
      clearInterval(timer)
      let colorFn = c[color]
      readline.clearLine(stream)
      readline.cursorTo(stream, 0)

      stream.write(`${colorFn(symbol)} ${text}\n`)

      showCursor()
      return this
    },
    fail() {
      return this.stopAndPrint({ color: 'red', symbol: logSymbols.error })
    },
    succeed() {
      return this.stopAndPrint({ color: 'green', symbol: logSymbols.success })
    },
    start() {
      hideCursor()

      let spinners = spinnersList
      let index = 0

      timer = setInterval(() => {
        index = this.intervalCallback(index, spinners)
      }, 100)
      return this
    },
    intervalCallback(index, spinners) {
      let line = spinners[index]

      if (line === undefined) {
        index = 0
        line = spinners[index]
      }
      readline.clearLine(stream)
      stream.write(`${c.green(line)} ${text}`)

      readline.cursorTo(stream, 0)

      return index + 1
    },
    stop() {
      clearInterval(timer)

      readline.clearLine(stream)

      showCursor()
      return this
    }
  }
}

module.exports = Spinner

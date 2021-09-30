exports.show = (writableStream = process.stderr) => {
  if (!writableStream.isTTY) {
    return
  }

  writableStream.write('\u001B[?25h')
}

exports.hide = (writableStream = process.stderr) => {
  if (!writableStream.isTTY) {
    return
  }

  writableStream.write('\u001B[?25l')
}

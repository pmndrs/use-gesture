function isUnicodeSupported() {
  if (process.platform !== 'win32') {
    return true
  }

  return (
    Boolean(process.env.CI) ||
    Boolean(process.env.WT_SESSION) || // Windows Terminal
    process.env.TERM_PROGRAM === 'vscode' ||
    process.env.TERM === 'xterm-256color' ||
    process.env.TERM === 'alacritty'
  )
}

module.exports = function () { return isUnicodeSupported(); };
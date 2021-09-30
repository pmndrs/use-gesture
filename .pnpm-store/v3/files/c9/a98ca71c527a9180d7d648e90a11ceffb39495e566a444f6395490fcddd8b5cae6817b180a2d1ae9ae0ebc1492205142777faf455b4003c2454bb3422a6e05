let webpack = require('webpack')

module.exports = function runWebpack(check) {
  return new Promise((resolve, reject) => {
    let compiler = webpack(check.webpackConfig)
    compiler.run((err, stats) => {
      if (err || stats.hasErrors()) {
        reject(err || new Error(stats.toString('errors-only')))
      } else {
        resolve(stats.toJson())
      }
    })
  })
}

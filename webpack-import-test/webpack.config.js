const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: { compress: true, mangle: false, format: { beautify: true } }
      })
    ],
    usedExports: true
  },
  mode: 'production',
  externals: {
    react: 'react'
  }
}

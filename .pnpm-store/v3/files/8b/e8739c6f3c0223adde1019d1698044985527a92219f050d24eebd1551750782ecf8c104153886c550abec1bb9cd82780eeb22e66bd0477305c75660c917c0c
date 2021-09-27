let { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
let PnpWebpackPlugin = require('pnp-webpack-plugin')
let { writeFile } = require('fs').promises
let escapeRegexp = require('escape-string-regexp')
let OptimizeCss = require('optimize-css-assets-webpack-plugin')
let { join } = require('path')
let mkdirp = require('mkdirp')

const STATIC =
  /\.(eot|woff2?|ttf|otf|svg|png|jpe?g|gif|webp|mp4|mp3|ogg|pdf|html|ico|md)$/

module.exports = async function getConfig(limitConfig, check, output) {
  if (check.import) {
    let loader = ''
    for (let i in check.import) {
      let list = check.import[i].replace(/}|{/g, '').trim()
      loader +=
        `import ${check.import[i]} from ${JSON.stringify(i)}\n` +
        `console.log(${list})\n`
    }
    await mkdirp(output)
    let entry = join(output, 'entry.js')
    await writeFile(entry, loader)
    check.files = entry
  }

  if (check.files.length === 0) {
    check.missed = true
    check.webpack = false
  }

  let config = {
    entry: {
      index: check.files
    },
    output: {
      filename: limitConfig.why && `${limitConfig.project}.js`,
      path: output
    },
    optimization: {
      concatenateModules: !check.disableModuleConcatenation
    },
    resolve: {
      plugins: [PnpWebpackPlugin]
    },
    resolveLoader: {
      plugins: [PnpWebpackPlugin.moduleLoader(module)]
    },
    module: {
      rules: [
        {
          test: STATIC,
          use: require.resolve('file-loader')
        },
        {
          test: /\.css$/,
          exclude: /\.module\.css$/,
          use: [require.resolve('style-loader'), require.resolve('css-loader')]
        },
        {
          test: /\.module\.css$/,
          use: [
            require.resolve('style-loader'),
            {
              loader: require.resolve('css-loader'),
              options: {
                modules: true
              }
            }
          ]
        }
      ]
    },
    plugins: [new OptimizeCss()]
  }

  if (check.ignore && check.ignore.length > 0) {
    let escaped = check.ignore.map(i => escapeRegexp(i))
    let ignorePattern = new RegExp(`^(${escaped.join('|')})($|/)`)
    config.externals = (context, request, callback) => {
      if (ignorePattern.test(request)) {
        callback(null, 'root a')
      } else {
        callback()
      }
    }
  }

  if (limitConfig.why) {
    config.plugins.push(
      new BundleAnalyzerPlugin({
        openAnalyzer: process.env.NODE_ENV !== 'test',
        analyzerMode: process.env.NODE_ENV === 'test' ? 'static' : 'server',
        defaultSizes: check.gzip === false ? 'parsed' : 'gzip',
        analyzerPort: 8888 + limitConfig.checks.findIndex(i => i === check)
      })
    )
  } else if (limitConfig.saveBundle) {
    config.plugins.push(
      new BundleAnalyzerPlugin({
        openAnalyzer: false,
        analyzerMode: 'disabled',
        generateStatsFile: true
      })
    )
  }

  return config
}

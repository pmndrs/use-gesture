process.env.CHROME_BIN = require('puppeteer').executablePath()

module.exports = function(config) {
  config.set({
    frameworks: ['mocha'],

    files: [
      {
        pattern: 'src/**/*.spec.tsx',
        watched: false,
      },
    ],

    preprocessors: {
      'src/**/*.spec.tsx': ['webpack', 'sourcemap'],
    },

    reporters: ['mocha'],

    webpack: {
      mode: 'development',
      devtool: 'inline-source-map',
      module: {
        rules: [
          {
            test: /\.(ts|tsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-env', { loose: true, modules: false, targets: true }],
                  '@babel/preset-react',
                  '@babel/preset-typescript',
                ],
                plugins: [
                  ['transform-react-remove-prop-types', { removeImport: true }],
                  ['@babel/transform-runtime', { regenerator: false, useESModules: true }],
                ],
              },
            },
          },
        ],
      },
      resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
      },
    },

    browsers: ['ChromeHeadless'],
  })
}

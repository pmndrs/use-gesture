import pkg from './package.json'
const babel = require('rollup-plugin-babel')
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')

const extensions = ['.js', '.jsx', '.ts']

const getBabelOptions = ({ useESModules }, targets) => ({
  babelrc: false,
  comments: false,
  extensions,
  exclude: '**/node_modules/**',
  runtimeHelpers: true,
  presets: [['@babel/preset-env', { loose: true, modules: false, targets }], '@babel/preset-react', '@babel/preset-typescript'],
  plugins: [
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-proposal-object-rest-spread', { loose: true }],
    ['@babel/plugin-transform-runtime', { regenerator: false, useESModules }],
  ],
})

export default [
  {
    input: `./src/index`,
    output: { file: pkg.module, format: 'esm' },
    external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
    plugins: [babel(getBabelOptions({ useESModules: true }, '>1%, not dead, not ie 11, not op_mini all')), resolve({ extensions })],
  },
  {
    input: `./src/index`,
    output: { file: pkg.main, format: 'cjs' },
    external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
    plugins: [babel(getBabelOptions({ useESModules: false })), commonjs(), resolve({ extensions })],
  },
]

// export default {
//   input: './src/index',
//   output: [{ file: pkg.main, format: 'cjs' }, { file: pkg.module, format: 'es' }],
//   external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
//   plugins: [babel()]
// }

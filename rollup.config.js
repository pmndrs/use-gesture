import pkg from './package.json'
import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'

const extensions = ['.js', '.jsx', '.ts']

const root = process.platform === 'win32' ? path.resolve('/') : '/'
const external = id => !id.startsWith('.') && !id.startsWith(root)

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
    output: { file: `dist/${pkg.module}`, format: 'esm' },
    external,
    plugins: [babel(getBabelOptions({ useESModules: true }, '>1%, not dead, not ie 11, not op_mini all')), resolve({ extensions })],
  },
  {
    input: `./src/index`,
    output: { file: `dist/${pkg.main}`, format: 'cjs' },
    external,
    plugins: [babel(getBabelOptions({ useESModules: false })), resolve({ extensions })],
  },
]

import babel from 'rollup-plugin-babel'
import pkg from './package.json'

export default {
  input: 'index.js',
  output: [{ file: pkg.main, format: 'cjs' }, { file: pkg.module, format: 'es' }],
  external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
  plugins: [babel()]
}

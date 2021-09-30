import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  entry: 'index.js',
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      bowser: true
    }),
    commonjs()
  ],
  targets: [
    {
      format: 'umd',
      moduleName: 'MMDParser',
      dest: 'build/mmdparser.js'
    },
    {
      format: 'es',
      dest: 'build/mmdparser.module.js'
    }
  ]
};

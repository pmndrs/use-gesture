require('@babel/register')({
  ignore: [],
  presets: [['@babel/preset-env', { modules: 'commonjs' }], '@babel/preset-typescript'],
  extensions: ['.js', '.jsx', '.ts', '.tsx'],
})
const React = require('react')
const ReactDOMServer = require('react-dom/server')
const useMeasure = require('./src/web/index.ts')
const expect = require('expect')

function Test() {
  const [ref] = useMeasure()

  return React.createElement(
    'div',
    {
      ref,
    },
    'hello world'
  )
}

const html = ReactDOMServer.renderToString(React.createElement(Test))

expect(html).toEqual('<div data-reactroot="">hello world</div>')

console.log('\n SSR TEST: SUCCESS\n')

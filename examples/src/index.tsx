import React from 'react'
import { render } from 'react-dom'
import * as Examples from './examples'
import { sentenceCase } from 'change-case'
import { Router, Link, RouteComponentProps } from '@reach/router'

import './styles.css'

function List(_props: RouteComponentProps) {
  return (
    <div className="list">
      <h1>React Use Gesture Examples</h1>
      <ul>
        {Object.keys(Examples).map(k => (
          <li key={k}>
            <Link to={k}>{sentenceCase(k)}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Page(props: RouteComponentProps) {
  //@ts-ignore
  const Component = Examples[props.path]
  return (
    <>
      <Link className="back-btn" to="/">
        ← Back to List of Examples
      </Link>
      <Component />
    </>
  )
}

function App() {
  return (
    <Router>
      <List path="/" />
      {Object.keys(Examples).map(k => {
        return <Page key={k} path={k} />
      })}
    </Router>
  )
}

render(<App />, document.getElementById('root'))

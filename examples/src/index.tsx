import React, { useEffect } from 'react'
import { render } from 'react-dom'
import * as Examples from './examples'
// @ts-ignore
import * as Issues from './_issues'
import { sentenceCase } from 'change-case'
import { Router, Link, RouteComponentProps, navigate } from '@reach/router'

import styles from './styles.css'

function List(_props: RouteComponentProps) {
  return (
    <div className={styles.container}>
      <h1>React Use Gesture Examples</h1>
      <ul>
        {Object.keys(Examples).map(k => (
          <li key={k}>
            <Link to={k}>{sentenceCase(k)}</Link>
          </li>
        ))}
      </ul>
      <h3>Issues</h3>
      <ul>
        {Object.keys(Issues).map(k => {
          let Github = null
          const match = k.match(/(\d+)$/)
          if (match)
            Github = (
              <a
                target="_blank"
                href={`https://github.com/react-spring/react-use-gesture/issues/${match[1]}`}
                rel="noopener noreferrer"
              >
                View on Github
              </a>
            )

          return (
            <li key={k}>
              <Link to={`issues/${k}`}>{sentenceCase(k)}</Link>
              {Github}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

interface ExampleProps extends RouteComponentProps {
  id?: string
}

function Page({ path, id }: ExampleProps) {
  const isIssue = path!.indexOf('issues') === 0
  //@ts-ignore
  const Component = isIssue ? Issues[id] : Examples[id]

  useEffect(() => {
    if (!Component) navigate('404', { replace: true })
  }, [Component])

  if (!Component) return null
  return (
    <>
      <Link className={styles.backBtn} to="/">
        ← Back to List of Examples
      </Link>
      <Component />
    </>
  )
}

const NotFound = (_props: RouteComponentProps) => (
  <div className={styles.container}>
    <h1>404 Not Found</h1>
    <p>Sorry there's nothing here.</p>
    <Link to="/">← Back to List of Examples</Link>
  </div>
)

function App() {
  return (
    <Router>
      <NotFound path="404" />
      <List path="/" />
      <Issues path="issues" />
      <Page path="issues/:id" />
      <Page path="/:id" />
    </Router>
  )
}

render(<App />, document.getElementById('root'))

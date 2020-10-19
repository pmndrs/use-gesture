<<<<<<< HEAD
import React from 'react'
import { render } from 'react-dom'
import * as Examples from './examples'
import { sentenceCase } from 'change-case'
import { Router, Link, RouteComponentProps } from '@reach/router'
=======
import React, { useEffect } from 'react'
import { render } from 'react-dom'
import * as Examples from './examples'
// @ts-ignore
import * as Issues from './_issues'
import { sentenceCase } from 'change-case'
import { Router, Link, RouteComponentProps, navigate } from '@reach/router'
>>>>>>> pr/164

import styles from './styles.css'

function List(_props: RouteComponentProps) {
  return (
<<<<<<< HEAD
    <div className={styles.list}>
=======
    <div className={styles.container}>
>>>>>>> pr/164
      <h1>React Use Gesture Examples</h1>
      <ul>
        {Object.keys(Examples).map(k => (
          <li key={k}>
            <Link to={k}>{sentenceCase(k)}</Link>
          </li>
        ))}
      </ul>
<<<<<<< HEAD
=======
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
>>>>>>> pr/164
    </div>
  )
}

<<<<<<< HEAD
function Page(props: RouteComponentProps) {
  //@ts-ignore
  const Component = Examples[props.path]
=======
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
>>>>>>> pr/164
  return (
    <>
      <Link className={styles.backBtn} to="/">
        ← Back to List of Examples
      </Link>
      <Component />
    </>
  )
}

<<<<<<< HEAD
function App() {
  return (
    <Router>
      <List path="/" />
      {Object.keys(Examples).map(k => {
        return <Page key={k} path={k} />
      })}
=======
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
      <Page path="issues/:id" />
      <Page path="/:id" />
>>>>>>> pr/164
    </Router>
  )
}

render(<App />, document.getElementById('root'))

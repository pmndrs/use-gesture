import React from 'react'
import { Link, Route } from 'wouter'

import styles from './styles.module.css'

import Drag from './sandboxes/gesture-drag/src/App'
import Target from './sandboxes/gesture-target/src/App'
import Vanilla from './sandboxes/gesture-vanilla/src/App'
import Pinch from './sandboxes/gesture-pinch/src/App'
import Three from './sandboxes/gesture-three/src/App'
import Slide from './sandboxes/slide/src/App'
import DraggableList from './sandboxes/draggable-list/src/App'
import CardsStack from './sandboxes/cards-stack/src/App'
import Viewpager from './sandboxes/viewpager/src/App'

const links = {
  'gesture-drag': Drag,
  'gesture-target': Target,
  'gesture-vanilla': Vanilla,
  'gesture-pinch': Pinch,
  'gesture-three': Three,
  slide: Slide,
  'draggable-list': DraggableList,
  'cards-stack': CardsStack,
  viewpage: Viewpager
}

const Example = ({ link }) => {
  const Component = links[link]

  return (
    <>
      <Link href="/">
        {/*eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a className={styles.back}>← Back</a>
      </Link>
      <Component />
    </>
  )
}

export default function App() {
  return (
    <>
      <Route path="/">
        <div className={styles.page}>
          <h1>Use Gesture demos</h1>
          <h2>Sandboxes</h2>
          <div className={styles.linkList}>
            {Object.keys(links).map((link) => (
              <Link key={link} href={`/${link}`}>
                {/*eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a className={styles.link}>{link}</a>
              </Link>
            ))}
          </div>
        </div>
      </Route>
      <Route path="/:link">{(params) => <Example link={params.link} />}</Route>
    </>
  )
}

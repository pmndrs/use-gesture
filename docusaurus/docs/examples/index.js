import React, { useState } from 'react'
import cn from 'classnames'
import * as Examples from './examples'
import styles from './styles.module.css'

export default function Example({ id, disableOverlay }) {
  const Component = Examples[id]
  const [active, setActive] = useState(false)

  React.useLayoutEffect(() => {
    document.body.classList.toggle('dragged', active)
  }, [active])

  return (
    <>
      {!disableOverlay && (
        <div className={cn(styles.overlay, { [styles.active]: active })} />
      )}
      <div className={cn(styles.example, { [styles[id]]: !!styles[id] })}>
        <Component setActive={setActive} />
      </div>
    </>
  )
}

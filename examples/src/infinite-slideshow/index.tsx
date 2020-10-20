import React from 'react'
import { a } from 'react-spring'
import InfiniteSlider from './Slider'
import items from './items'
import styles from './styles.css'

// TODO Fix this example

export default function InfiniteSlideshow() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <InfiniteSlider items={items} width={700} visible={3}>
          {({ css }: { css: string }, i: number) => (
            <div className={styles.content}>
              <span className={styles.marker}>{String(i).padStart(2, '0')}</span>
              <a.div className={styles.image} style={{ backgroundImage: css }} />
            </div>
          )}
        </InfiniteSlider>
      </div>
    </div>
  )
}

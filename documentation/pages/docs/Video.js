import React from 'react'
import { Link } from 'gatsby'

import * as styles from './video.module.css'

const links = {
  drag: { label: 'drag', link: 'gestures' },
  wheel: { label: 'wheel', link: 'gestures' },
  pinch: { label: 'pinch', link: 'gestures' },
  move: { label: 'move', link: 'gestures' },
  initial: { label: 'initial', link: 'options/#initial' },
  rubberband: { label: 'rubberband', link: 'options/#rubberband' },
  touchaction: { label: 'touch-action', link: 'extras/#touch-action' }
}

const Video = ({ video, id, badges }) => {
  return (
    <div>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={`https://codesandbox.io/s/github/pmndrs/use-gesture/tree/main/demo/src/sandboxes/${id}`}
      >
        <video autoPlay muted playsInline loop width="100%">
          <source src={video} type="video/mp4" />
        </video>
      </a>
      {badges && (
        <div className={styles.badges}>
          {badges.map((b, i) => (
            <Link key={i} to={`/docs/${links[b].link}`} className={styles.badge}>
              {links[b].label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default Video

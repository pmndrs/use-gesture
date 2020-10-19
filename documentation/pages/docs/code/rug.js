import React from 'react'
import { EasterDiv } from './examples'

const handMojis = ['👆', '👇', '👈', '🤘', '🤙', '✊', '🖖', '🖐', '🤞', '👍', '👊']
const randomEmoji = () => handMojis[Math.floor(Math.random() * handMojis.length)]

export default () => {
  return (
    <EasterDiv>
      <span style={{ color: '#ff9800', touchAction: 'none' }}>
        {randomEmoji()} React <strong>UseGesture</strong>
      </span>
    </EasterDiv>
  )
}

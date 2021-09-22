import React from 'react'
import { EasterDiv } from './examples'

const handMojis = ['👆', '👇', '👈', '🤘', '🤙', '✊', '🖖', '🖐', '🤞', '👍', '👊']
const randomEmoji = () => handMojis[Math.floor(Math.random() * handMojis.length)]

export default function Rug({ pkg }) {
  return (
    <EasterDiv>
      <span style={{ color: '#ff9800', touchAction: 'none' }}>
        {randomEmoji()} <strong>@use-gesture</strong>
        {pkg && `/${pkg}`}
      </span>
    </EasterDiv>
  )
}

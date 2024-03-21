import React, { useEffect } from 'react'
import { EasterDiv } from './examples'

const handMojis = ['👆', '👇', '👈', '🤘', '🤙', '✊', '🖖', '🖐', '🤞', '👍', '👊']
const randomEmoji = () => handMojis[Math.floor(Math.random() * handMojis.length)]

export default function Rug({ pkg }) {
  const [emoji, setEmoji] = React.useState(handMojis[0])

  useEffect(() => setEmoji(randomEmoji()), [])

  return (
    <EasterDiv>
      <span style={{ color: '#ff9800', touchAction: 'none' }}>
        {emoji} <strong>@use-gesture</strong>
        {pkg && `/${pkg}`}
      </span>
    </EasterDiv>
  )
}

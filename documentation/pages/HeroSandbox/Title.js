import React from 'react'
import { HeroTitle as HT } from 'smooth-doc/components'
import styled from '@xstyled/styled-components'
import { useMove } from '@use-gesture/react'
import { useSpring, animated } from '@react-spring/web'

const HeroTitle = animated(styled(HT)`
  color: red;
  background: linear-gradient(45deg, #ff9800 0%, #ffeb3b 50%, #ff9800 100%);
  background-size: 200% auto;

  color: #000;
  background-clip: text;
  text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`)

export default function Title({ children }) {
  const [{ x }, api] = useSpring(() => ({ x: 0 }))
  useMove(({ xy: [x, y] }) => api.start({ x: x / window.innerWidth }), {
    target: typeof window === 'object' ? window : null
  })

  return <HeroTitle style={{ backgroundPositionX: x.to([0, 1], ['0%', '200%']) }}>{children}</HeroTitle>
}

import React from 'react'
import { State } from 'mdx-observable'

export const wrapRootElement = ({ element }) => {
  return <State initialState={{ activeTabIndex: 0 }}>{element}</State>
}

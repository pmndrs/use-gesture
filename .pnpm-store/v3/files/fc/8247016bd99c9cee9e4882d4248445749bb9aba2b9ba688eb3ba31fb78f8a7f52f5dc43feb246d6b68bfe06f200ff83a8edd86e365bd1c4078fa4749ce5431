import React from 'react'
import { getColorModeInitScriptElement } from '@xstyled/styled-components'
import { RootWrapper } from './src/components/RootWrapper'
import { PageWrapper } from './src/components/PageWrapper'

export const wrapPageElement = ({ element, props }) => {
  return (
    <RootWrapper>
      <PageWrapper props={props}>{element}</PageWrapper>
    </RootWrapper>
  )
}

export const onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents([getColorModeInitScriptElement()])
}

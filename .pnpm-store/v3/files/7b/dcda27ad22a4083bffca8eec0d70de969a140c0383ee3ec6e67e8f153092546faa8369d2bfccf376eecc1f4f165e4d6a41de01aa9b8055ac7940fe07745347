import React from 'react'
import { ColorModeProvider, Preflight } from '@xstyled/styled-components'
import { MDXProvider } from './MDX'
import { GlobalStyle, ThemeProvider } from './Theme'

export function RootWrapper({ children }) {
  return (
    <ThemeProvider>
      <ColorModeProvider>
        <Preflight />
        <GlobalStyle />
        <MDXProvider>{children}</MDXProvider>
      </ColorModeProvider>
    </ThemeProvider>
  )
}

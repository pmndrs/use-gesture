import React from 'react'
import {
  createGlobalStyle,
  ThemeProvider as SCThemeProvider,
  th,
} from '@xstyled/styled-components'
import { theme } from '../theme'

export const GlobalStyle = createGlobalStyle`
  ${th('global')}
`

export function ThemeProvider({ children }) {
  return <SCThemeProvider theme={theme}>{children}</SCThemeProvider>
}

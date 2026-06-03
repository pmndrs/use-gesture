import { theme as baseTheme } from 'smooth-doc/src/theme'
import NightOwlTheme from 'prism-react-renderer/themes/nightOwl'
import './styles.css'

export const theme = {
  ...baseTheme,
  'prism-theme': NightOwlTheme,
  colors: {
    ...baseTheme.colors,
    'editor-background': 'rgb(1, 22, 39)',
    modes: {
      ...baseTheme.colors.modes,
      dark: {
        ...baseTheme.colors.modes.dark,
        'editor-background': 'rgb(1, 22, 39)'
      }
    }
  }
}

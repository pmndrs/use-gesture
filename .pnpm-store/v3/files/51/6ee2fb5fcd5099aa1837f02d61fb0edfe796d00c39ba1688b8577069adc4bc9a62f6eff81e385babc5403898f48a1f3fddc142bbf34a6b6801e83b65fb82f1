import { createCss } from '@stitches/react'
// import prefixes from '@stitches/react/utils/prefixes'

export const getDefaultTheme = () => ({
  colors: {
    elevation1: '#292d39', // bg color of the root panel (main title bar)
    elevation2: '#181c20', // bg color of the rows (main panel color)
    elevation3: '#373c4b', // bg color of the inputs
    accent1: '#0066dc',
    accent2: '#007bff',
    accent3: '#3c93ff',
    highlight1: '#535760',
    highlight2: '#8c92a4',
    highlight3: '#fefefe',
    vivid1: '#ffcc00',
    folderWidgetColor: '$highlight2',
    folderTextColor: '$highlight3',
    toolTipBackground: '$highlight3',
    toolTipText: '$elevation2',
  },
  radii: {
    xs: '2px',
    sm: '3px',
    lg: '10px',
  },
  space: {
    xs: '3px',
    sm: '6px',
    md: '10px',
    rowGap: '7px',
    colGap: '7px',
  },
  fonts: {
    mono: `ui-monospace, SFMono-Regular, Menlo, 'Roboto Mono', monospace`,
    sans: `system-ui, sans-serif`,
  },
  fontSizes: {
    root: '11px',
    toolTip: '$root',
  },
  sizes: {
    rootWidth: '280px',
    controlWidth: '160px',
    numberInputMinWidth: '38px',
    scrubberWidth: '8px',
    scrubberHeight: '16px',
    rowHeight: '24px',
    folderTitleHeight: '20px',
    checkboxSize: '16px',
    joystickWidth: '100px',
    joystickHeight: '100px',
    colorPickerWidth: '$controlWidth',
    colorPickerHeight: '100px',
    imagePreviewWidth: '$controlWidth',
    imagePreviewHeight: '100px',
    monitorHeight: '60px',
    titleBarHeight: '39px',
  },
  shadows: {
    level1: '0 0 9px 0 #00000088',
    level2: '0 4px 14px #00000033',
  },
  borderWidths: {
    root: '0px',
    input: '1px',
    focus: '1px',
    hover: '1px',
    active: '1px',
    folder: '1px',
  },
  fontWeights: {
    label: 'normal',
    folder: 'normal',
    button: 'normal',
  },
})

export type FullTheme = ReturnType<typeof getDefaultTheme>
export type LevaCustomTheme = Partial<{ [k in keyof FullTheme]: Partial<FullTheme[k]> }>

type Options = { key: string; borderColor: string; backgroundColor?: string; inset?: boolean }

function createStateClass(value: string, options: Options) {
  const [borderColor, bgColor] = value.split(' ')
  const css: any = {}
  if (borderColor !== 'none') {
    css.boxShadow = `${options.inset ? 'inset ' : ''}0 0 0 $borderWidths${[options.key]} $colors${
      (borderColor !== 'default' && borderColor) || options.borderColor
    }`
  }

  if (bgColor) {
    css.backgroundColor = bgColor
  }

  return css
}

const utils = {
  $inputStyle: () => (value: string) =>
    createStateClass(value, { key: '$input', borderColor: '$highlight1', inset: true }),
  $focusStyle: () => (value: string) => createStateClass(value, { key: '$focus', borderColor: '$accent2' }),
  $hoverStyle: () => (value: string) =>
    createStateClass(value, { key: '$hover', borderColor: '$accent1', inset: true }),
  $activeStyle: () => (value: string) =>
    createStateClass(value, { key: '$active', borderColor: '$accent1', inset: true }),
}

export const {
  styled,
  css,
  theme,
  global: _global,
  keyframes,
} = createCss({
  prefix: 'leva',
  theme: getDefaultTheme(),
  utils: {
    // ...prefixes,
    ...utils,
    $flex: () => () => ({
      display: 'flex',
      alignItems: 'center',
    }),
    $flexCenter: () => () => ({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }),
    $reset: () => () => ({
      outline: 'none',
      fontSize: 'inherit',
      fontWeight: 'inherit',
      color: 'inherit',
      fontFamily: 'inherit',
      border: 'none',
      backgroundColor: 'transparent',
      appearance: 'none',
    }),
    $draggable: () => () => ({
      touchAction: 'none',
      WebkitUserDrag: 'none',
      userSelect: 'none',
    }),
    $focus: () => (value: string) => ({ '&:focus': utils.$focusStyle()(value) }),
    $focusWithin: () => (value: string) => ({ '&:focus-within': utils.$focusStyle()(value) }),
    $hover: () => (value: string) => ({ '&:hover': utils.$hoverStyle()(value) }),
    $active: () => (value: string) => ({ '&:active': utils.$activeStyle()(value) }),
  },
})

const globalStyles = _global({
  '.panel__dragged': {
    WebkitUserDrag: 'none',
    userSelect: 'none',
    input: { userSelect: 'none' },
    '*': { cursor: 'ew-resize !important' },
  },
})

globalStyles()

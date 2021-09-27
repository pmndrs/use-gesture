import { styled } from '../../styles'

export const ColorPreview = styled('div', {
  position: 'relative',
  boxSizing: 'border-box',
  borderRadius: '$sm',
  overflow: 'hidden',
  cursor: 'pointer',
  height: '$rowHeight',
  width: '$rowHeight',
  backgroundColor: '#fff',
  backgroundImage: `url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill-opacity=".05"><path d="M8 0h8v8H8zM0 8h8v8H0z"/></svg>')`,
  $inputStyle: '',
  $hover: '',
  zIndex: 1,
  variants: {
    active: { true: { $inputStyle: '$accent1' } },
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'currentColor',
    zIndex: 1,
  },
})

export const PickerContainer = styled('div', {
  position: 'relative',
  display: 'grid',
  gridTemplateColumns: '$sizes$rowHeight auto',
  columnGap: '$colGap',
  alignItems: 'center',
})

export const PickerWrapper = styled('div', {
  width: '$colorPickerWidth',
  height: '$colorPickerHeight',

  '.react-colorful': {
    width: '100%',
    height: '100%',
    boxShadow: '$level2',
    cursor: 'crosshair',
  },

  '.react-colorful__saturation': {
    borderRadius: '$sm $sm 0 0',
  },

  '.react-colorful__alpha, .react-colorful__hue': {
    height: 10,
  },

  '.react-colorful__last-control': {
    borderRadius: '0 0 $sm $sm',
  },

  '.react-colorful__pointer': {
    height: 12,
    width: 12,
  },
})

import { styled } from '../../styles'

export const SelectContainer = styled('div', {
  $flexCenter: '',
  position: 'relative',
  '> svg': {
    pointerEvents: 'none',
    position: 'absolute',
    right: '$md',
  },
})

export const NativeSelect = styled('select', {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  opacity: 0,
})

export const PresentationalSelect = styled('div', {
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  height: '$rowHeight',
  backgroundColor: '$elevation3',
  borderRadius: '$sm',
  padding: '0 $sm',
  cursor: 'pointer',
  [`${NativeSelect}:focus + &`]: {
    $focusStyle: '',
  },
  [`${NativeSelect}:hover + &`]: {
    $hoverStyle: '',
  },
})

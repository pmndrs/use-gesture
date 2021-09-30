import { styled } from '../../styles'

export const StyledInput = styled('input', {
  /* input reset */
  $reset: '',
  padding: '0 $sm',
  width: 0,
  minWidth: 0,
  flex: 1,
  height: '100%',
  variants: {
    levaType: { number: { textAlign: 'right' } },
  },
})

export const InnerLabel = styled('div', {
  $draggable: '',
  height: '100%',
  $flexCenter: '',
  position: 'relative',
  padding: '0 $xs',
  fontSize: '0.8em',
  opacity: 0.8,
  cursor: 'default',
  [`& + ${StyledInput}`]: { paddingLeft: 0 },
})

export const InnerNumberLabel = styled(InnerLabel, {
  cursor: 'ew-resize',
  marginRight: '-$xs',
  textTransform: 'uppercase',
  opacity: 0.3,
  '&:hover': { opacity: 1 },
  variants: {
    dragging: { true: { backgroundColor: '$accent2', opacity: 1 } },
  },
})

export const InputContainer = styled('div', {
  $flex: '',
  position: 'relative',
  borderRadius: '$sm',
  overflow: 'hidden',
  color: 'inherit',
  height: '$rowHeight',
  backgroundColor: '$elevation3',
  $inputStyle: '$elevation1',
  $hover: '',
  $focusWithin: '',
})

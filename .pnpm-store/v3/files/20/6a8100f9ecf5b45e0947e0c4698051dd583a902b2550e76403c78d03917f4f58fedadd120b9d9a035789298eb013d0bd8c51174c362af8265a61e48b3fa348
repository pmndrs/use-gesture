import { styled } from '../../styles'

export const StyledInputWrapper = styled('div', {
  position: 'relative',
  $flex: '',
  height: '$rowHeight',

  input: {
    $reset: '',
    height: 0,
    width: 0,
    opacity: 0,
    margin: 0,
  },

  label: {
    position: 'relative',
    $flexCenter: '',
    userSelect: 'none',
    cursor: 'pointer',
    height: '$checkboxSize',
    width: '$checkboxSize',
    backgroundColor: '$elevation3',
    borderRadius: '$sm',
    $hover: '',
  },

  'input:focus + label': { $focusStyle: '' },

  'input:focus:checked + label, input:checked + label:hover': {
    $hoverStyle: '$accent3',
  },

  'input + label:active': {
    backgroundColor: '$accent1',
  },

  'input:checked + label:active': {
    backgroundColor: '$accent1',
  },

  'label > svg': {
    display: 'none',
    width: '90%',
    height: '90%',
    stroke: '$highlight3',
  },

  'input:checked + label': {
    backgroundColor: '$accent2',
  },

  'input:checked + label > svg': {
    display: 'block',
  },
})

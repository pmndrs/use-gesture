import { Arrow } from '@radix-ui/react-tooltip'
import { styled } from '../../styles'
import { StyledContent } from '../Folder/StyledFolder'

export const StyledRow = styled('div', {
  position: 'relative',
  zIndex: 100,
  display: 'grid',
  rowGap: '$rowGap',
  gridTemplateRows: 'minmax($sizes$rowHeight, max-content)',
  alignItems: 'center',
  color: '$highlight2',

  [`${StyledContent} > &`]: {
    '&:first-of-type': { marginTop: '$rowGap' },
    '&:last-of-type': { marginBottom: '$rowGap' },
  },

  '&:hover,&:focus-within': {
    color: '$highlight3',
  },
})

export const StyledInputRow = styled(StyledRow, {
  gridTemplateColumns: 'auto $sizes$controlWidth',
  columnGap: '$colGap',
})

export const CopyLabelContainer = styled('div', {
  $flex: '',
  height: '100%',
  position: 'relative',
  overflow: 'hidden',

  '& > div': {
    marginLeft: '$colGap',
    padding: '0 $xs',
    opacity: 0.4,
  },
  '& > div:hover': {
    opacity: 0.8,
  },

  '& > div > svg': {
    display: 'none',
    cursor: 'pointer',
    width: 13,
    minWidth: 13,
    height: 13,
    backgroundColor: '$elevation2',
  },
  '&:hover > div > svg': { display: 'block' },

  variants: {
    align: {
      top: {
        height: '100%',
        alignItems: 'flex-start',
        paddingTop: '$sm',
      },
    },
  },
})

export const StyledOptionalToggle = styled('input', {
  $reset: '',
  height: 0,
  width: 0,
  opacity: 0,
  margin: 0,

  '& + label': {
    position: 'relative',
    $flexCenter: '',
    height: '100%',
    userSelect: 'none',
    cursor: 'pointer',
    paddingLeft: 2,
    paddingRight: '$sm',
    pointerEvents: 'auto',
  },

  '& + label:after': {
    content: '""',
    width: 6,
    height: 6,
    backgroundColor: '$elevation3',
    borderRadius: '50%',
    $activeStyle: '',
  },

  '&:focus + label:after': { $focusStyle: '' },

  '& + label:active:after': {
    backgroundColor: '$accent1',
    $focusStyle: '',
  },

  '&:checked + label:after': {
    backgroundColor: '$accent1',
  },
})

export const StyledInputWrapper = styled('div', {
  opacity: 1,
  variants: {
    disabled: {
      true: { opacity: 0.6, pointerEvents: 'none' },
    },
  },
})

export const StyledLabel = styled('label', {
  fontWeight: '$label',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  '& > svg': {
    display: 'block', // fixes svg vertical misalignment
  },
})

export const Overlay = styled('div', {
  position: 'fixed',
  top: 0,
  bottom: 0,
  right: 0,
  left: 0,
  zIndex: 1000,
  userSelect: 'none',
})

export const StyledToolTipContent = styled('div', {
  background: '$toolTipBackground',
  fontFamily: '$sans',
  fontSize: '$toolTip',
  padding: '$xs $sm',
  color: '$toolTipText',
  borderRadius: '$xs',
  boxShadow: '$level2',
  maxWidth: 260,
})

export const ToolTipArrow = styled(Arrow, {
  fill: '$toolTipBackground',
})

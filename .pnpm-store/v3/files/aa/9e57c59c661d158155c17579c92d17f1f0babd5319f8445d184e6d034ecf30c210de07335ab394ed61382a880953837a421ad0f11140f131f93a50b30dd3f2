import { styled } from '../../styles'
import { StyledInputRow } from '../UI/StyledUI'

export const StyledRoot = styled('div', {
  /* position */
  position: 'relative',
  fontFamily: '$mono',
  fontSize: '$root',
  color: '$rootText',
  backgroundColor: '$elevation1',
  variants: {
    fill: {
      false: {
        position: 'fixed',
        top: '10px',
        right: '10px',
        zIndex: 1000,
        width: '$rootWidth',
      },
      true: {
        position: 'relative',
        width: '100%',
      },
    },
    flat: {
      false: {
        borderRadius: '$lg',
        boxShadow: '$level1',
      },
    },
    oneLineLabels: {
      true: {
        [`${StyledInputRow}`]: {
          gridTemplateColumns: 'auto',
          gridAutoColumns: 'minmax(max-content, 1fr)',
          gridAutoRows: 'minmax($sizes$rowHeight), auto)',
          rowGap: 0,
          columnGap: 0,
          marginTop: '$rowGap',
        },
      },
    },
    hideTitleBar: {
      true: { $$titleBarHeight: '0px' },
      false: { $$titleBarHeight: '$sizes$titleBarHeight' },
    },
  },

  '&,*,*:after,*:before': {
    boxSizing: 'border-box',
  },

  '*::selection': {
    backgroundColor: '$accent2',
  },
})

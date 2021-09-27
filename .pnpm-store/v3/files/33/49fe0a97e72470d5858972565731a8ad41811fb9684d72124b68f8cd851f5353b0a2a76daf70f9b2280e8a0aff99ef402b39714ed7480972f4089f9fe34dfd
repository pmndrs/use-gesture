import { styled } from '../../styles'

export const StyledFolder = styled('div', {})

export const StyledWrapper = styled('div', {
  position: 'relative',
  background: '$elevation2',
  transition: 'height 300ms ease',
  variants: {
    fill: { true: {}, false: {} },
    flat: { false: {}, true: {} },
    isRoot: {
      true: {},
      false: {
        paddingLeft: '$md',
        '&::after': {
          content: '""',
          position: 'absolute',
          left: 0,
          top: 0,
          width: '$borderWidths$folder',
          height: '100%',
          backgroundColor: '$folderWidgetColor',
          opacity: 0.4,
          transform: 'translateX(-50%)',
        },
      },
    },
  },
  compoundVariants: [
    {
      isRoot: true,
      fill: false,
      css: {
        overflowY: 'auto',
        // 20px accounts for top margin
        maxHeight: 'calc(100vh - 20px - $$titleBarHeight)',
      },
    },
    {
      isRoot: true,
      flat: false,
      css: { borderRadius: '$lg' },
    },
  ],
})

export const StyledTitle = styled('div', {
  $flex: '',
  color: '$folderTextColor',
  userSelect: 'none',
  cursor: 'pointer',
  height: '$folderTitleHeight',
  fontWeight: '$folder',

  '> svg': {
    marginLeft: -4,
    marginRight: 4,
    cursor: 'pointer',
    fill: '$folderWidgetColor',
    opacity: 0.6,
  },
  '&:hover > svg': {
    fill: '$folderWidgetColor',
  },
  [`&:hover + ${StyledWrapper}::after`]: {
    opacity: 0.6,
  },
  [`${StyledFolder}:hover > & + ${StyledWrapper}::after`]: {
    opacity: 0.6,
  },
  [`${StyledFolder}:hover > & > svg`]: {
    opacity: 1,
  },
})

export const StyledContent = styled('div', {
  position: 'relative',
  display: 'grid',
  gridTemplateColumns: '100%',
  rowGap: '$rowGap',
  transition: 'opacity 250ms ease',
  variants: {
    toggled: {
      true: {
        opacity: 1,
        transitionDelay: '250ms',
      },
      false: {
        opacity: 0,
        transitionDelay: '0ms',
        pointerEvents: 'none',
      },
    },
    isRoot: {
      true: {
        '& > div': {
          paddingLeft: '$md',
          paddingRight: '$md',
        },
        '& > div:first-of-type': {
          paddingTop: '$sm',
        },
        '& > div:last-of-type': {
          paddingBottom: '$sm', // adds an extra padding at the very bottom of the root folder
        },
        [`> ${StyledFolder}:not(:first-of-type)`]: {
          paddingTop: '$sm',
          marginTop: '$md',
          borderTop: '$borderWidths$folder solid $colors$elevation1',
        },
      },
    },
  },
})

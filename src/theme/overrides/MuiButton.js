import palette from '../palette'

export default {
  root: {
    borderRadius: 4,
    fontSize: 15,
  },
  outlinedPrimary: {
    color: palette.secondary.contrastText,
    border: '1px solid #d9dadb',
    '&:hover': {
      border: '1px solid #b34e40',
      backgroundColor: '#ffffff',
    },
  },
  containedPrimary: {
    backgroundColor: palette.secondary.contrastText,
    color: '#FFFFFF',
    '&:hover': {
      color: '#212121',
      backgroundColor: '#EDEDED',
    },
  },
  containedSecondary: {
    backgroundColor: '#ead4c9',
    color: '#251c16',
    '&:hover': {
      color: '#ffffff',
      backgroundColor: '#b34e40',
    },
  },
}

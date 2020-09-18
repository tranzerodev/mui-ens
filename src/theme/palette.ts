import * as colors from '@material-ui/core/colors'
import { Palette } from '@material-ui/core/styles/createPalette'

const white = '#FFFFFF'
const black = '#000000'

export interface AdditionalPaletteOptions {
  link: string
  icon: string
  border: {
    main: string
    secondary: string
  }
  custom: {
    [key: string]: string
  }
}

const palette: Partial<Palette> = {
  primary: {
    contrastText: white,
    dark: '#b34e40',
    main: '#0062ff',
    light: '#d16b3b',
  },
  secondary: {
    contrastText: '#2962ff',
    dark: '#b0b0b0',
    main: '#e3f2fd',
    light: '#d8d8d8',
  },
  success: {
    contrastText: white,
    dark: '#388e3c',
    main: '#3dc47e',
    light: '#4caf50',
  },
  error: {
    contrastText: white,
    dark: colors.red[900],
    main: colors.red[600],
    light: colors.red[400],
  },
  text: {
    primary: '#263238',
    secondary: '#3f3935',
    tertiary: '#262d33',
    disabled: '#939393',
    contrast: '#fbf6eb',
    light: '#546e7a',
    hint: '#939699',
    description: '#999291',
  },
  background: {
    default: '#f4f6f8',
    primary: '#f4f6f8',
    secondary: '#f4ead9',
    tertiary: '#fafafa',
    paper: white,
    dark: '#251f1b',
  },
  border: {
    main: '#cfd8dc',
    secondary: '#f0f0f0',
  },
  icon: '#2962ff',
  link: '#304ffe',
  divider: '#f4f3f3',
  custom: {
    skyBlue: '#2196f3',
    paleTeal: '#607d8b',
    brightRed: '#f44336',
    mirage: '#171725',
    manatee: '#92929D',
    midGray: '#696974',
    iron: '#d9dadb',
    dodgerBlue: '#4592FF',
    tundora: '#454545',
  },
}

export default palette

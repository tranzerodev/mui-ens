import { TypographyOptions } from '@material-ui/core/styles/createTypography'
import palette from './palette'

export const headerFontFamily = 'Rubik'
export const bodyFontFamily = 'Roboto'

const typography: TypographyOptions = {
  h1: {
    fontFamily: headerFontFamily,
    fontSize: 36,
    fontWeight: 600,
    color: palette.primary.contrastText,
  },
  h2: {
    fontFamily: headerFontFamily,
  },
  h3: {
    fontFamily: headerFontFamily,
  },
  h4: {
    fontFamily: headerFontFamily,
    fontWeight: 500,
    fontSize: 18,
    lineHeight: 1.2,
  },
  h5: {
    fontFamily: headerFontFamily,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 1.4,
  },
  h6: {
    fontFamily: headerFontFamily,
    fontWeight: 500,
    color: palette.link,
    fontSize: 12,
    lineHeight: 1.3,
  },
  subtitle1: {
    fontFamily: headerFontFamily,
  },
  subtitle2: {
    fontFamily: headerFontFamily,
  },
  overline: {
    letterSpacing: 2,
  },
  body1: {
    fontFamily: bodyFontFamily,
    fontSize: 14,
    lineHeight: 1.4,
  },
}
export default typography

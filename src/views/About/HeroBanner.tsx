import React from 'react'
import { Theme, Typography, ButtonBase, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Hero from '../../components/Hero'

const useStyles = makeStyles((theme: Theme) => ({
  heroTitle: {
    color: theme.palette.primary.contrastText,
    maxWidth: 620,
  },
}))

const HeroBanner: React.FC = () => {
  const classes = useStyles()

  return (
    <Hero background={{ src: '/home/hero-origin.png' }}>
      <Box display="flex" alignItems="center" justifyContent="center" height={1}>
        <Typography variant="h1" className={classes.heroTitle} align="center">
          About EnglishSmith
        </Typography>
      </Box>
    </Hero>
  )
}

export default HeroBanner

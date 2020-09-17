import React from 'react'
import Link from 'next/link'
import { Theme, Typography, Box, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Hero from '../../components/Hero'

const useStyles = makeStyles((theme: Theme) => ({
  hero: {
    height: 360,
  },
  createButton: {
    backgroundColor: theme.palette.secondary.contrastText,
    color: theme.palette.primary.contrastText,
    textTransform: 'none',
  },
}))

const FooterBanner: React.FC = () => {
  const classes = useStyles()

  return (
    <Hero background={{ src: '/about/footer-banner.png' }} className={classes.hero}>
      <Box display="flex" alignItems="center" justifyContent="center" height={1} flexDirection="column">
        <Box mb={3} maxWidth={408} clone>
          <Typography variant="h1" align="center">
            Accelerating Growth with Tools for Success
          </Typography>
        </Box>
        <Link passHref href="/lesson-planner">
          <Button variant="contained" className={classes.createButton}>
            Create Lesson Plan
          </Button>
        </Link>
      </Box>
    </Hero>
  )
}

export default FooterBanner

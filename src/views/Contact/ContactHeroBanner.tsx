import React from 'react'
import { Theme, Typography, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Hero from '../../components/Hero'

const useStyles = makeStyles((theme: Theme) => ({
  heroTitle: {
    fontWeight: 600,
    color: theme.palette.primary.contrastText,
    maxWidth: 620,
    margin: theme.spacing(2, 0),
  },
}))

const ContactHeroBanner: React.FC = () => {
  const classes = useStyles()

  return (
    <Hero background={{ src: '/others/contact/group-3.png' }}>
      <Box height={1} display="flex" alignItems="center" justifyContent="center">
        <Typography variant="h1" className={classes.heroTitle} align="center">
          Contact Us
        </Typography>
      </Box>
    </Hero>
  )
}

export default ContactHeroBanner

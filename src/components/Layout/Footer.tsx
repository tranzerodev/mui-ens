import React from 'react'
import Link from 'next/link'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Box, Container, Divider, Grid, IconButton, Typography, Theme, useMediaQuery } from '@material-ui/core'
import FacebookIcon from '@material-ui/icons/Facebook'
import InstagramIcon from '@material-ui/icons/Instagram'
import TwitterIcon from '@material-ui/icons/Twitter'
import NavLink from './NavLink'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: 194,
    padding: theme.spacing(3.5, 0, 6),
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.down('sm')]: {
      height: 'auto',
      '& .MuiContainer-root': {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
    },
  },
  disclaimer: {
    fontSize: theme.typography.pxToRem(14),
    color: theme.palette.text.light,
  },
}))

const Footer: React.FC = () => {
  const classes = useStyles()
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const navLinks = [
    { label: 'Lessons', url: '/lessons' },
    { label: 'About Us', url: '/about' },
    { label: 'Contact Us', url: '/contact' },
    { label: 'Terms', url: '/terms' },
    { label: 'Privacy', url: '/privacy' },
  ]

  const renderNavLink = (navLink) => {
    const { url, render, ...rest } = navLink
    return url ? <NavLink {...rest} url={url} key={navLink.url} /> : render
  }

  return (
    <footer className={classes.root}>
      <Container>
        <Grid container>
          {/* Logo */}
          <Box
            display="flex"
            alignItems="center"
            justifyContent={isSmallScreen ? 'center' : 'flex-start'}
            mb={isSmallScreen ? 2 : 0}
            clone
          >
            <Grid item xs={12} md={3}>
              <Link passHref href="/">
                <img height={26} src="/logo.png" alt="englishsmith-logo" />
              </Link>
            </Grid>
          </Box>

          {/* Page Links */}
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection={isSmallScreen ? 'column' : 'row'}
            clone
          >
            <Grid item xs={12} md={6}>
              {navLinks.map((navBarLink) => {
                return (
                  <Box mx={1.875} mb={{ xs: 1, sm: 0 }} key={navBarLink.label}>
                    {renderNavLink(navBarLink)}
                  </Box>
                )
              })}
            </Grid>
          </Box>

          {/* Social Media */}
          <Box display="flex" justifyContent={isSmallScreen ? 'center' : 'flex-end'} alignItems="center" clone>
            <Grid item xs={12} md={3}>
              <IconButton>
                <FacebookIcon />
              </IconButton>
              <IconButton>
                <TwitterIcon />
              </IconButton>
              <IconButton>
                <InstagramIcon />
              </IconButton>
            </Grid>
          </Box>
        </Grid>

        <Box my={isSmallScreen ? 1 : 4}>
          <Divider />
        </Box>

        {/* Disclaimer */}
        <Typography className={classes.disclaimer} variant="subtitle2">
          © 2020 EnglishSmith Singapore Pte Ltd
        </Typography>
      </Container>
    </footer>
  )
}

export default Footer

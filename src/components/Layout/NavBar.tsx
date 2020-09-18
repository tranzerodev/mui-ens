import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import kebabCase from 'lodash/kebabCase'
import MenuIcon from '@material-ui/icons/Menu'
import PersonIcon from '@material-ui/icons/Person'
import { makeStyles } from '@material-ui/core/styles'
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Theme,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import NavLink from './NavLink'
import NavDrawer from './NavDrawer'
import LoginSignupModal from '../LoginSignupModal'
import { useAuth } from '../../auth'
import { routes } from '../../routes'

interface NavBarProps {
  onBackBtnClick?: () => void
}

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.primary.dark,
    position: 'static',
    top: 0,
    padding: theme.spacing(1.5, 0),
  },
  toolBar: {
    minHeight: 'initial',
  },
  root: {
    display: 'flex',
    alignItems: 'flex-start',
    width: '100%',
  },
  mobileNavWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(1),
  },
  navBarContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(2, 0),
  },
  navBarLinksWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& > a': {
      textDecoration: 'none',
    },
    '& > :not(:first-child)': {
      marginLeft: theme.spacing(4),
    },
  },
  iconBarLinksWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    [theme.breakpoints.up('md')]: {
      '& > :not(:first-child)': {
        marginLeft: theme.spacing(1),
      },
    },
  },
  menuWrapper: {
    '& .MuiPaper-root': {
      borderRadius: 4,
    },
  },
  logoWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: '100%',
    objectFit: 'contain',
    [theme.breakpoints.down('sm')]: {
      height: 26,
      padding: theme.spacing(0, 1.5),
    },
  },
  avatarWrapper: {
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  avatar: {
    marginRight: theme.spacing(1),
  },
  avatarName: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  hamburgerButtonWrapper: {
    marginTop: theme.spacing(1.25),
  },
  closeButton: {
    padding: theme.spacing(1.5, 0),
  },
  secondaryHamburgerLink: {
    color: theme.palette.primary.main,
  },
  hiddenSmDown: {
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  hiddenMdUp: {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}))

const LogoutNavLink = ({ label, className, ...rest }) => {
  const { signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <LoginSignupModal
      toggle={() => (
        <Button onClick={handleSignOut}>
          <Typography variant="body2" className={className}>
            {label}
          </Typography>
        </Button>
      )}
      {...rest}
    />
  )
}

const NavBar: React.FC<NavBarProps> = (props) => {
  const router = useRouter()
  const { user, signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen)

  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const classes = useStyles()

  const navLinks = [
    {
      label: 'Home',
      render: (
        <Link href="/" passHref>
          <Box className={classes.logoWrapper}>
            <img className={classes.logo} src="/logo.png" alt="logo" />
          </Box>
        </Link>
      ),
    },
    {
      label: 'English Resources',
      render: (
        <Link href="/resources" passHref>
          <Typography variant="h5" component="a" color="textPrimary">
            English Resources
          </Typography>
        </Link>
      ),
    },
    {
      label: 'Levels & Exams',
      render: (
        <Link href="/exams" passHref>
          <Typography variant="h5" component="a" color="textPrimary">
            Levels & Exams
          </Typography>
        </Link>
      ),
    },
    {
      label: 'Language & Skills',
      render: (
        <Link href="/skills" passHref>
          <Typography variant="h5" component="a" color="textPrimary">
            Language & Skills
          </Typography>
        </Link>
      ),
    },
    {
      label: 'Lesson Planner',
      render: (
        <Link href="/lesson-planner" passHref>
          <Typography variant="h5" component="a" color="textPrimary">
            Lesson Planner
          </Typography>
        </Link>
      ),
    },
    {
      label: 'Text Analysis',
      render: (
        <Link href="/text-analysis" passHref>
          <Typography variant="h5" component="a" color="textPrimary">
            Text Analysis
          </Typography>
        </Link>
      ),
    },
  ]

  const iconLinks = [
    {
      label: 'Log In',
      render: (
        <>
          {user ? (
            <>
              {/* TODO: Display AWS image in the Avatar or create custom component */}
              <Box className={classes.avatarWrapper} onClick={handleOpenMenu}>
                <Avatar className={classes.avatar} alt={user.name} src={user.media[0].src} />
                <Typography className={classes.avatarName} variant="h5">
                  {user.name}
                </Typography>
              </Box>
              <Menu
                id="user-icon-menu"
                className={classes.menuWrapper}
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
                transformOrigin={{
                  vertical: -45,
                  horizontal: 0,
                }}
              >
                <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
              </Menu>
            </>
          ) : (
            <Link href="/login" passHref>
              <Typography variant="h5" component="a" color="textPrimary">
                Log In
              </Typography>
            </Link>
          )}
        </>
      ),
    },
  ]

  const hamburgerNavLinks = [
    {
      label: 'Close',
      render: (
        <IconButton className={classes.closeButton} color="primary" onClick={toggleDrawer} aria-label="close drawer">
          <CloseIcon fontSize="large" />
        </IconButton>
      ),
    },
    {
      label: 'Home',
      render: (
        <div className={classes.hamburgerButtonWrapper}>
          <Link href="/" passHref>
            <Button variant="text">
              <Typography variant="h3">Home</Typography>
            </Button>
          </Link>
        </div>
      ),
    },
    {
      label: 'English Resources',
      render: (
        <Link href="/resources" passHref>
          <Button variant="text">
            <Typography variant="h3">English Resources</Typography>
          </Button>
        </Link>
      ),
    },
    {
      label: 'Levels & Exams',
      render: (
        <Link href="/exams" passHref>
          <Button variant="text">
            <Typography variant="h3">Levels & Exams</Typography>
          </Button>
        </Link>
      ),
    },
    {
      label: 'Language & Skills',
      render: (
        <div className={classes.hamburgerButtonWrapper}>
          <Link href="/skills" passHref>
            <Button variant="text">
              <Typography variant="h3">Language & Skills</Typography>
            </Button>
          </Link>
        </div>
      ),
    },
    {
      label: 'Lesson Planner',
      render: (
        <div className={classes.hamburgerButtonWrapper}>
          <Link href="/planner" passHref>
            <Button variant="text">
              <Typography variant="h3">Lesson Planner</Typography>
            </Button>
          </Link>
        </div>
      ),
    },
    user
      ? {
          label: 'Sign Out',
          render: (
            <div className={classes.hamburgerButtonWrapper}>
              <Button variant="text">
                <LogoutNavLink label="Sign Out" className={classes.secondaryHamburgerLink} />
              </Button>
            </div>
          ),
        }
      : {
          label: 'Log In',
          render: (
            <div className={classes.hamburgerButtonWrapper}>
              <Link href="/login" passHref>
                <Button variant="text">
                  <Typography variant="h4" className={classes.secondaryHamburgerLink}>
                    Log In
                  </Typography>
                </Button>
              </Link>
            </div>
          ),
        },
  ]

  // Filter out My Orders link if user is not logged in
  const nextHamburgerNavLinks = user
    ? hamburgerNavLinks
    : hamburgerNavLinks.filter((link) => link.label !== 'My Orders')

  const renderNavLink = (navLink) => {
    const { url, render, ...rest } = navLink
    return url ? <NavLink {...rest} url={url} key={navLink.url} /> : render
  }
  return (
    <AppBar elevation={0} className={classes.appBar}>
      <Toolbar className={classes.toolBar} disableGutters>
        <Box className={classes.root}>
          {/* Nav Links @ SM and below */}
          <Box className={classes.hiddenMdUp}>
            <Grid container className={classes.mobileNavWrapper}>
              <Grid item xs={3}>
                <IconButton color="primary" onClick={toggleDrawer} aria-label="open drawer" size="medium">
                  <MenuIcon />
                </IconButton>
              </Grid>
              <Grid item xs={6} className={classes.logoWrapper}>
                <Link href="/" passHref>
                  <img className={classes.logo} src="/logo.png" alt="logo" />
                </Link>
              </Grid>
              <Box clone pr={1.5}>
                <Grid item xs={3} className={classes.iconBarLinksWrapper}>
                  {iconLinks.map((navLink, i) => {
                    return <React.Fragment key={kebabCase(navLink.label)}>{renderNavLink(navLink)}</React.Fragment>
                  })}
                </Grid>
              </Box>
            </Grid>
          </Box>

          {/* Nav Links @ MD and above */}
          <Box className={classes.hiddenSmDown}>
            <Container>
              <Box className={classes.navBarContainer}>
                {/* Logo */}
                {/* Page Links */}
                <Box className={classes.navBarLinksWrapper}>
                  {navLinks.map((navLink, i) => {
                    return <React.Fragment key={kebabCase(navLink.label)}>{renderNavLink(navLink)}</React.Fragment>
                  })}
                </Box>
                {/* Icon Buttons */}
                <Box className={classes.iconBarLinksWrapper}>
                  {iconLinks.map((navLink, i) => {
                    return <React.Fragment key={kebabCase(navLink.label)}>{renderNavLink(navLink)}</React.Fragment>
                  })}
                </Box>
              </Box>
            </Container>
          </Box>
        </Box>
        {/* Nav Drawer */}
        <NavDrawer open={isDrawerOpen} onClose={toggleDrawer} links={nextHamburgerNavLinks} />
      </Toolbar>
    </AppBar>
  )
}

export default NavBar

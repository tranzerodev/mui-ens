import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Link as MUILink, Typography, Theme } from '@material-ui/core'
import Link from 'next/link'

interface NavLinkProps {
  label: string
  url: string
}

const useStyles = makeStyles((theme: Theme) => ({
  link: {
    fontSize: theme.typography.pxToRem(14),
    fontWeight: 600,
    letterSpacing: '0.07px',
  },
}))

const NavLink: React.FC<NavLinkProps> = (props) => {
  const { label, url } = props
  const classes = useStyles()

  return (
    <Typography className={classes.link}>
      <Link href={url} passHref>
        <MUILink color="inherit">{label}</MUILink>
      </Link>
    </Typography>
  )
}

export default NavLink

import React from 'react'
import Link from 'next/link'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import { Box, Theme, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: 20,
    padding: theme.spacing(4),
  },
  headerWrapper: {
    textDecoration: 'none',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(2),
    '&:hover': {
      cursor: 'pointer',
    },
  },
}))

interface BoxWithHeaderLinkProps {
  title: string
  link: string
}

const BoxWithHeaderLink: React.FC<BoxWithHeaderLinkProps> = (props) => {
  const { title, link, children } = props
  const classes = useStyles()

  return (
    <Box className={classes.root}>
      <Link href={link} passHref>
        <Box component="a" className={classes.headerWrapper}>
          <Typography variant="h4" color="textPrimary">
            {title}
          </Typography>
          <NavigateNextIcon color="primary" />
        </Box>
      </Link>
      {children}
    </Box>
  )
}

export default BoxWithHeaderLink

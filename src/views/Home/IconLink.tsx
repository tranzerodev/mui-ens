import React from 'react'
import Link from 'next/link'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import { Box, Icon, Theme, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

interface IconLinkStyles {
  variant: 'default' | 'outlined'
  withArrow: boolean
}

export interface IconLinkProps {
  icon: any
  title: string
  link: string
  variant?: 'default' | 'outlined'
  withArrow?: boolean
}

const useStyles = makeStyles<Theme, IconLinkStyles>((theme) => ({
  root: {
    borderRadius: ({ variant }) => (variant === 'outlined' ? 8 : 0),
    border: ({ variant }) => (variant === 'outlined' ? `1px solid ${theme.palette.border.main}` : 'none'),
    padding: ({ variant }) => (variant === 'outlined' ? theme.spacing(1.5) : theme.spacing(1, 0)),
    display: 'flex',
    alignItems: 'center',
    justifyContent: ({ withArrow }) => (withArrow ? 'space-between' : 'initial'),
    textDecoration: 'none',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  contentWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(1),
    backgroundColor: 'rgba(80, 181, 255, 0.1)',
    marginRight: theme.spacing(2),
  },
  icon: {
    color: theme.palette.icon,
  },
}))

const IconLink: React.FC<IconLinkProps> = (props) => {
  const { link, icon, title, variant = 'default', withArrow = false } = props
  const classes = useStyles({ variant, withArrow })

  return (
    <Link passHref href={link}>
      <Box component="a" className={classes.root}>
        <Box className={classes.contentWrapper}>
          <Box className={classes.iconWrapper}>
            <Icon className={classes.icon} component={icon} />
          </Box>
          <Typography variant="h5" color="textPrimary">
            {title}
          </Typography>
        </Box>
        {withArrow && <NavigateNextIcon color="primary" />}
      </Box>
    </Link>
  )
}

export default IconLink

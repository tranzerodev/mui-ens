import React from 'react'
import clsx from 'clsx'
import { Box, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import Block, { BlockProps } from './Block'

const useStyles = makeStyles<Theme, { background?: BlockProps['background'] }>((theme: Theme) => ({
  hero: {
    minHeight: 300,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: ({ background = {} }) => `url(${background.src || ''})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    [theme.breakpoints.down('sm')]: {
      backgroundPosition: 'center center',
      backgroundSize: 'cover',
    },
  },
}))

const Hero: React.FC<BlockProps> = (props) => {
  const { children, className, ...rest } = props
  const classes = useStyles(props)

  return (
    <Block className={clsx(classes.hero, className)} container bgcolor="white" px={0} {...rest}>
      <Box px={{ xs: 0.75, md: 0 }}>{children}</Box>
    </Block>
  )
}

export default Hero

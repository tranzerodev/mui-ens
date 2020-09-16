import React from 'react'
import Link from 'next/link'
import { Box, Theme, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import CheckIcon from '@material-ui/icons/Check'

interface WelcomeCardProps {
  link: string
  contents: string[]
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    borderRadius: 20,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4, 3, 3),
  },
  checkWrapper: {
    display: 'flex',
    marginTop: theme.spacing(2),
  },
  check: {
    width: 12,
    color: theme.palette.success.dark,
    marginRight: theme.spacing(1.5),
  },
  content: {
    maxWidth: 200,
  },
  linkWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(3.5),
  },
  link: {
    textAlign: 'center',
    letterSpacing: '1px',
    textDecoration: 'none',
  },
}))

const WelcomeCard: React.FC<WelcomeCardProps> = (props) => {
  const { link, contents } = props
  const classes = useStyles()

  return (
    <Box className={classes.root}>
      <Typography variant="h4">Welcome to EnglishSmith</Typography>
      {contents.map((content) => (
        <Box className={classes.checkWrapper}>
          <CheckIcon className={classes.check} />
          <Typography className={classes.content} variant="body1">
            {content}
          </Typography>
        </Box>
      ))}
      <Box className={classes.linkWrapper}>
        <Link href={link} passHref>
          <Typography component="a" variant="h6" className={classes.link}>
            Learn More
          </Typography>
        </Link>
      </Box>
    </Box>
  )
}

export default WelcomeCard

import React from 'react'
import Link from 'next/link'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import { Box, Theme, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

interface LessonPlanCard {
  link: string
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    borderRadius: 20,
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(4),
  },
  title: {
    color: theme.palette.primary.contrastText,
    marginBottom: theme.spacing(2),
  },
  subtitle: {
    color: theme.palette.primary.contrastText,
    marginBottom: theme.spacing(3.5),
  },
  image: {
    maxWidth: '100%',
    marginBottom: theme.spacing(2.5),
  },
  linkWrapper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(1.5, 2),
    textDecoration: 'none',
    '&:hover': {
      backgroundColor: theme.palette.common.black,
      '& > *': {
        color: theme.palette.primary.contrastText,
      },
    },
  },
  link: {
    color: theme.palette.link,
  },
}))

const LessonPlanCard: React.FC<LessonPlanCard> = (props) => {
  const { link } = props
  const classes = useStyles()

  return (
    <Box className={classes.root}>
      <Typography variant="h4" className={classes.title}>
        Begin your Lesson Plan
      </Typography>
      <Typography variant="body1" className={classes.subtitle}>
        Enjoy a hassle-free way to that caters to your teaching needs.
      </Typography>
      <img className={classes.image} src="/home/lesson-plan.png" alt="lesson plan" />
      <Link href={link} passHref>
        <Box component="a" className={classes.linkWrapper}>
          <Typography className={classes.link} variant="h6">
            Create Lesson Plan
          </Typography>
          <ArrowForwardIcon color="primary" />
        </Box>
      </Link>
    </Box>
  )
}

export default LessonPlanCard

import React from 'react'
import { Box, Divider, Theme, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import IconLink from './IconLink'

interface Topic {
  icon: any
  title: string
  link: string
}

interface TopicListFilterProps {
  topics: Topic[]
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    borderRadius: 20,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4),
  },
  title: {
    marginBottom: theme.spacing(3),
  },
}))

const TopicListFilter: React.FC<TopicListFilterProps> = (props) => {
  const { topics } = props
  const classes = useStyles()

  return (
    <Box className={classes.root}>
      <Typography className={classes.title} variant="h4">
        All Topics
      </Typography>
      {topics.map((topic) => (
        <>
          <Divider />
          <IconLink title={topic.title} icon={topic.icon} link={topic.link} withArrow />
        </>
      ))}
    </Box>
  )
}

export default TopicListFilter

import React, { useState, useEffect } from 'react'
import RouterLink from 'next/link'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Button } from '@material-ui/core'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import axios from '../../utils/axios'
import ProjectCard from '../../components/ProjectCard'

const useStyles = makeStyles((theme) => ({
  root: {},
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(2),
  },
  title: {
    position: 'relative',
    '&:before': {
      position: 'absolute',
      bottom: -8,
      left: 0,
      content: '" "',
      height: 3,
      width: 48,
      backgroundColor: theme.palette.primary.main,
    },
  },
  arrowIcon: {
    marginLeft: theme.spacing(1),
  },
}))

function Projects({ className, ...rest }) {
  const classes = useStyles()
  const [projects, setProjects] = useState([])

  useEffect(() => {
    let mounted = true

    const fetchProjects = () => {
      axios.get('/api/account/projects').then((response) => {
        if (mounted) {
          setProjects(response.data.projects)
        }
      })
    }

    fetchProjects()

    return () => {
      mounted = false
    }
  }, [])

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <div className={classes.header}>
        <Typography className={classes.title} variant="h5">
          Active Projects
        </Typography>
        <RouterLink href="/profile/user/projects" passHref>
          <Button component="a">
            See all
            <KeyboardArrowRightIcon className={classes.arrowIcon} />
          </Button>
        </RouterLink>
      </div>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  )
}

Projects.propTypes = {
  className: PropTypes.string,
}

export default Projects

import React from 'react'
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles'
import { Grid, Typography, Container, Button } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import Link from 'next/link'
import Layout from '../../components/Layout/Layout'
import HomeFeatures from './HomeFeatures'
import Hero from '../../components/Hero'

const useStyles = makeStyles((theme: Theme) => ({
  hero: {
    minHeight: 433,
  },
  container: {
    marginTop: theme.spacing(6),
    padding: 0,
  },
  description: {
    lineHeight: '25px',
  },
  storyWrapper: {
    padding: theme.spacing(0, 6),
  },
  getStartedButton: {
    backgroundColor: theme.palette.secondary.contrastText,
    color: theme.palette.primary.contrastText,
    textTransform: 'none',
    marginTop: theme.spacing(2.5),
    maxWidth: 135,
  },
}))

const LessonPlannerLanding: React.FC = () => {
  const classes = useStyles()
  const theme = useTheme()

  return (
    <Layout title="LessonPlannerLanding">
      {/* Hero */}
      <Hero
        background={{ src: '/lesson-planner/lesson-planner-landing.png' }}
        container={{ maxWidth: 'md' }}
        className={classes.hero}
      >
        <Box mb={1} color={theme.palette.primary.contrastText} clone>
          <Typography variant="h1">Lesson Planner</Typography>
        </Box>
        <Box color={theme.palette.primary.contrastText} fontSize={theme.typography.pxToRem(16)} maxWidth={438} clone>
          <Typography variant="subtitle1">
            Save time designing and managingyour lessons with our Lesson Organiser. Create lessons on the fly!
          </Typography>
        </Box>
      </Hero>

      {/* Body */}
      <Container maxWidth="md" classes={{ root: classes.container }}>
        <Box display="flex" alignItems="center" flexDirection="column" mt={10} mb={6} px={{ xs: 4, sm: 5, md: 0 }}>
          <Typography variant="h1" color="textPrimary" gutterBottom>
            How it works
          </Typography>
          <Typography variant="subtitle1" className={classes.description} align="center">
            Our mission doesn’t end with the small businesses and entrepreneurs that call us home. We believe in
            empowering our team to create their own life's work. We move fast and we challenge each other, but we look
            after each other and care about our culture, which makes working here extremely rewarding.{' '}
          </Typography>
        </Box>
        <HomeFeatures />
        <Box mb={10} clone>
          <Grid container className={classes.storyWrapper} spacing={8}>
            <Grid item xs={12} sm={6}>
              <img src="/about/story-1.png" alt="story-first" width="100%" />
            </Grid>
            <Grid item xs={12} sm={6} container direction="column" justify="center">
              <Typography variant="h1" color="textPrimary" gutterBottom>
                Get Started
              </Typography>
              <Typography variant="subtitle1" className={classes.description}>
                Save time designing and managingyour lessons with our Lesson Organiser. Create lessons on the fly! Plan
                Lesson Stages, and add corresponding activity withmaterials saved from our Resource portal. A useful
                tool to remember was covered or used and review activities for following lessons.
              </Typography>
              <Link passHref href="3">
                <Button variant="contained" className={classes.getStartedButton}>
                  Get Started
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Layout>
  )
}

export default LessonPlannerLanding

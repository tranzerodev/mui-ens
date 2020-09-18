import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Grid, Typography, Container } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import HeroBanner from './HeroBanner'
import Layout from '../../components/Layout/Layout'
import FooterBanner from './FooterBanner'
import HomeFeatures from './HomeFeatures'

const useStyles = makeStyles((theme: Theme) => ({
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
}))

const About: React.FC = () => {
  const classes = useStyles()

  return (
    <Layout title="About" showFooter={false}>
      <HeroBanner />
      <Container maxWidth="md" classes={{ root: classes.container }}>
        <Grid container className={classes.storyWrapper} spacing={8}>
          <Grid item xs={12} sm={6}>
            <img src="/about/story-1.png" alt="story-first" width="100%" />
          </Grid>
          <Grid item xs={12} sm={6} container direction="column" justify="center">
            <Typography variant="h1" color="textPrimary" gutterBottom>
              Our Story
            </Typography>
            <Typography variant="subtitle1" className={classes.description}>
              As a learner and educator ourselves, one of the many challengesis identifying gaps and giving the right
              feedback to keep engagement and progression. We are passionate aboutlearning and sharing and be able to
              dedicate more time to address gaps.
            </Typography>
          </Grid>
        </Grid>
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
            <Grid item xs={12} sm={6} container direction="column" justify="center">
              <Typography variant="h1" color="textPrimary" gutterBottom>
                Our Story
              </Typography>
              <Typography variant="subtitle1" className={classes.description}>
                However, this can be challenging when youhave a busy schedule and juggling between planning, teaching,
                and marking, just to name a few. EnglishSmith enables better teaching and learning by assisting you with
                intuitive tools such as our resource portal, lesson organiser and writing & reading checker.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <img src="/about/story-2.png" alt="story-second" width="100%" />
            </Grid>
          </Grid>
        </Box>
      </Container>
      <FooterBanner />
    </Layout>
  )
}

export default About

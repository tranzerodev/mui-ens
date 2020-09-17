import React from 'react'
import { Box, Container, Grid, Typography, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import WelcomeCard from './WelcomeCard'
import LessonPlanCard from './LessonPlanCard'
import IconLink from './IconLink'
import TopicListFilter from './TopicListFilter'
import Layout from '../../components/Layout/Layout'
import SearchBar from '../../components/SearchBar'
import LessonCard from '../../components/LessonCard'
import BoxWithHeaderLink from '../../components/BoxWithHeaderLink'
import {
  SEARCH_PLACEHOLDER,
  MOCK_LESSONS,
  ALL_TIME_POPULAR_LESSONS,
  POPULAR_GRAMMAR_LESSONS,
  WELCOME_CONTENT,
  SIDEBAR_ITEMS,
  TOPIC_LIST_ITEMS,
} from './const'
import Hero from '../../components/Hero'

const useStyles = makeStyles((theme: Theme) => ({
  heroTitle: {
    color: theme.palette.primary.contrastText,
    marginBottom: theme.spacing(2),
  },
  contentWrapper: {
    marginTop: theme.spacing(4),
  },
  column: {
    '& > *': {
      marginBottom: theme.spacing(4),
    },
  },
  lastColumn: {
    '& > :first-child': {
      marginBottom: theme.spacing(4),
    },
    '& > :not(:first-child)': {
      marginBottom: theme.spacing(2),
    },
  },
}))

const Home: React.FC = (props) => {
  const classes = useStyles(props)

  return (
    <Layout title="Home" showFooter={false}>
      <Hero background={{ src: '/home/hero-origin.png' }}>
        <Box display="flex" justifyContent="center">
          <Box
            height={1}
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            maxWidth={600}
          >
            <Typography variant="h1" className={classes.heroTitle} align="center">
              The Best English Teaching Resources for Educators
            </Typography>
            <SearchBar placeholder={SEARCH_PLACEHOLDER} />
          </Box>
        </Box>
      </Hero>
      <Container className={classes.contentWrapper}>
        {/* Body */}
        <Grid container spacing={3}>
          {/* Left Column */}
          <Grid className={classes.column} item xs={12} md={3}>
            <WelcomeCard contents={WELCOME_CONTENT} link="/about" />
            <TopicListFilter topics={TOPIC_LIST_ITEMS} />
          </Grid>

          {/* Center Column */}
          <Grid className={classes.column} item xs={12} md={6}>
            {/* All Time Popular Lessons */}
            <BoxWithHeaderLink title={ALL_TIME_POPULAR_LESSONS.title} link={ALL_TIME_POPULAR_LESSONS.link}>
              <Grid spacing={2} container>
                {MOCK_LESSONS.map((lesson) => (
                  <Grid item xs={12} sm={4}>
                    <LessonCard title={lesson.title} image={lesson.image} slug={lesson.slug} />
                  </Grid>
                ))}
              </Grid>
            </BoxWithHeaderLink>

            {/* Grammar Lessons */}
            <BoxWithHeaderLink title={POPULAR_GRAMMAR_LESSONS.title} link={POPULAR_GRAMMAR_LESSONS.link}>
              <Grid spacing={2} container>
                {MOCK_LESSONS.map((lesson) => (
                  <Grid item xs={12} sm={4}>
                    <LessonCard title={lesson.title} image={lesson.image} slug={lesson.slug} />
                  </Grid>
                ))}
              </Grid>
            </BoxWithHeaderLink>
          </Grid>

          {/* Right Column */}
          <Grid className={classes.lastColumn} item xs={12} md={3}>
            {/* Lesson Plan */}
            <LessonPlanCard link="/lesson-planner" />
            {/* Sidebar Items */}
            {SIDEBAR_ITEMS.map((item) => (
              <IconLink variant="outlined" icon={item.icon} title={item.title} link={item.link} />
            ))}
          </Grid>
        </Grid>
      </Container>
    </Layout>
  )
}

export default Home

import React from 'react'
import { Box, Grid, IconButton, Typography, useMediaQuery } from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { useTheme } from '@material-ui/core/styles'
import Layout from '../../components/Layout/Layout'
import LessonPlannerBlock from './LessonPlannerBlock'
import { LESSON_PLANNER_LIST } from './constants'

const LessonPlanner: React.FC = () => {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Layout title="Lesson Planner">
      <Box
        display="flex"
        justifyContent="space-between"
        pt={{ xs: 4, md: 7 }}
        pb={{ xs: 4, md: 7 }}
        pl={{ xs: 4, md: 12 }}
        pr={{ xs: 4, md: 12 }}
        bgcolor={theme.palette.background.paper}
      >
        <Typography variant="h1" color="textPrimary">
          Lesson Planner
        </Typography>
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      </Box>

      {/* Body */}
      <Box pt={8} pb={9.75} pr={{ xs: 4, md: 14 }} pl={{ xs: 4, md: 14 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <LessonPlannerBlock title="Week 1" lessons={LESSON_PLANNER_LIST} />
          </Grid>
          <Grid item xs={12} md={4}>
            <LessonPlannerBlock title="Week 2" lessons={LESSON_PLANNER_LIST} />
          </Grid>
          <Grid item xs={12} md={4}>
            <LessonPlannerBlock title="Week 3" lessons={LESSON_PLANNER_LIST} />
          </Grid>
        </Grid>
      </Box>
    </Layout>
  )
}

export default LessonPlanner

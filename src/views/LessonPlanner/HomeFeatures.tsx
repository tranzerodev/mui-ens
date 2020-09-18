import { Box, CardMedia, Grid, Theme, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import React from 'react'

const features = [
  {
    title: 'Inspire',
    iconPath: '/about/heart.png',
    description: 'Add corresponding activity with materials from our Resource portal',
  },
  {
    title: 'Together',
    iconPath: '/about/feather.png',
    description: 'Add corresponding activity with materials from our Resource portal',
  },
  {
    title: 'Entrepreneurial',
    iconPath: '/about/activity.png',
    description: ' Add corresponding activity with materials from our Resource portal',
  },
]

const useStyles = makeStyles((theme: Theme) => ({
  featureTitle: {
    fontSize: theme.typography.pxToRem(21),
    lineHeight: 1.2,
  },
  featureDescription: {
    fontWeight: 400,
    lineHeight: 1.5,
  },
  rowIcon: {
    height: 50,
    width: 56,
  },
}))

const HomeFeatures = () => {
  const classes = useStyles()

  return (
    <Box mb={10} px={{ xs: 4, sm: 5, md: 0 }} clone>
      <Grid container>
        {features.map((feature) => (
          <Grid item xs={12} sm={4} key={feature.title}>
            <Box width={1} mb={1} display="flex" alignItems="center" justifyContent="center">
              <CardMedia image={feature.iconPath} className={classes.rowIcon} />
            </Box>
            <Typography variant="h4" className={classes.featureTitle} gutterBottom align="center">
              {feature.title}
            </Typography>
            <Box maxWidth={230} m="auto">
              <Typography variant="h5" className={classes.featureDescription} align="center">
                {feature.description}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default HomeFeatures

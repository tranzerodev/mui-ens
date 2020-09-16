import React from 'react'
import { Container, Grid, Typography, Theme, Box } from '@material-ui/core'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Layout from '../../components/Layout/Layout'
import { MOCK_PRODUCT, SIMILAR_LESSONS_LIST } from './const'
import ProductHeader from './ProductHeader'
import ProductOverview from './ProductOverview'
import ProductModules from './ProductModules'
import ProductReviews from './ProductReviews'
import LessonDetailCard from '../../components/LessonDetailCard'

const useStyles = makeStyles((theme: Theme) => ({
  similarLessonsTitle: {
    fontSize: theme.typography.pxToRem(24),
    margin: theme.spacing(4, 0),
    fontWeight: 600,
  },
}))

const ProductDetail: React.FC = (props) => {
  const classes = useStyles(props)

  return (
    <Layout title="Product Detail" showFooter={false}>
      <ProductHeader />
      <Container maxWidth="lg">
        <Grid container spacing={4} justify="flex-end">
          <Grid item md={8}>
            <ProductOverview overview={MOCK_PRODUCT.overview} requirements={MOCK_PRODUCT.requirements} />
          </Grid>
          <Grid item md={4}>
            <ProductModules />
          </Grid>
          <Grid item md={4}>
            <ProductReviews />
          </Grid>
        </Grid>
        <Typography variant="h3" className={classes.similarLessonsTitle}>
          Similar Lessons
        </Typography>
        <Box clone mb={4}>
          <Grid container spacing={4}>
            {SIMILAR_LESSONS_LIST.map((item) => (
              <Grid item md={3}>
                <LessonDetailCard {...item} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Layout>
  )
}

export default ProductDetail

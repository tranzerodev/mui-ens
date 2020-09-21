import React from 'react'
import { Box, Typography, Theme, Button, Paper } from '@material-ui/core'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Rating from '@material-ui/lab/Rating'
import LinearProgress from '@material-ui/core/LinearProgress'
import { RATING_LIST, REVIEWS_PEOPLE_LIST } from './const'
import ReviewCard from '../../components/ReviewCard'
import AddReviewModal from './AddReviewModal'

const useStyles = makeStyles((theme: Theme) => ({
  whiteCornerRadiusWrapper: {
    borderRadius: 10,
    padding: theme.spacing(4),
    height: '100%',
  },
  progress: {
    width: '100%',
    height: 5,
    borderRadius: 3,
    backgroundColor: theme.palette.custom.iron,
    '& > div': {
      backgroundColor: theme.palette.custom.dodgerBlue,
    },
  },
  peopleInfoListWrapper: {
    '& > .MuiBox-root:not(:first-child)': {
      borderTop: `1px solid ${theme.palette.border.main}`,
    },
  },
}))

const ProductReviews: React.FC = (props) => {
  const classes = useStyles(props)

  return (
    <Paper elevation={0} classes={{ root: classes.whiteCornerRadiusWrapper }}>
      <Box display="flex" justifyContent="space-between" mb={0.75}>
        <Box clone fontSize={21} pb={3}>
          <Typography variant="h4">Reviews</Typography>
        </Box>
        <Rating name="read-only" value={4.5} size="small" readOnly precision={0.5} />
      </Box>
      <Box clone fontWeight={400} fontSize={18} mb={2}>
        <Typography variant="h4">Star Rating: 4.8 (40 votes)</Typography>
      </Box>
      <AddReviewModal
        toggle={(show) => (
          <Box mt={3.5} display="flex" justifyContent="center">
            <Button color="primary" variant="contained" fullWidth onClick={show}>
              Write a review
            </Button>
          </Box>
        )}
      />
      {RATING_LIST.map((item) => (
        <Box mb={1.875} mt={2} display="flex" alignItems="center">
          <Box clone width={70} mr={1.5}>
            <Typography variant="body1">{item.stars} Stars</Typography>
          </Box>
          <LinearProgress variant="determinate" className={classes.progress} value={item.percent} />
          <Box clone width={60} ml={1.5}>
            <Typography variant="body1">{item.percent}%</Typography>
          </Box>
        </Box>
      ))}
      <Box className={classes.peopleInfoListWrapper}>
        {REVIEWS_PEOPLE_LIST.map((item) => (
          <ReviewCard review={item} />
        ))}
      </Box>
    </Paper>
  )
}

export default ProductReviews

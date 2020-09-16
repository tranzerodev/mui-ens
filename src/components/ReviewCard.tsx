import React from 'react'
import { Box, Typography, Theme, Avatar } from '@material-ui/core'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Rating from '@material-ui/lab/Rating'
import { grey } from '@material-ui/core/colors'

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    color: grey[600],
    marginBottom: theme.spacing(1),
  },
  description: {
    color: theme.palette.custom.tundora,
  },
}))

interface Review {
  image: string
  name: string
  score: number
  title: string
  desc: string
}

interface ReviewCardProps {
  review: Review
}

const ReviewCard: React.FC<ReviewCardProps> = (props) => {
  const { review } = props
  const { image, name, score, title, desc } = review
  const classes = useStyles(props)

  return (
    <Box py={2.5}>
      <Box display="flex" alignItems="center">
        <Avatar src={`/product-detail/${image}`} alt="avatar" />
        <Box ml={1}>
          <Typography>{name}</Typography>
          <Rating name="read-only" value={score} readOnly />
        </Box>
      </Box>
      <Typography variant="body1" className={classes.title}>
        {title}
      </Typography>
      <Typography variant="body1" className={classes.description}>
        {desc}
      </Typography>
    </Box>
  )
}

export default ReviewCard

import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Box, Grid, Typography } from '@material-ui/core'
import { useForm, Controller } from 'react-hook-form'
import { TextField } from '@onextech/gvs-kit/core'
import { Rating } from '@material-ui/lab'

interface AddReviewFormProps {
  onSuccess?: () => void
}

const useStyles = makeStyles(() => ({
  review: {
    '& label': {
      '&.MuiInputLabel-outlined': {
        display: 'none',
      },
    },
    '& .MuiOutlinedInput-notchedOutline': {
      top: 0,
      '& legend': {
        display: 'none',
      },
    },
  },
}))

const AddReviewForm = (props: AddReviewFormProps) => {
  const classes = useStyles()
  const { onSuccess } = props
  const [rating, setRating] = useState(0)

  const form = useForm()
  const { control, handleSubmit } = form

  const onSubmit = async () => {
    if (onSuccess) return onSuccess()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={2}>
          <Typography variant="h5">Rating</Typography>
        </Grid>
        <Box clone display="flex" alignItems="center" mb={1}>
          <Grid item xs={12} sm={10}>
            <Rating
              name="write-review"
              size="small"
              value={rating}
              precision={0.5}
              onChange={(_event, newValue) => {
                setRating(newValue)
              }}
            />
            {!!rating && (
              <Typography variant="inherit">
                {rating} {rating <= 1 ? 'Star' : 'Stars'}
              </Typography>
            )}
          </Grid>
        </Box>
        <Grid item xs={12} sm={2}>
          <Typography variant="h5">Review</Typography>
        </Grid>
        <Grid item xs={12} sm={10}>
          <Controller
            as={TextField}
            control={control}
            name="review"
            fullWidth
            multiline
            className={classes.review}
            rows={4}
            placeholder="Give details about your experience in using the product. Pay attention to quality, convenience model, its compliance with the declared characteristics."
            variant="outlined"
          />
        </Grid>
      </Grid>
      <Box mt={3} display="flex" justifyContent="flex-end">
        <Box clone>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Box>
      </Box>
    </form>
  )
}

export default AddReviewForm

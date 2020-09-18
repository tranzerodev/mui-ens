import React, { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Typography,
  Box,
  Grid,
  TextField,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Rating } from '@material-ui/lab'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > div >div': {
      width: '35%',
      padding: theme.spacing(2),
      borderRadius: '10px',
    },
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  heading: {
    color: '#263238',
    paddingBottom: 0,
  },
  ratingLabel: {
    verticalAlign: 'top',
  },
}))

const WriteReview = (props: any) => {
  const classes = useStyles()
  const { openPopup, setOpenPopup } = props
  const [rating, setRating] = useState(0)

  const handleClose = () => {
    setOpenPopup(false)
  }

  return (
    <Dialog onClose={handleClose} open={openPopup} maxWidth="md" className={classes.root}>
      <DialogTitle id="customized-dialog-title">
        <Box clone fontSize={21} pb={3}>
          <Typography className={classes.heading} variant="h4">
            Add Review
          </Typography>
        </Box>
        <IconButton aria-label="close" onClick={handleClose} className={classes.closeButton}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={2}>
            <Typography className={classes.heading} variant="h5">
              Rating
            </Typography>
          </Grid>
          <Grid item xs={12} sm={10}>
            <Rating
              name="write-review"
              size="small"
              value={rating}
              precision={0.5}
              onChange={(event, newValue) => {
                setRating(newValue)
              }}
            />
            {rating ? (
              <Typography variant="inherit" className={classes.ratingLabel}>
                {rating} {rating <= 1 ? 'Star' : 'Stars'}
              </Typography>
            ) : (
              ''
            )}
          </Grid>
          <Grid item xs={12} sm={2}>
            <Typography className={classes.heading} variant="h5">
              Review
            </Typography>
          </Grid>
          <Grid item xs={12} sm={10}>
            <TextField
              id="outlined-multiline-static"
              fullWidth
              multiline
              rows={6}
              placeholder="Type your review here"
              variant="outlined"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button size="large" color="primary" variant="contained" onClick={handleClose}>
          SUBMIT
        </Button>
      </DialogActions>
    </Dialog>
  )
}
export default WriteReview

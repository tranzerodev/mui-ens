import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import PortalModal from '../../components/PortalModal'
import AddReviewForm from './AddReviewForm'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4.5),
    '& > hr': {
      display: 'none',
    },
    '& > .MuiIconButton-root': {
      right: 32,
    },
  },
}))

type AddReviewModalProps = React.ComponentProps<typeof PortalModal>

const AddReviewModal: React.FC<AddReviewModalProps> = (props) => {
  const classes = useStyles()
  const theme = useTheme()

  return (
    <PortalModal className={classes.root} width={565} {...props}>
      <Box clone fontSize={theme.typography.pxToRem(21)} fontWeight={600} mb={2}>
        <Typography variant="h3">Add Review</Typography>
      </Box>
      <AddReviewForm />
    </PortalModal>
  )
}

export default AddReviewModal

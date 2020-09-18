import React from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PortalModal from '../../../components/PortalModal'
import AddLessonForm from './AddLessonForm'

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
  header: {
    fontSize: theme.typography.pxToRem(24),
    fontWeight: 500,
    marginBottom: theme.spacing(4.5),
  },
}))

type AddLessonModalProps = React.ComponentProps<typeof PortalModal>

const AddLessonModal: React.FC<AddLessonModalProps> = (props) => {
  const classes = useStyles()

  return (
    <PortalModal className={classes.root} width={565} {...props}>
      <Typography variant="h2" className={classes.header}>
        Add Lessons
      </Typography>
      <AddLessonForm />
    </PortalModal>
  )
}

export default AddLessonModal

import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Box } from '@material-ui/core'
import { useForm, Controller } from 'react-hook-form'
import { TextField } from '@onextech/gvs-kit/core'
import { LESSON_LIST_OPTIONS } from '../constants'

interface AddLessonFormProps {
  onSuccess?: () => void
}

const useStyles = makeStyles((theme) => ({
  submitButton: {
    padding: theme.spacing(1, 10),
  },
}))

const AddLessonForm = (props: AddLessonFormProps) => {
  const classes = useStyles()
  const { onSuccess } = props

  const defaultValues = {
    lesson: LESSON_LIST_OPTIONS[0],
  }

  const form = useForm({ defaultValues })
  const { control, handleSubmit } = form

  const onSubmit = async () => {
    if (onSuccess) return onSuccess()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller as={TextField} options={LESSON_LIST_OPTIONS} control={control} name="lesson" />

      <Box mt={4} display="flex" justifyContent="center">
        <Button className={classes.submitButton} variant="contained" color="primary" type="submit">
          Add
        </Button>
      </Box>
    </form>
  )
}

export default AddLessonForm

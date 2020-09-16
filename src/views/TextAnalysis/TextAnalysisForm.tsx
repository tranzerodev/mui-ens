import React from 'react'
import * as yup from 'yup'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { useForm, Controller, FieldError } from 'react-hook-form'
import { TextField } from '@onextech/gvs-kit/core'
import { Box, Button, Grid, Typography } from '@material-ui/core'

interface TextAnalysisFormProps {
  onSubmitSuccess?: () => void
}

interface TextAnalysisFormValues {
  content: string
}

const defaultValues = { content: '' }

const useStyles = makeStyles(() => ({
  textContentField: {
    height: '100%',
  },
  input: {
    height: '100%',
    '&.MuiInputBase-root': {
      alignItems: 'flex-start',
    },
  },
}))

const TextAnalysisFormSchema = yup.object().shape({
  content: yup.string().required('Please input your text.'),
})

const TextAnalysisForm: React.FC<TextAnalysisFormProps> = (props) => {
  const { onSubmitSuccess } = props
  const classes = useStyles()
  const theme = useTheme()

  const { control, handleSubmit, errors, reset, formState, watch } = useForm<TextAnalysisFormValues>({
    defaultValues,
    validationSchema: TextAnalysisFormSchema,
  })

  const { isSubmitting } = formState
  const values = watch()

  const onSubmit = () => {
    // TODO
    if (onSubmitSuccess) return onSubmitSuccess()
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={7}>
          {/* TODO: Can't get rid of the label here */}
          <Controller
            className={classes.textContentField}
            as={TextField}
            control={control}
            text
            hideLabel
            name="content"
            placeholder="Type or paste your text here to check for readability."
            error={Boolean(errors.content)}
            helperText={(errors.content as FieldError)?.message}
            InputProps={{
              className: classes.input,
            }}
          />
        </Grid>
        <Grid item xs={12} md={5}>
          <Box mb={3}>
            <Typography variant="h1" color="textPrimary">
              Text Analysis Tool
            </Typography>
          </Box>
          <Box mb={3} fontSize={theme.typography.pxToRem(16)} lineHeight={1.56}>
            <Typography variant="subtitle1">
              To score the readability of your content, paste it into the box on the left and click the button above.
              <br />
              <br />
              For more comprehensive analysis, including suggestions, error highlighting, printable reports, or to score
              files, emails or URLs, check out EnglishSmith.
            </Typography>
          </Box>
          <Button fullWidth variant="contained" color="primary" type="submit" disabled={isSubmitting}>
            Score
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default TextAnalysisForm

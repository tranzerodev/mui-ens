import React, { useState, useEffect } from 'react'
import validate from 'validate.js'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Button, Grid, Typography } from '@material-ui/core'
import { TextField } from '@onextech/gvs-kit/core'
import { EnquiryStatusEnum } from '@onextech/etc-api'
import { useCreateEnquiry } from '../../graphql/enquiry/mutations'

interface ContactFormProps {
  className?: string
  onSubmitted: () => void
}

interface ContactFormValues {
  name?: string
  email?: string
  message?: string
}

interface ContactFormFieldState {
  name?: boolean
  email?: boolean
  message?: boolean
}

interface ContactFormState {
  isValid: boolean
  values: ContactFormValues
  touched: ContactFormFieldState
  errors: ContactFormFieldState
}

const schema = {
  name: {
    presence: { allowEmpty: false, message: 'is required' },
  },
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
  },
  message: {
    presence: { allowEmpty: false, message: 'is required' },
  },
}

const useStyles = makeStyles((theme) => ({
  field: {
    marginBottom: theme.spacing(2),
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      flexGrow: 1,
    },
    '& input': {
      padding: theme.spacing(2, 1.5),
      fontSize: theme.typography.pxToRem(16),
    },
  },
  title: {
    fontWeight: 600,
    fontSize: theme.typography.pxToRem(24),
    marginBottom: theme.spacing(1.5),
  },
  description: {
    color: 'rgba(0, 0, 0, 0.54)',
    marginBottom: theme.spacing(1.5),
  },
  actionButton: {
    textTransform: 'none',
    padding: theme.spacing(0.5, 1.2),
  },
}))

const ContactForm: React.FC<ContactFormProps> = (props) => {
  const { className, onSubmitted, ...rest } = props
  const classes = useStyles()

  const defaultFormState = {
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  }

  const [formState, setFormState] = useState<ContactFormState>(defaultFormState)

  const handleChange = (event) => {
    event.persist()

    setFormState((prevFormState) => ({
      ...prevFormState,
      values: {
        ...prevFormState.values,
        [event.target.name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value,
      },
      touched: {
        ...prevFormState.touched,
        [event.target.name]: true,
      },
    }))
  }

  const { handleCreateEnquiry } = useCreateEnquiry()

  const handleSubmit = async (event) => {
    const { email, name, message } = formState.values
    event.preventDefault()
    handleCreateEnquiry({
      name,
      email,
      content: message,
      status: EnquiryStatusEnum.new,
    })
    // Set the snackbar open
    onSubmitted()
    // Reset the form
    setFormState(defaultFormState)
  }

  const hasError = (field: string) => Boolean(formState.touched[field] && formState.errors[field])

  useEffect(() => {
    const errors = validate(formState.values, schema)

    setFormState((prevFormState) => ({
      ...prevFormState,
      isValid: !errors,
      errors: errors || {},
    }))
  }, [formState.values])

  return (
    <form {...rest} className={clsx(className)} onSubmit={handleSubmit}>
      <Typography className={classes.title} variant="h4" color="textPrimary">
        Let’s get in touch
      </Typography>
      <Typography className={classes.description} variant="subtitle1">
        Our advisors will be delighted to answer your questions
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Box className={classes.field}>
            <TextField
              required
              error={hasError('name')}
              fullWidth
              helperText={hasError('name') ? formState.errors.name[0] : ''}
              label="Name"
              name="name"
              onChange={handleChange}
              value={formState.values.name || ''}
              placeholder="Enter your name"
              InputLabelProps={{ required: false, shrink: true }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <div className={classes.field}>
            <TextField
              required
              error={hasError('email')}
              fullWidth
              helperText={hasError('email') ? formState.errors.email[0] : ''}
              label="Email"
              name="email"
              onChange={handleChange}
              value={formState.values.email || ''}
              placeholder="Enter your email"
              InputLabelProps={{ required: false, shrink: true }}
            />
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className={classes.field}>
            <TextField
              required
              error={hasError('message')}
              fullWidth
              helperText={hasError('message') ? formState.errors.message[0] : ''}
              label="Message"
              name="message"
              onChange={handleChange}
              value={formState.values.message || ''}
              placeholder="Enter your message"
              InputLabelProps={{ required: false, shrink: true }}
              multiline
              rows={4}
              variant="outlined"
            />
          </div>
        </Grid>
      </Grid>
      <Box display="flex" justifyContent="flex-end" mt={1}>
        <Button type="submit" variant="contained" color="primary" classes={{ label: classes.actionButton }}>
          Send
        </Button>
      </Box>
    </form>
  )
}

export default ContactForm

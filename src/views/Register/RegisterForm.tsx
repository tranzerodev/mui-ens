import React, { useState, useEffect } from 'react'
import validate from 'validate.js'
import clsx from 'clsx'
import Router from 'next/router'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Typography, Box, FormControlLabel, Checkbox } from '@material-ui/core'
import { indigo } from '@material-ui/core/colors'
import { TextField } from '@onextech/gvs-kit/core'
import { useAuth } from '../../auth'

interface RegisterFormProps {
  className?: string
  isModal?: boolean
  onRegisterSuccess?: () => void
}

interface RegisterFormValues {
  name?: string
  email?: string
  password?: string
}

interface RegisterFormFieldState {
  name?: string
  email?: boolean
  password?: boolean
}

interface RegisterFormState {
  isValid: boolean
  values: RegisterFormValues
  touched: RegisterFormFieldState
  errors: RegisterFormFieldState
}

const schema = {
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' },
  },
}

const useStyles = makeStyles((theme: any) => ({
  field: {
    marginBottom: theme.spacing(5),
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
  textFieldLabel: {
    color: theme.palette.text.light,
    fontSize: theme.typography.pxToRem(16),
  },
  button: {
    padding: 0,
    '&:hover': {
      backgroundColor: 'transparent',
    },
    '& > .MuiButton-label': {
      textTransform: 'none',
      lineHeight: 1.57,
      letterSpacing: 0,
      color: indigo[500],
      textDecoration: 'underline',
    },
  },
  checkbox: {
    marginLeft: 0,
  },
}))

const RegisterForm: React.FC<RegisterFormProps> = (props) => {
  const { className, onRegisterSuccess, isModal, ...rest } = props
  const classes = useStyles()
  const [formState, setFormState] = useState<RegisterFormState>({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  })

  const { signUp, closeRegisterModal, openLoginModal } = useAuth()

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

  const handleSubmit = async (event) => {
    const { email, password } = formState.values
    event.preventDefault()
    const { error } = await signUp({ username: email, password })
    if (!error) {
      if (onRegisterSuccess) onRegisterSuccess()
      else {
        Router.push('/')
      }
    }
  }

  const handleOnClick = () => {
    if (isModal) {
      closeRegisterModal()
      openLoginModal()
    } else {
      Router.push('/login')
    }
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
      <div className={classes.field}>
        <TextField
          required
          error={hasError('name')}
          helperText={hasError('name') ? formState.errors.name[0] : null}
          label="Name"
          name="name"
          onChange={handleChange}
          value={formState.values.name || ''}
          placeholder="Enter your name"
          InputLabelProps={{
            required: false,
            shrink: true,
            className: classes.textFieldLabel,
          }}
        />
      </div>
      <div className={classes.field}>
        <TextField
          required
          error={hasError('email')}
          helperText={hasError('email') ? formState.errors.email[0] : null}
          label="Email"
          name="email"
          onChange={handleChange}
          value={formState.values.email || ''}
          placeholder="Enter your email"
          InputLabelProps={{
            required: false,
            shrink: true,
            className: classes.textFieldLabel,
          }}
        />
      </div>
      <div className={classes.field}>
        <TextField
          required
          error={hasError('password')}
          helperText={hasError('password') ? formState.errors.password[0] : null}
          label="Password"
          name="password"
          onChange={handleChange}
          type="password"
          value={formState.values.password || ''}
          placeholder="Enter your password"
          InputLabelProps={{
            required: false,
            shrink: true,
            className: classes.textFieldLabel,
          }}
          inputProps={{ minLength: '8' }}
        />
      </div>
      <FormControlLabel
        control={<Checkbox color="primary" />}
        label={
          <Typography variant="subtitle1" component="div">
            I have read the{' '}
            <Button disableRipple onClick={handleOnClick} className={classes.button}>
              Terms & Conditions
            </Button>
          </Typography>
        }
      />
      <Box clone mt={1} mb={1}>
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Sign Up
        </Button>
      </Box>
      <Box mt={1} mb={{ xs: 4, sm: 1 }}>
        <Typography variant="subtitle1">
          Have an account?
          <Button disableRipple onClick={handleOnClick} className={classes.button}>
            Sign In
          </Button>
        </Typography>
      </Box>
    </form>
  )
}

export default RegisterForm

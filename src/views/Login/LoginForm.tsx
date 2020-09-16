import React, { useState, useEffect } from 'react'
import validate from 'validate.js'
import clsx from 'clsx'
import Router from 'next/router'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Box } from '@material-ui/core'
import { indigo } from '@material-ui/core/colors'
import { TextField } from '@onextech/gvs-kit/core'
import { useAuth } from '../../auth'

interface LoginFormProps {
  className?: string
  isModal?: boolean
  onLoginSuccess?: () => void
}

interface LoginFormValues {
  email?: string
  password?: string
}

interface LoginFormFieldState {
  email?: boolean
  password?: boolean
}

interface LoginFormState {
  isValid: boolean
  values: LoginFormValues
  touched: LoginFormFieldState
  errors: LoginFormFieldState
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
}))

const LoginForm: React.FC<LoginFormProps> = (props) => {
  const { className, onLoginSuccess, isModal, ...rest } = props
  const classes = useStyles()
  const [formState, setFormState] = useState<LoginFormState>({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  })

  const { signIn, openRegisterModal, closeLoginModal } = useAuth()

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
    const { error } = await signIn({ username: email, password })
    if (!error) {
      if (onLoginSuccess) onLoginSuccess()
      else {
        Router.push('/')
      }
    }
  }

  const handleOnClick = () => {
    if (isModal) {
      closeLoginModal()
      openRegisterModal()
    } else {
      Router.push('/register')
    }
  }

  const handleOnClickForgotPassword = () => {
    if (isModal) closeLoginModal()
    Router.push('/forgot-password')
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
          error={hasError('email')}
          fullWidth
          helperText={hasError('email') ? formState.errors.email[0] : null}
          label="Email"
          name="email"
          onChange={handleChange}
          value={formState.values.email || ''}
          placeholder="Email Address"
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
          fullWidth
          helperText={hasError('password') ? formState.errors.password[0] : null}
          label="Password"
          name="password"
          onChange={handleChange}
          type="password"
          value={formState.values.password || ''}
          placeholder="Password"
          InputLabelProps={{
            required: false,
            shrink: true,
            className: classes.textFieldLabel,
          }}
        />
      </div>
      <Button variant="contained" color="primary" type="submit" fullWidth>
        Login
      </Button>
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={2} mb={{ xs: 2, md: 0 }}>
        <Button disableRipple onClick={handleOnClick} className={classes.button}>
          Sign Up
        </Button>
        <Button disableRipple onClick={handleOnClickForgotPassword} className={classes.button}>
          Forget password
        </Button>
      </Box>
    </form>
  )
}

export default LoginForm

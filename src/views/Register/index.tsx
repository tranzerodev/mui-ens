import React from 'react'
import { Grid, Typography, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Layout from '../../components/Layout/Layout'
import RegisterForm from './RegisterForm'

const useStyles = makeStyles((theme: Theme) => ({
  block: {
    backgroundColor: theme.palette.background.primary,
  },
  workingWrapper: {
    display: 'flex',
    padding: theme.spacing(10),
    [theme.breakpoints.up('lg')]: {
      padding: theme.spacing(16),
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
    },
    [theme.breakpoints.only('xs')]: {
      marginTop: theme.spacing(4),
    },
  },
  header: {
    fontSize: theme.typography.pxToRem(24),
    marginBottom: theme.spacing(1.5),
  },
  subHeader: {
    fontSize: theme.typography.pxToRem(21),
    marginBottom: theme.spacing(5.5),
    fontWeight: 400,
  },
  image: {
    height: '100%',
    width: '100%',
    objectFit: 'cover',
  },
  form: {
    width: '100%',
  },
}))

const Register: React.FC = (props) => {
  const classes = useStyles(props)

  return (
    <Layout title="Register">
      <Grid container className={classes.block}>
        <Grid item xs={12} md={5} className={classes.workingWrapper} container justify="center" direction="column">
          <Typography variant="h5" className={classes.header}>
            Get Started
          </Typography>
          <Typography variant="h5" className={classes.subHeader}>
            EnglishSmith gives you access to hundreds of english education resources.
          </Typography>
          <RegisterForm />
        </Grid>
        <Grid item xs={12} md={7}>
          <img src="/others/login/stock-register.png" alt="Assorted Chocolates" className={classes.image} />
        </Grid>
      </Grid>
    </Layout>
  )
}

export default Register

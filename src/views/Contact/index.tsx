import React from 'react'
import { Box, Snackbar } from '@material-ui/core'
import { useTheme, makeStyles } from '@material-ui/core/styles'
import Layout from '../../components/Layout/Layout'
import ContactForm from './ContactForm'
import ContactHeroBanner from './ContactHeroBanner'
import Block from '../../components/Block'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
}))

const Contact: React.FC = () => {
  const theme = useTheme()
  const classes = useStyles()
  const [openSnackbar, setOpenSnackbar] = React.useState(false)
  const handleSnackbarClose = () => setOpenSnackbar(false)
  const handleSnackbarOpen = () => setOpenSnackbar(true)

  return (
    <Layout title="Contact">
      <ContactHeroBanner />
      <Block className={classes.root}>
        <Box borderRadius={20} p={4} mt={4} mb={8} bgcolor={theme.palette.common.white} maxWidth={712}>
          <ContactForm onSubmitted={handleSnackbarOpen} />
        </Box>
      </Block>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        open={openSnackbar}
        message="Your message has been sent!"
      />
    </Layout>
  )
}

export default Contact

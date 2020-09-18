import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Container, Grid, Typography, Theme, Button, Paper, Box } from '@material-ui/core'
import clsx from 'clsx'
import * as colors from '@material-ui/core/colors'
import AspectRatioIcon from '@material-ui/icons/AspectRatio'
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined'
import AccountBalanceOutlinedIcon from '@material-ui/icons/AccountBalanceOutlined'
import Layout from '../../components/Layout/Layout'
import Hero from '../../components/Hero'

const useStyles = makeStyles((theme: Theme) => ({
  navButton: {
    fontSize: theme.typography.pxToRem(21),
    color: colors.grey[400],
    backgroundColor: 'transparent',
    textTransform: 'none',
    textAlign: 'left',
    '&& svg': {
      fontSize: theme.typography.pxToRem(34),
    },
    '&.active': {
      color: theme.palette.text.primary,
    },
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  image: {
    objectFit: 'cover',
  },
  buttonsWrapper: {
    '& > .MuiButton-root:not(:first-child)': {
      marginTop: theme.spacing(5),
    },
  },
}))

const Exams: React.FC = (props) => {
  const classes = useStyles(props)
  const theme = useTheme()

  return (
    <Layout title="Profile bookmarks" showFooter={false}>
      {/* Hero */}
      <Hero background={{ src: '/home/hero-origin.png' }} container={{ maxWidth: 'md' }}>
        <Box mb={1} color={theme.palette.primary.contrastText} clone>
          <Typography variant="h1">Levels and Exams</Typography>
        </Box>
        <Box color={theme.palette.primary.contrastText} fontSize={theme.typography.pxToRem(16)} maxWidth={438} clone>
          <Typography variant="subtitle1">
            EnglishSmith resources is organised according to the Common European Framework for Languages (CEFR) levels,
            English proficiency Exams, as well as the English, American and Singapore education levels.
          </Typography>
        </Box>
      </Hero>

      {/* Body */}
      <Container>
        <Box mt={{ xs: 2.75, sm: 3.75, md: 9 }} mb={9} clone>
          <Grid container>
            <Box clone mb={{ xs: 3.5, sm: 4.5, md: 0 }} display="flex" flexDirection="column" alignItems="flex-start">
              <Grid item md={3} className={classes.buttonsWrapper}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  className={clsx(classes.navButton, 'active')}
                  startIcon={<AspectRatioIcon fontSize="large" />}
                >
                  CEFR Level
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  className={classes.navButton}
                  startIcon={<DashboardOutlinedIcon fontSize="large" />}
                >
                  English Proficiency
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  className={classes.navButton}
                  startIcon={<AccountBalanceOutlinedIcon fontSize="large" />}
                >
                  English, American & Singapore education levels
                </Button>
              </Grid>
            </Box>

            <Grid item md={9}>
              <Box clone ml={{ md: 4 }} py={4} px={5}>
                <Paper elevation={0}>
                  <Box clone fontSize={theme.typography.pxToRem(24)} mb={1.875}>
                    <Typography variant="h5">CEFR Level</Typography>
                  </Box>
                  <Box clone fontSize={theme.typography.pxToRem(16)} mb={3.125}>
                    <Typography variant="body1">
                      The CEFR organises language proficiency in six levels, A1 to C2, which can be regrouped into three
                      broad levels: Basic User, Independent User and Proficient User, and that can be further subdivided
                      according to the needs of the local context. The levels are defined through 'can-do' descriptors.
                    </Typography>
                  </Box>
                  <Box clone maxWidth={1} maxHeight={1}>
                    <img
                      className={classes.image}
                      src="/exams/cefr-table.png"
                      alt="Summary of the development of the CEFR"
                    />
                  </Box>
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Layout>
  )
}

export default Exams

import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Container, Grid, Typography, Theme, Button, Paper } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder'
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined'
import clsx from 'clsx'
import { grey } from '@material-ui/core/colors'
import LessonDetailCard from '../../components/LessonDetailCard'
import Layout from '../../components/Layout/Layout'
import { MOCK_LESSONS_LIST } from './const'

const useStyles = makeStyles((theme: Theme) => ({
  whiteCornerRadiusWrapper: {
    marginLeft: theme.spacing(4),
    borderRadius: 20,
    padding: theme.spacing(4, 5),
    height: '100%',
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
  },
  navButton: {
    fontSize: theme.typography.pxToRem(21),
    color: grey[400],
    backgroundColor: 'unset',
    '&& svg': {
      fontSize: theme.typography.pxToRem(34),
    },
    '&.active': {
      color: theme.palette.text.primary,
    },
    '&:hover': {
      backgroundColor: 'unset',
    },
  },
}))

const ProfileBookmarks: React.FC = (props) => {
  const classes = useStyles(props)
  const theme = useTheme()

  return (
    <Layout title="Profile bookmarks" showFooter={false}>
      <Container maxWidth="lg">
        <Box my={9} clone>
          <Grid container>
            <Grid item md={2}>
              <Box my={3.5} display="flex" flexDirection="column">
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  className={clsx(classes.navButton, 'active')}
                  startIcon={<BookmarkBorderIcon fontSize="large" />}
                >
                  Bookmarks
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  className={classes.navButton}
                  startIcon={<SettingsOutlinedIcon fontSize="large" />}
                >
                  My Account
                </Button>
              </Box>
            </Grid>
            <Grid item md={10}>
              <Paper elevation={0} classes={{ root: classes.whiteCornerRadiusWrapper }}>
                <Box clone fontSize={theme.typography.pxToRem(24)} mb={4}>
                  <Typography variant="h5">Bookmarks</Typography>
                </Box>
                <Grid container spacing={5}>
                  {MOCK_LESSONS_LIST.map((item) => (
                    <Grid item md={4} sm={6}>
                      <LessonDetailCard {...item} key={item.id} />
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Layout>
  )
}

export default ProfileBookmarks

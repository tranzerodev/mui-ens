import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Container, Grid, Typography, Theme, Paper, FormControlLabel, Checkbox, Divider } from '@material-ui/core'
import Chip from '@material-ui/core/Chip'
import Box from '@material-ui/core/Box'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import LessonDetailCard from '../../components/LessonDetailCard'
import Layout from '../../components/Layout/Layout'
import { MOCK_FILTER_OPTIONS, MOCK_LESSONS_LIST, SELECTED_OPTIONS } from './const'
import Hero from '../../components/Hero'
import SearchBar from '../../components/SearchBar'
import { SEARCH_PLACEHOLDER } from '../Home/const'
import Sort from './Sort'

const useStyles = makeStyles((theme: Theme) => ({
  whiteCornerRadiusWrapper: {
    marginLeft: theme.spacing(4),
    padding: theme.spacing(4),
    backgroundColor: theme.palette.background.paper,
    borderRadius: 0,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
    '&:first-child': {
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    '&:not(:first-child)': {
      borderTop: `1px solid ${theme.palette.custom.iron}`,
    },
    '&:last-child': {
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
    },
  },
}))

const Products: React.FC = (props) => {
  const classes = useStyles(props)
  const theme = useTheme()

  const handleRemoveFilter = () => {
    //
  }

  return (
    <Layout title="Products" showFooter={false}>
      <Hero background={{ src: '/home/hero-origin.png' }}>
        <Box display="flex" justifyContent="center">
          <Box
            height={1}
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            maxWidth={600}
          >
            <Box clone mb={2} color={theme.palette.primary.contrastText}>
              <Typography variant="h1" align="center">
                The Best English Teaching Resources for Educators
              </Typography>
            </Box>
            <SearchBar placeholder={SEARCH_PLACEHOLDER} />
          </Box>
        </Box>
      </Hero>
      <Container maxWidth="lg">
        <Box my={4} clone>
          <Grid container>
            <Grid item md={3}>
              {MOCK_FILTER_OPTIONS?.map((filterOption) => (
                <Paper elevation={0} classes={{ root: classes.whiteCornerRadiusWrapper }}>
                  <Box display="flex" justifyContent="space-between">
                    <Box clone mb={1} fontWeight={600}>
                      <Typography variant="subtitle1">Language & Skills</Typography>
                    </Box>
                    <KeyboardArrowUpIcon />
                  </Box>
                  <Box display="flex" flexDirection="column">
                    {filterOption?.options?.map((option) => (
                      <FormControlLabel
                        control={<Checkbox color="primary" />}
                        label={
                          <Box clone fontWeight={400}>
                            <Typography variant="h5">{option}</Typography>
                          </Box>
                        }
                      />
                    ))}
                  </Box>
                </Paper>
              ))}
            </Grid>
            <Box pl={4} clone>
              <Grid item md={9}>
                <Box display="flex" justifyContent="space-between" mb={2} mt={3.5}>
                  <Box clone fontSize={theme.typography.pxToRem(24)}>
                    <Typography variant="h5">Browse Lessons</Typography>
                  </Box>
                  <Sort />
                </Box>

                <Box clone bgcolor={theme.palette.border.main} mb={2}>
                  <Divider />
                </Box>
                <Box mb={3} display="flex">
                  {SELECTED_OPTIONS.map((selectedOption) => (
                    <Box mr={1} clone>
                      <Chip label={selectedOption} color="primary" onDelete={handleRemoveFilter} />
                    </Box>
                  ))}
                </Box>
                <Grid container spacing={5}>
                  {MOCK_LESSONS_LIST.map((item) => (
                    <Grid item md={4} sm={6}>
                      <LessonDetailCard {...item} key={item.id} />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Box>
      </Container>
    </Layout>
  )
}

export default Products

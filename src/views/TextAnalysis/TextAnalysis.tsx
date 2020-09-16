import React from 'react'
import { useTheme } from '@material-ui/core/styles'
import { Box, Container, Grid, Typography, useMediaQuery } from '@material-ui/core'
import Layout from '../../components/Layout/Layout'
import Hero from '../../components/Hero'
import TextAnalysisForm from './TextAnalysisForm'
import { TEXT_ANALYSIS_ABOUT } from './constants'

const TextAnalysis: React.FC = () => {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Layout title="Text Analysis">
      {/* Hero */}
      <Hero background={{ src: '/home/hero-origin.png' }} container={{ maxWidth: 'md' }}>
        <Box mb={1} color={theme.palette.primary.contrastText} clone>
          <Typography variant="h1">Text Analysis</Typography>
        </Box>
        <Box color={theme.palette.primary.contrastText} fontSize={theme.typography.pxToRem(16)} maxWidth={438} clone>
          <Typography variant="subtitle1">
            A powerful tool to help you understand, check and analyse writing, essays, compositions and reading text.
          </Typography>
        </Box>
      </Hero>

      {/* Body */}
      <Box py={isSmallScreen ? 5 : 15} bgcolor={theme.palette.background.paper}>
        <Container maxWidth="md">
          <TextAnalysisForm />
        </Container>
      </Box>

      <Box py={isSmallScreen ? 5 : 10} bgcolor={theme.palette.background.tertiary}>
        <Container maxWidth="md">
          <Box mb={3}>
            <Typography variant="h1" color="textPrimary">
              {TEXT_ANALYSIS_ABOUT.title}
            </Typography>
          </Box>

          <Grid container spacing={5}>
            <Grid item xs={12} md={6}>
              <Box fontSize={theme.typography.pxToRem(16)} clone>
                <Typography variant="subtitle1">{TEXT_ANALYSIS_ABOUT.paraOne}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box fontSize={theme.typography.pxToRem(16)} clone>
                <Typography variant="subtitle1">{TEXT_ANALYSIS_ABOUT.paraTwo}</Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Layout>
  )
}

export default TextAnalysis

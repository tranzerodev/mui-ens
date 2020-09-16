import React from 'react'
import { Typography, Paper, Theme, Box } from '@material-ui/core'
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles((theme: Theme) => ({
  whiteCornerRadiusWrapper: {
    borderRadius: 10,
    padding: theme.spacing(4),
    height: '100%',
  },
}))

interface OverviewList {
  title: string
  description: string
}

interface ProductOvervew {
  description: string
  overviewLists: OverviewList[]
}

interface ProductRequirement {
  description: string
}

interface ProductOverviewProps {
  overview: ProductOvervew
  requirements: ProductRequirement
}

const ProductOverview: React.FC<ProductOverviewProps> = (props) => {
  const classes = useStyles(props)
  const { overview, requirements } = props

  return (
    <Paper elevation={0} classes={{ root: classes.whiteCornerRadiusWrapper }}>
      <Box clone fontSize={21} pb={3}>
        <Typography variant="h4">Overview</Typography>
      </Box>
      <Box clone mb={3}>
        <Typography variant="subtitle1">{overview.description}</Typography>
      </Box>
      {overview.overviewLists?.map((item) => (
        <>
          <Typography variant="subtitle1">{item.title}</Typography>
          <Box clone mb={3}>
            <Typography variant="subtitle1">{item.description}</Typography>
          </Box>
        </>
      ))}
      <Box clone fontSize={21} pb={3}>
        <Typography variant="h4">Requirements</Typography>
      </Box>
      <Typography variant="subtitle1">{requirements.description}</Typography>
    </Paper>
  )
}

export default ProductOverview

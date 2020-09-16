import React from 'react'
import { Box, Typography, Theme, Paper } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { MODULES_LIST } from './const'

const useStyles = makeStyles((theme: Theme) => ({
  whiteCornerRadiusWrapper: {
    borderRadius: 10,
    padding: theme.spacing(4),
    height: '100%',
  },
  numberChip: {
    backgroundColor: theme.palette.icon,
    color: theme.palette.background.paper,
  },
}))

const ProductModules: React.FC = (props) => {
  const classes = useStyles(props)
  const theme = useTheme()

  return (
    <Paper elevation={0} classes={{ root: classes.whiteCornerRadiusWrapper }}>
      <Box clone fontSize={21} pb={3}>
        <Typography variant="h4">Modules</Typography>
      </Box>
      {MODULES_LIST.map((item, index) => (
        <Box mb={2.5}>
          <Box display="flex" alignItems="center" mb={1}>
            <Box
              className={classes.numberChip}
              display="flex"
              fontSize={14}
              alignItems="center"
              fontWeight={600}
              mr={1.75}
              borderRadius={8}
              justifyContent="center"
              width={38}
              height={30}
            >
              {index + 1}
            </Box>
            <Box clone mr="auto" color={theme.palette.custom.mirage} fontWeight={600}>
              <Typography variant="h5">{item.title}</Typography>
            </Box>
            <Box clone color={theme.palette.custom.manatee}>
              <Typography variant="body1">{item.time}</Typography>
            </Box>
          </Box>
          <Box clone color={theme.palette.custom.midGray} ml={6.5}>
            <Typography variant="body1">{item.desc}</Typography>
          </Box>
        </Box>
      ))}
    </Paper>
  )
}

export default ProductModules

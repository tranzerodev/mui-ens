import React from 'react'
import { Box, BoxProps, IconButton, Typography } from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import { useTheme } from '@material-ui/core/styles'
import { headerFontFamily } from '../../../theme/typography'
import { formatDate } from './utils'

interface Lesson {
  title: string
  attachments: number
  date: Date
}
interface LessonPlanCardProps extends BoxProps {
  lesson: Lesson
}

const LessonPlanCard: React.FC<LessonPlanCardProps> = (props) => {
  const { lesson, ...rest } = props
  const { title, attachments, date } = lesson

  const theme = useTheme()

  return (
    <Box bgcolor={theme.palette.background.paper} px={3} py={2.5} borderRadius={theme.shape.borderRadius} {...rest}>
      <Box mb={1} display="flex" justifyContent="space-between">
        {/* Course Title */}
        <Box
          maxWidth={203}
          fontSize={theme.typography.pxToRem(16)}
          fontFamily={headerFontFamily}
          fontWeight={500}
          lineHeight={1.25}
          clone
        >
          <Typography>{title}</Typography>
        </Box>
        {/* Menu Icon */}
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      </Box>

      <Box display="flex" justifyContent="space-between">
        {/* Attachments */}
        <Box
          display="flex"
          alignItems="center"
          fontSize={theme.typography.pxToRem(14)}
          color={theme.palette.custom.paleTeal}
        >
          <AttachFileIcon color="inherit" />
          <Box fontFamily={headerFontFamily} clone>
            <Typography color="inherit">{attachments}</Typography>
          </Box>
        </Box>
        {/* Date */}
        <Box
          fontFamily={headerFontFamily}
          fontSize={theme.typography.pxToRem(12)}
          color={theme.palette.custom.brightRed}
        >
          <Typography>{formatDate(date)}</Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default LessonPlanCard

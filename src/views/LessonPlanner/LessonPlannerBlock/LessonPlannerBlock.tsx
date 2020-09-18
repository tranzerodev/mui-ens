import React from 'react'
import { Box, Button, IconButton, Typography } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close'
import LessonPlanCard from './LessonPlanCard'
import AddLessonModal from './AddLessonModal'

interface Lesson {
  title: string
  attachments: number
  date: Date
}
interface LessonPlannerBlockProps {
  title: string
  lessons: Lesson[]
}

const LessonPlannerBlock: React.FC<LessonPlannerBlockProps> = (props) => {
  const { title, lessons } = props
  const theme = useTheme()

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        bgcolor={theme.palette.custom.skyBlue}
        px={2}
        py={0.5}
        borderRadius={theme.shape.borderRadius}
      >
        <Box fontSize={theme.typography.pxToRem(16)} fontWeight={500} color={theme.palette.primary.contrastText} clone>
          <Typography variant="subtitle1">{title}</Typography>
        </Box>
        <IconButton>
          {/* TODO: Delete functionality */}
          <Box fontSize={theme.typography.pxToRem(16)} color={theme.palette.primary.contrastText}>
            <CloseIcon fontSize="inherit" />
          </Box>
        </IconButton>
      </Box>

      {lessons.map((lesson) => (
        <LessonPlanCard key={lesson.title} lesson={lesson} mt={2} />
      ))}

      {/* TODO: Add Card functionality */}
      <AddLessonModal
        toggle={(show) => (
          <Box mt={3.5} display="flex" justifyContent="center">
            <Button onClick={show} fullWidth>
              + New Card
            </Button>
          </Box>
        )}
      />
    </>
  )
}

export default LessonPlannerBlock

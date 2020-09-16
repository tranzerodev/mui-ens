import React from 'react'
import { Box, Typography, Theme } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Chip from '@material-ui/core/Chip'
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined'
import ScheduleOutlinedIcon from '@material-ui/icons/ScheduleOutlined'
import StarsIcon from '@material-ui/icons/Stars'
import BookmarkIcon from '@material-ui/icons/Bookmark'
import Rating from '@material-ui/lab/Rating'
import { amber } from '@material-ui/core/colors'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundImage: 'url(/product-detail/course-image.png)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100%',
  },
  iconRoundWrapper: {
    borderRadius: '50%',
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    '& > svg': {
      margin: theme.spacing(1),
    },
  },
  starsIcon: {
    color: amber[700],
  },
  bookmarkIconEnabled: {
    color: theme.palette.icon,
  },
  bookmarkIconDisabled: {
    color: theme.palette.border.main,
  },
  chip: {
    color: theme.palette.icon,
    backgroundColor: theme.palette.secondary.main,
    fontWeight: 500,
    padding: theme.spacing(0, 0.5),
  },
  labelWithIcon: {
    color: theme.palette.text.light,
  },
}))

interface LessionDetailCardProps {
  isStarred: boolean
  isBookmarked: boolean
  tag: string
  title: string
  score: number
  certification: string
  time: string
}

const LessonDetailCard: React.FC<LessionDetailCardProps> = (props: LessionDetailCardProps) => {
  const classes = useStyles()
  const theme = useTheme()
  const { isStarred, isBookmarked: initialBookmarked, tag, title, score, certification, time } = props
  const [isBookmarked, setIsBookmarked] = React.useState(initialBookmarked)

  const handleBookmarkClick = () => {
    setIsBookmarked(!isBookmarked)
  }

  return (
    <Box
      padding={1}
      borderRadius={20}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      className={classes.root}
    >
      <Box width={1} display="flex" justifyContent="flex-end">
        {isStarred && (
          <Box className={classes.iconRoundWrapper}>
            <StarsIcon className={classes.starsIcon} />
          </Box>
        )}
        <Box className={classes.iconRoundWrapper} ml={0.75}>
          <BookmarkIcon
            className={isBookmarked ? classes.bookmarkIconEnabled : classes.bookmarkIconDisabled}
            onClick={handleBookmarkClick}
          />
        </Box>
      </Box>
      <Box width={1} borderRadius={20} bgcolor="white" p={2} mt={11} boxShadow="0 2px 4px 0 rgba(0, 0, 0, 0.15)">
        <Box mb={1} clone>
          <Chip label={tag} size="small" className={classes.chip} />
        </Box>
        <Box mb={1} clone>
          <Typography variant="h4">{title}</Typography>
        </Box>
        <Box display="flex" alignItems="center" mb={2}>
          <Rating name="read-only" value={4.5} size="small" readOnly precision={0.1} />
          <Box clone ml={1}>
            <Typography variant="h5">{score}</Typography>
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <Box color={theme.palette.icon} mr={0.5} clone>
              <DescriptionOutlinedIcon fontSize="small" />
            </Box>
            <Typography variant="h5" className={classes.labelWithIcon}>
              {certification}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Box color={theme.palette.icon} mr={0.5} clone>
              <ScheduleOutlinedIcon fontSize="small" />
            </Box>
            <Typography variant="h5" className={classes.labelWithIcon}>
              {time} mins
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default LessonDetailCard

import React from 'react'
import Link from 'next/link'
import { Box, Theme, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
// Note: Use S3 when data present
// import { S3Image } from '@onextech/gvs-kit/core'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100%',
    textDecoration: 'none',
  },
  image: {
    maxHeight: 120,
    width: '100%',
    borderRadius: 10,
    objectFit: 'cover',
  },
}))

interface LessonCardProps {
  title: string
  image: string
  slug: string
}

const LessonCard: React.FC<LessonCardProps> = (props) => {
  const { title, image, slug } = props
  const classes = useStyles(props)

  return (
    <Link href="/lessons/[slug]" as={`/lessons/${slug}`} passHref>
      <Box component="a" className={classes.root}>
        {/* Use S3 when data present */}
        {/* <S3Image className={classes.image} src={image} alt={title} /> */}
        <img className={classes.image} src={image} alt={title} />
        <Typography variant="h5" color="textPrimary">
          {title}
        </Typography>
      </Box>
    </Link>
  )
}

export default LessonCard

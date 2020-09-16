import React from 'react'
import Link from 'next/link'
import { BoxProps, Box, Theme, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles<Theme, FeaturedCardProps>((theme) => ({
  root: {
    minHeight: 370,
    borderRadius: 10,
    display: 'flex',
    textDecoration: 'none',
    cursor: 'pointer',
    backgroundImage: ({ image }: FeaturedCardProps) => `url('${image}')`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    padding: theme.spacing(5),
    [theme.breakpoints.only('xs')]: {
      minHeight: 200,
      padding: theme.spacing(3, 6),
    },
  },
  title: {
    color: ({ index }: FeaturedCardProps) =>
      index % 2 !== 0 ? theme.palette.text.contrast : theme.palette.text.primary,
    [theme.breakpoints.only('xs')]: {
      textAlign: 'center',
    },
  },
}))

interface FeaturedCardProps extends BoxProps {
  title: string
  image: string
  link: string
  category: string
  index: number
}

const FeaturedCard: React.FC<FeaturedCardProps> = (props) => {
  const { title, link, category } = props
  const classes = useStyles(props)

  return (
    // TODO: link to specific product
    <Link href={{ pathname: `${link}`, query: { category: `${category}` } }}>
      <Box component="a" className={classes.root}>
        <Typography variant="h5" className={classes.title}>
          {title}
        </Typography>
      </Box>
    </Link>
  )
}

export default FeaturedCard

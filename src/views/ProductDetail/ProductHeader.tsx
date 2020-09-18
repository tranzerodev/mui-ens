import React, { useState } from 'react'
import { Box, Grid, Typography, Theme, Paper, Container, useMediaQuery } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Link from 'next/link'
import Chip from '@material-ui/core/Chip'
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined'
import ScheduleOutlinedIcon from '@material-ui/icons/ScheduleOutlined'
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined'
import CheckIcon from '@material-ui/icons/Check'
import { Carousel } from '@onextech/gvs-kit/core'
import { blueGrey, teal } from '@material-ui/core/colors'
import PreviousButton from '../../components/PreviousButton'
import NextButton from '../../components/NextButton'
import { WHAT_YOU_WILL_LEARN_LIST, MOCK_PRODUCT } from './const'

const useStyles = makeStyles((theme: Theme) => ({
  productSubTitle: {
    fontSize: theme.typography.pxToRem(21),
    margin: theme.spacing(5, 0, 1.875),
    [theme.breakpoints.only('xs')]: {
      margin: theme.spacing(3, 0, 1.875),
    },
  },
  labelWithIcon: {
    color: blueGrey[600],
  },
  iconLabel: {
    '& > svg': {
      marginRight: theme.spacing(0.5),
      color: theme.palette.icon,
    },
  },
  chip: {
    color: theme.palette.icon,
    backgroundColor: theme.palette.secondary.main,
    fontWeight: 500,
    padding: theme.spacing(0, 0.5),
  },
  checkListItem: {
    '& > svg': {
      color: teal[400],
    },
  },
  carouselImageWrapper: {
    [theme.breakpoints.only('xs')]: {
      height: '20vw',
      width: '20vw',
    },
  },
  carouselImage: {
    objectFit: 'cover',
  },
}))

const ProductHeader: React.FC = (props) => {
  const classes = useStyles(props)
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const [selectedImage, setSelectedImage] = useState(MOCK_PRODUCT?.media?.[0])

  const carouselProps = {
    swiping: true,
    heightMode: 'max' as 'max',
    slidesToScroll: 1,
    slidesToShow: 4,
    defaultControlsConfig: {
      pagingDotsStyle: {
        fill: theme.palette.secondary.main,
      },
    },
    renderCenterLeftControls: ({ previousSlide }) => <PreviousButton onClick={previousSlide} />,
    renderCenterRightControls: ({ nextSlide }) => <NextButton onClick={nextSlide} />,
  }

  return (
    <Box clone mb={4}>
      <Paper elevation={0}>
        <Container maxWidth="lg">
          <Grid container>
            <Grid item xs={12} md={6}>
              <Link href="/" passHref>
                {MOCK_PRODUCT?.media?.[0]?.src ? (
                  <img
                    height={360}
                    width="100%"
                    src={selectedImage.src || MOCK_PRODUCT?.media?.[0]?.src}
                    alt="current"
                  />
                ) : (
                  <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                    <Typography>No Product Image</Typography>
                  </Box>
                )}
              </Link>
              {MOCK_PRODUCT?.media?.length > 1 && (
                <Carousel {...carouselProps}>
                  {MOCK_PRODUCT?.media?.map((image) => (
                    <Box
                      height={105}
                      width="auto"
                      key={image.src}
                      onClick={() => {
                        setSelectedImage(image)
                      }}
                      className={classes.carouselImageWrapper}
                    >
                      {/* TODO: Replace with S3 when integrating data */}
                      <img height="100%" width="100%" className={classes.carouselImage} src={image.src} alt="product" />
                    </Box>
                  ))}
                </Carousel>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              <Box pt={{ xs: 0, md: 4 }} pl={{ xs: 0, md: 4 }} pr={{ xs: 0, md: 4 }} my={1.5} pb={0}>
                <Box clone mb={2}>
                  <Typography variant="h1" color="textPrimary">
                    Grammar Activites Vol 2.8 Interactive Grammar Notebook
                  </Typography>
                </Box>

                <Box
                  clone
                  flexDirection={isSmallScreen ? 'column' : 'row'}
                  alignItems={isSmallScreen ? 'flex-start' : 'center'}
                >
                  <Grid container spacing={isSmallScreen ? 1 : 5}>
                    <Grid item>
                      <Chip label="Worksheets" size="small" className={classes.chip} />
                    </Grid>

                    <Box clone display="flex" alignItems="center">
                      <Grid item className={classes.iconLabel}>
                        <DescriptionOutlinedIcon fontSize="small" />
                        <Typography variant="h5" className={classes.labelWithIcon}>
                          {MOCK_PRODUCT.certification}
                        </Typography>
                      </Grid>
                    </Box>

                    <Box clone display="flex" alignItems="center">
                      <Grid item className={classes.iconLabel}>
                        <ScheduleOutlinedIcon fontSize="small" />
                        <Typography variant="h5" className={classes.labelWithIcon}>
                          {MOCK_PRODUCT.time} mins
                        </Typography>
                      </Grid>
                    </Box>

                    <Box clone display="flex" alignItems="center">
                      <Grid item className={classes.iconLabel}>
                        <PersonOutlineOutlinedIcon fontSize="small" />
                        <Typography variant="h5" className={classes.labelWithIcon}>
                          {MOCK_PRODUCT.level}
                        </Typography>
                      </Grid>
                    </Box>
                  </Grid>
                </Box>

                <Typography variant="h4" className={classes.productSubTitle}>
                  What you will learn
                </Typography>
                {WHAT_YOU_WILL_LEARN_LIST.map((item) => (
                  <Box
                    display="flex"
                    alignItems={isSmallScreen ? 'flex-start' : 'center'}
                    mb={1.5}
                    className={classes.checkListItem}
                  >
                    <CheckIcon />
                    <Box clone ml={0.625}>
                      <Typography variant="subtitle1">{item}</Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </Box>
  )
}

export default ProductHeader

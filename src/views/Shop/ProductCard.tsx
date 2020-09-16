import React from 'react'
import Link from 'next/link'
import { Box, Grid, IconButton, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import { S3Image } from '@onextech/gvs-kit/core'
import { formatCurrency } from '../../utils/utils'
import { ProductInterface } from '../../graphql/product'

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    textDecoration: 'none',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
  },
  image: {
    borderRadius: `10px 10px 0 0`,
    height: 220,
    width: '100%',
    objectFit: 'cover',
  },
  noImageWrapper: {
    borderRadius: `10px 10px 0 0`,
    height: 220,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bodyWrapper: {
    backgroundColor: theme.palette.common.white,
    borderRadius: `0 0 10px 10px`,
    padding: theme.spacing(2, 4, 0),
  },
  productTitle: {
    fontWeight: 600,
    fontSize: theme.typography.pxToRem(18),
    marginBottom: theme.spacing(0.5),
  },
  productDescription: {
    color: theme.palette.text.hint,
    fontSize: theme.typography.pxToRem(15),
    marginBottom: theme.spacing(0.5),
  },
  productPrice: {
    fontWeight: 700,
    fontSize: theme.typography.pxToRem(18),
  },
  cardIconButton: {
    color: theme.palette.error.dark,
    '& .MuiSvgIcon-root': {
      fontSize: theme.typography.pxToRem(30),
    },
  },
}))

interface ProductCardProps {
  product: ProductInterface
}

const ProductCard: React.FC<ProductCardProps> = (props) => {
  const { product } = props
  const { slug } = product
  const classes = useStyles()

  return (
    <Link href="/shop/[slug]" as={`/shop/${slug}`} passHref>
      <Box component="a" className={classes.root}>
        <Box className={classes.content}>
          {product?.media?.[0]?.src ? (
            <S3Image className={classes.image} src={product?.media?.[0]?.src} alt={product?.title} />
          ) : (
            <Box className={classes.noImageWrapper}>
              <Typography>No Product Image</Typography>
            </Box>
          )}
          <Box className={classes.bodyWrapper}>
            <Typography className={classes.productTitle}>{product?.title}</Typography>
            <Typography className={classes.productDescription}>{product?.category?.title}</Typography>
            <Grid container>
              <Grid item xs={1} />
              <Grid item xs={10}>
                <Typography className={classes.productPrice}>
                  {formatCurrency(product?.variants?.items?.[0]?.price)}
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <IconButton className={classes.cardIconButton}>
                  <AddCircleOutlineIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Link>
  )
}

export default ProductCard

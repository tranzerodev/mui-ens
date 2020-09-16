import React, { useMemo } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Box, Button, Grid, Typography } from '@material-ui/core'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import { makeStyles } from '@material-ui/core/styles'
import RadioButtonsField from '../../components/RadioButtonsField'
import NumberStepper from '../../components/Form/NumberField/NumberStepper'
import { ProductInterface } from '../../graphql/product'
import { formatCurrency } from '../../utils/utils'
import { getVariantAttrsFromVariants, disableOptionValuesForUnavailableVariants } from './utils'
import { VariantInterface } from '../../graphql/variant'

interface ProductFormProps {
  handleAddToCart: (variant: VariantInterface, quantity: number) => void
  product?: ProductInterface
}

interface ProductFormValues {
  [key: string]: string | number
  quantity: number
}

const useStyles = makeStyles((theme) => ({
  price: {
    color: theme.palette.text.primary,
    fontWeight: 700,
    marginBottom: theme.spacing(2.5),
    [theme.breakpoints.only('xs')]: {
      textAlign: 'center',
    },
  },
  title: {
    fontSize: theme.typography.button.fontSize,
    color: theme.palette.text.light,
    [theme.breakpoints.only('xs')]: {
      marginBottom: theme.spacing(2),
      textAlign: 'center',
    },
  },
  sectionWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(1.5),
  },
  radioButtonsFieldWrapper: {
    '& > * > button': {
      marginRight: theme.spacing(1),
      [theme.breakpoints.only('xs')]: {
        margin: theme.spacing(0, 0, 1.5),
      },
    },
  },
  numberStepperWrapper: {
    [theme.breakpoints.only('xs')]: {
      display: 'flex',
      justifyContent: 'center',
    },
  },
  actionButtonWrapper: {
    display: 'flex',
    marginTop: theme.spacing(3.5),
    [theme.breakpoints.only('xs')]: {
      justifyContent: 'center',
    },
  },
  addToCartButton: {
    padding: theme.spacing(1, 3),
    [theme.breakpoints.only('xs')]: {
      padding: theme.spacing(1, 2),
    },
    '& .MuiButton-label .MuiSvgIcon-root': {
      color: theme.palette.common.white,
    },
  },
  icon: {
    color: theme.palette.icon,
  },
}))

const defaultValues = { quantity: 1 }

const ProductForm: React.FC<ProductFormProps> = (props) => {
  const classes = useStyles()
  const { control, handleSubmit, formState, watch, errors } = useForm<ProductFormValues>({ defaultValues })
  const { isSubmitting } = formState
  const { product, handleAddToCart } = props

  const options = product?.options || []
  const variants = product?.variants?.items || []
  const values = watch()
  const variantAttrs = useMemo(() => getVariantAttrsFromVariants(variants), [variants])

  const primaryVariant = variants?.find(({ isPrimary }) => isPrimary)
  const chosenVariant =
    variants.find((variant) => {
      const { attrs } = variant
      return attrs && attrs.every(({ title, value }) => values[title] === value)
    }) || primaryVariant
  const price = chosenVariant?.price ?? 0

  const onSubmit = () => {
    handleAddToCart(chosenVariant, values.quantity)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography className={classes.price} variant="body2">
        SGD {formatCurrency(price)}
      </Typography>
      {/* Options */}
      {options?.map((option) => (
        <Grid container key={option.title} className={classes.sectionWrapper}>
          <Grid item xs={12} sm={2}>
            <Typography className={classes.title} variant="body1">
              {option.title}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={10} className={classes.radioButtonsFieldWrapper}>
            <Controller
              name={option.title}
              as={RadioButtonsField}
              control={control}
              rules={{ required: 'Required' }}
              options={disableOptionValuesForUnavailableVariants(option, variantAttrs, values)}
              error={Boolean(errors[option.title] && errors[option.title]?.message)}
              helperText={errors[option.title] && errors[option.title]?.message}
            />
          </Grid>
        </Grid>
      ))}
      {/* Quantity */}
      <Grid container className={classes.sectionWrapper}>
        <Grid item xs={12} sm={2}>
          <Typography className={classes.title} variant="body1">
            Quantity
          </Typography>
        </Grid>
        <Grid className={classes.numberStepperWrapper} item xs={12} sm={10}>
          <Controller name="quantity" as={NumberStepper} control={control} rules={{ required: 'Required' }} min={1} />
        </Grid>
      </Grid>
      {/* Actions */}
      <Box className={classes.actionButtonWrapper}>
        <Button
          startIcon={<ShoppingCartIcon className={classes.icon} />}
          variant="contained"
          color="primary"
          className={classes.addToCartButton}
          type="submit"
          disabled={isSubmitting}
        >
          Add To Cart
        </Button>
      </Box>
    </form>
  )
}

export default ProductForm

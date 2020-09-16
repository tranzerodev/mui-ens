import React, { useState, useEffect } from 'react'
import Router from 'next/router'
import validate from 'validate.js'
import clsx from 'clsx'
import { getInvoiceNumber } from '@onextech/etc-kit/utils'
import { emailOrderToCustomer } from '@onextech/etc-kit/emails'
import { useElements, useStripe } from '@stripe/react-stripe-js'
import { API } from 'aws-amplify'
import { makeStyles } from '@material-ui/core/styles'
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  TextField,
  Typography,
  Theme,
} from '@material-ui/core'
import { PaymentStatusEnum, FulfillmentStatusEnum, OrderTypeEnum } from '@onextech/etc-api'
import { useForm, Controller } from 'react-hook-form'
import { CardNumber, CardExpiry, CardCvc, StripePaymentFormWrapper } from '../../components/Form/Payment'
import { useCreateOrder } from '../../graphql/order'
import { useCurrentCart } from '../../graphql/cart'
import { useAuth } from '../../auth'
import Mail from '../../mail/Mail'
import config from '../../config'
import useUpdateDiscount from '../../graphql/discount/mutations/useUpdateDiscount'
import { DiscountInterface } from '../../graphql/discount/typings'
import {
  getDiscountAmount,
  getIsDiscountValid,
  getOrderedPrice,
  getLines,
  getEventlines,
  isTicketsInStock,
  getUpdateTicketsOrdered,
} from './utils'
import { useUpdateEvent } from '../../graphql/event'

const appConfig = config.app

interface PaymentDetailsFormProps {
  className?: string
  discount: DiscountInterface
  eventItem?: any
  billingDetails: any
  onSuccess?: () => void
  handleTicketOutOfStock?: () => void
}

const useStyles = makeStyles((theme: Theme) => ({
  form: {
    background: theme.palette.background.paper,
    padding: theme.spacing(4.5, 5.25),
    width: 'auto',
  },
  header: {
    fontWeight: 700,
    fontFamily: theme.typography.fontFamily,
  },
  field: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      flexGrow: 1,
    },
    '& input': {
      padding: theme.spacing(1.5, 0),
      fontSize: theme.typography.pxToRem(16),
    },
    '& .MuiFormLabel-root': {
      fontSize: theme.typography.pxToRem(16),
    },
  },
  buttonWrapper: {
    margin: theme.spacing(1.5, 0),
  },
  imagesWrapper: {
    display: 'flex',
    alignItems: 'center',
    '& .MuiGrid-item': {
      paddingTop: 0,
    },
  },
  image: {
    objectFit: 'contain',
    maxHeight: theme.typography.pxToRem(23),
    marginRight: theme.spacing(1.5),
  },
  altImage: {
    objectFit: 'contain',
    maxHeight: theme.typography.pxToRem(38),
    marginRight: theme.spacing(1.5),
  },
  billingAddressWrapper: {
    marginBottom: theme.spacing(2),
  },
  billingAddressLabel: {
    color: theme.palette.text.secondary,
    fontWeight: 600,
  },
  spacer: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}))

const PaymentDetailsForm: React.FC<PaymentDetailsFormProps> = (props) => {
  const { className, discount, eventItem, billingDetails, onSuccess, handleTicketOutOfStock, ...rest } = props
  const classes = useStyles()
  const { watch, control, formState, handleSubmit } = useForm()
  const isDefaultAddress = watch('isDefaultAddress')
  const billingAddress = watch('address')
  const billingZip = watch('zip')
  const billingCity = watch('city')
  const { isSubmitting } = formState

  const [loading, setLoading] = useState(false)
  const { cartItems, handleDeleteCartItem } = useCurrentCart()
  const { handleUpdateEvent } = useUpdateEvent()
  const { user } = useAuth()
  const isEvent = Boolean(eventItem)

  // Pricing
  const shipping = 6
  const subtotal = cartItems.reduce((acc, { quantity, variant }) => acc + quantity * (variant?.price ?? 0), 0)
  // Amount to be deducted from subtotal
  const isDiscountValid = getIsDiscountValid(cartItems, subtotal, discount)
  const discountAmount = isDiscountValid ? getDiscountAmount(subtotal, discount) : 0
  const total = eventItem
    ? getOrderedPrice(eventItem.event?.tickets, eventItem.values)
    : subtotal + shipping - discountAmount

  const { id: discountID, code: discountCode, redeemedUsers, redeemedCount, redeemedSales, redeemedDiscount } =
    discount || {}
  const nextRedeemedUser = { id: user?.id, title: user?.username }
  const discountInput = {
    id: discountID,
    redeemedUsers: redeemedUsers ? redeemedUsers.concat([nextRedeemedUser as any]) : [nextRedeemedUser],
    redeemedCount: redeemedCount ? redeemedCount + 1 : 1,
    redeemedSales: redeemedSales ? redeemedSales + total : total,
    redeemedDiscount: redeemedDiscount ? redeemedDiscount + discountAmount : discountAmount,
  }

  const orderInput = {
    lines: isEvent ? getEventlines(eventItem) : getLines(cartItems),
    total,
    pricing: isEvent
      ? { subtotal: total, shipping: null, total, discount: discountAmount }
      : { subtotal, shipping, total, discount: discountAmount },
    discount: { code: discountCode },
    paymentStatus: PaymentStatusEnum.paid,
    fulfillmentStatus: FulfillmentStatusEnum.unfulfilled,
    invoiceNo: getInvoiceNumber({ customerName: user?.name }),
    userID: user?.id,
    type: isEvent ? OrderTypeEnum.EVENT : OrderTypeEnum.DEFAULT,
    fulfillmentInfo: {
      customerInfo: {
        name: user?.name,
        email: user?.email,
        mobile: user?.mobile,
      },
      recipientInfo: null, // TODO: recipientInfo
      shippingAddress: user?.address,
      billingAddress: user?.address ?? user?.billingAddress,
      note: null,
    },
  }
  const stripe = useStripe()
  const elements = useElements()
  const { handleCreateOrder } = useCreateOrder()
  const { handleUpdateDiscount } = useUpdateDiscount()

  const onSubmit = async () => {
    setLoading(true)
    try {
      // Check for stock one last time
      if (isEvent && !isTicketsInStock(eventItem?.totalQuantity, eventItem?.selectedTickets, eventItem?.values)) {
        if (handleTicketOutOfStock) return handleTicketOutOfStock()
      }

      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      if (!stripe || !elements) return

      const response = await API.post('stripe', '/checkout/pay', {
        body: {
          amount: total * 100, // This is in cents i.e. $5.50
          currency: 'sgd',
        },
      })

      const { client_secret } = response

      const { firstName, email, mobile } = billingDetails

      const onPayment = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement('cardNumber'),
          billing_details: {
            name: firstName,
            email,
            phone: mobile,
            address: {
              line1: isDefaultAddress ? billingDetails.address : billingAddress,
              line2: '',
              postal_code: isDefaultAddress ? billingDetails.zip : billingZip,
              city: isDefaultAddress ? billingDetails.city : billingCity,
              // FIXME: Stripe only accepts SG, not Singapore, so will need to update
              country: 'SG',
            },
          },
        },
      })

      if (onPayment.error || onPayment.paymentIntent.status !== 'succeeded') {
        setLoading(false)
        // Show error to your customer (e.g., insufficient funds)
        console.log('jjj: ', onPayment.error.message)
      }

      // Fire order email
      const onCreate = await handleCreateOrder(orderInput)
      if (isDiscountValid) {
        await handleUpdateDiscount(discountInput)
      }

      const {
        errors,
        data: { createOrder: createdOrder },
      } = onCreate

      if (isEvent) {
        handleUpdateEvent({
          id: eventItem?.event?.id,
          tickets: getUpdateTicketsOrdered(
            eventItem?.values,
            eventItem?.event?.tickets,
            onCreate?.data?.createOrder?.id
          ),
        })
        // TODO: Email for tickets order
      } else {
        Mail.sendTransaction(emailOrderToCustomer(createdOrder, { appConfig }))
        await Promise.all(cartItems.map(({ id }) => handleDeleteCartItem({ id })))
      }

      if (onSuccess) return onSuccess()
    } catch (err) {
      console.log('Error at PaymentDetailsForm.handleSubmit', err)
    }
  }

  return (
    <form {...rest} className={clsx(classes.form, className)} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" className={classes.header}>
            Secure Credit Card Payment
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.imagesWrapper}>
          <img src="payments/visa-logo.png" alt="visa-logo" className={classes.image} />
          <img src="payments/mastercard-logo.png" alt="mastercard-logo" className={classes.altImage} />
          <img src="payments/american-express-logo.png" alt="american-express-logo" className={classes.image} />
        </Grid>
        <Grid item xs={12} md={5} className={classes.field}>
          <CardNumber />
        </Grid>
        <Grid item xs={12} md={5} className={classes.field}>
          <Controller
            as={TextField}
            control={control}
            fullWidth
            label="Card Name"
            name="cardName"
            placeholder="Enter your card name"
            required
          />
        </Grid>
        <Grid item xs={12} md={5} className={classes.field}>
          <CardExpiry />
        </Grid>
        <Grid item xs={12} md={5} className={classes.field}>
          <CardCvc />
        </Grid>

        {/* Billing Address Confirmation */}
        <Grid item xs={12}>
          <Controller
            control={control}
            name="isDefaultAddress"
            defaultValue
            as={
              <FormControlLabel
                control={<Checkbox checked={isDefaultAddress} name="isDefaultAddress" color="primary" />}
                label={
                  <Typography variant="subtitle1" className={classes.billingAddressLabel}>
                    My billing address is the same as the delivery address
                  </Typography>
                }
              />
            }
          />

          {/* Billing Address Fields */}
          {!isDefaultAddress && (
            <Grid container spacing={3}>
              <Grid item xs={12} className={classes.field}>
                <Controller
                  as={TextField}
                  control={control}
                  fullWidth
                  label="Billing Address"
                  name="address"
                  placeholder="Enter your address"
                />
              </Grid>
              <Grid item xs={12} md={6} className={classes.field}>
                <Controller
                  as={TextField}
                  control={control}
                  fullWidth
                  label="Billing Postal Code"
                  name="zip"
                  placeholder="Enter your postal code"
                />
              </Grid>
              <Grid className={classes.spacer} item md={6} />
              <Grid item xs={12} md={6} className={classes.field}>
                <Controller
                  as={TextField}
                  control={control}
                  fullWidth
                  label="City"
                  name="city"
                  placeholder="Enter your city"
                />
              </Grid>
            </Grid>
          )}
        </Grid>

        {/* Confirm and Pay */}
        <Grid item xs={12}>
          <Box className={classes.buttonWrapper}>
            <Button variant="contained" color="primary" type="submit" disabled={isSubmitting}>
              Confirm &amp; Pay
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  )
}

const PaymentDetailsFormWrapper = (props) => {
  return (
    <StripePaymentFormWrapper>
      <PaymentDetailsForm {...props} />
    </StripePaymentFormWrapper>
  )
}

export default PaymentDetailsFormWrapper

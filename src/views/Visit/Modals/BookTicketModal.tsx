import React, { useState, useEffect } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Router from 'next/router'
import PortalModal from '../../../components/PortalModal'
import BookTicketCard from './BookTicketCard'
import CustomerDetailsForm from '../../Checkout/CustomerDetailsForm'
import PaymentDetailsFormWrapper from '../../Checkout/PaymentDetailsForm'
import { DiscountInterface } from '../../../graphql/discount/typings'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.common.white,
    borderRadius: 4,
    boxShadow: theme.shadows[0],
    '& .MuiDivider-root': {
      display: 'none',
    },
    '& .MuiCardContent-root': {
      padding: 0,
    },
    [theme.breakpoints.down('xs')]: {
      width: 350,
    },
  },
}))

const EVENT_VIEWS = { TICKETS: 'TICKETS', CUSTOMER_DETAILS: 'CUSTOMER_DETAILS', PAYMENT: 'PAYMENT' }

type BookTicketModalProps = React.ComponentProps<typeof PortalModal>

const BookTicketModal: React.FC<BookTicketModalProps> = (props) => {
  const classes = useStyles()
  const [view, setView] = useState(EVENT_VIEWS.TICKETS)
  const [eventItem, setEventItem] = useState(null)
  const [discount, setDiscount] = useState<DiscountInterface>()

  const [billingDetails, setBillingDetails] = useState(null)

  const onSuccess = () => {
    Router.push('/order/success')
  }

  const handleUpdateBillingDetail = (billingDetails) => {
    setView(EVENT_VIEWS.PAYMENT)
    setBillingDetails(billingDetails)
  }

  const handleTicketOutOfStock = () => {
    setView(EVENT_VIEWS.TICKETS)
  }

  const handleUpdateEventItem = (eventItem) => {
    setEventItem(eventItem)
  }

  const renderView = (view) => {
    switch (view) {
      case EVENT_VIEWS.TICKETS:
        return <BookTicketCard handleUpdateEventItem={handleUpdateEventItem} handleNextView={setView} />
      case EVENT_VIEWS.CUSTOMER_DETAILS:
        return <CustomerDetailsForm isEvent handleUpdateBillingDetail={handleUpdateBillingDetail} />
      case EVENT_VIEWS.PAYMENT:
        return (
          <PaymentDetailsFormWrapper
            eventItem={eventItem}
            billingDetails={billingDetails}
            discount={discount}
            handleTicketOutOfStock={handleTicketOutOfStock}
            onSuccess={onSuccess}
          />
        )
      default:
        return <BookTicketCard handleUpdateEventItem={handleUpdateEventItem} handleNextView={setView} />
    }
  }

  return (
    <PortalModal width={900} className={classes.root} {...props}>
      {renderView(view)}
    </PortalModal>
  )
}

export default BookTicketModal

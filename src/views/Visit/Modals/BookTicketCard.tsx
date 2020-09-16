import React, { useState } from 'react'
import { Button, Typography, Box, Grid, TextField } from '@material-ui/core'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Autocomplete } from '@material-ui/lab'
import { Controller, useForm, FieldError } from 'react-hook-form'
import { S3Image } from '@onextech/gvs-kit/core'
import { DatePicker } from '@material-ui/pickers'
import { UpdateEventInput } from '@onextech/etc-api'
import NumberStepper from '../../../components/Form/NumberField/NumberStepper'
import { useGetEvent, EventInterface } from '../../../graphql/event'
import { useAuth } from '../../../auth'
import config from '../../../config'
import { getTotalQuantity, isTicketsInStock } from '../utils'

const useStyles = makeStyles((theme) => ({
  // Temporary fix to solve large options font
  '@global': {
    '.MuiAutocomplete-option': {
      fontSize: theme.typography.pxToRem(16),
    },
  },
  root: {
    padding: theme.spacing(8, 7),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(4),
    },
  },
  image: {
    width: '100%',
  },
  price: {
    marginTop: theme.spacing(2),
    fontSize: theme.typography.pxToRem(18),
    fontWeight: 600,
  },
  listTitle: {
    marginTop: theme.spacing(2),
    fontSize: theme.typography.pxToRem(16),
    fontWeight: 600,
  },
  bulletPointsWrapper: {
    marginTop: theme.spacing(0.5),
  },
  fieldsWrapper: {
    paddingRight: theme.spacing(15),
    [theme.breakpoints.down('xs')]: {
      paddingRight: theme.spacing(0),
    },
  },
  selectorTitle: {
    marginTop: theme.spacing(2.5),
    marginBottom: theme.spacing(1.5),
    fontSize: theme.typography.pxToRem(14),
    fontWeight: 600,
    color: theme.palette.primary.main,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  selectorWrapper: {
    '& .MuiInputBase-input': {
      fontSize: theme.typography.pxToRem(16),
    },
    '& .MuiOutlinedInput-root': {
      borderRadius: 4,
    },
    '& .MuiInputLabel-root': {
      fontSize: theme.typography.pxToRem(16),
    },
  },
  stepperWrapper: {
    marginTop: theme.spacing(1.5),
  },
  footer: {
    margin: theme.spacing(2, 0, 3),
    fontStyle: 'italic',
  },
  buyButton: {
    padding: theme.spacing(1.25, 4),
  },
  cartButton: {
    marginLeft: theme.spacing(2),
    padding: theme.spacing(1.25, 2.5),
    '& .MuiSvgIcon-root': {
      color: theme.palette.text.hint,
    },
  },
  error: {
    margin: theme.spacing(0, 0, 2),
    color: theme.palette.error.main,
  },
}))

interface BookTicketFormValues {
  eventDate: any
  errorField: string
}

interface EventItemInterface {
  event: EventInterface
  selectedTickets: UpdateEventInput['tickets']
  totalQuantity: number
  values: BookTicketFormValues
}

interface BookTicketCardProps {
  handleNextView?: (string) => void
  handleUpdateEventItem?: (EventItemInterface) => void
}

const BookTicketCard: React.FC<BookTicketCardProps> = (props) => {
  const { handleNextView, handleUpdateEventItem } = props
  const classes = useStyles()
  const DEFAULT_TIMESLOT_OPTIONS = [
    '0900 - 1000',
    '1000 - 1100',
    '1300 - 1400',
    '1400 - 1500',
    '1500 - 1600',
    '1600 - 1700',
  ]
  const { user, openLoginModal } = useAuth()

  const { setError, clearError, control, handleSubmit, formState, watch, errors } = useForm<BookTicketFormValues>()
  const { isSubmitting } = formState
  const values = watch()

  // TODO: Get event by event key field (need update schema)
  const { event } = useGetEvent({ variables: { id: config.eventID } })

  const [ticketList, setTicketList] = useState([])

  const onSubmit = () => {
    if (!user?.id) {
      return openLoginModal()
    }
    const stockCount = ticketList?.[0]?.stockCount ?? 0
    const totalQuantity = getTotalQuantity(values)

    if (totalQuantity > stockCount) {
      return setError('errorField', 'exceeded', `Total quantity cannot exceed ${stockCount}`)
    }

    if (totalQuantity < 1) {
      return setError('errorField', 'zero', 'Total quantity cannot be zero')
    }

    if (!isTicketsInStock(totalQuantity, ticketList, values)) {
      return setError('errorField', 'outofstock', 'Sorry, tickets are out of stock')
    }

    clearError('errorField')

    const eventItem = {
      values,
      selectedTickets: ticketList,
      event,
      totalQuantity,
    }

    if (handleUpdateEventItem) handleUpdateEventItem(eventItem)
    if (handleNextView) handleNextView('CUSTOMER_DETAILS')
  }

  const handleTimeslotChange = (e, values) => {
    const tickets = event?.tickets?.filter((ticket) => ticket?.title.includes(values))
    setTicketList(tickets)
  }

  return (
    <>
      {event && (
        <Box className={classes.root}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={5}>
                <S3Image className={classes.image} path={event.media?.[0]?.src} />
              </Grid>
              <Grid item xs={12} sm={7}>
                <Typography variant="h4">{event.title}</Typography>
                <Typography className={classes.price}>{event.subtitle}</Typography>
                <Typography className={classes.listTitle}>Includes</Typography>
                <Box className={classes.bulletPointsWrapper}>
                  {event.features?.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </Box>
                <Box className={classes.fieldsWrapper}>
                  <Typography className={classes.selectorTitle}>Tour Date</Typography>
                  <Controller
                    as={
                      <DatePicker
                        autoOk
                        value=""
                        onChange={() => null}
                        fullWidth
                        className={classes.selectorWrapper}
                        inputVariant="outlined"
                        format="DD/MM/YY"
                      />
                    }
                    defaultValue={new Date()}
                    control={control}
                    name="eventDate"
                  />
                  <Typography className={classes.selectorTitle}>Tour Timeslot</Typography>
                  <Autocomplete
                    className={classes.selectorWrapper}
                    id="time-selector"
                    options={DEFAULT_TIMESLOT_OPTIONS}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        defaultValue="Select Timeslot"
                        placeholder="Select Timeslot"
                      />
                    )}
                    onChange={handleTimeslotChange}
                  />
                  {Boolean(ticketList?.length) &&
                    ticketList.map((ticket) => (
                      <Box key={ticket?.id}>
                        <Typography className={classes.selectorTitle}>{ticket?.title}</Typography>
                        <Controller
                          name={ticket?.title}
                          as={NumberStepper}
                          control={control}
                          min={0}
                          max={ticket?.stockCount}
                          defaultValue={0}
                        />
                      </Box>
                    ))}
                  <Controller
                    as={<TextField />}
                    control={control}
                    name="errorField"
                    error={errors.errorField}
                    helperText={(errors.errorField as FieldError)?.message}
                    fullWidth
                    disabled
                  />
                  <Typography variant="subtitle2" className={classes.footer}>
                    *Children tickets are complimentary
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.buyButton}
                  type="submit"
                  disabled={isSubmitting}
                >
                  Buy Now
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      )}
    </>
  )
}

export default BookTicketCard

import React from 'react'
import { Button, Grid, TextField, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { grey } from '@material-ui/core/colors'

interface SearchBarProps {
  handleSearch?: () => void
  placeholder?: string
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
  },
  searchField: {
    width: '100%',
    '& > .MuiOutlinedInput-root': {
      borderRadius: '4px 0 0 4px',
    },
  },
  input: {
    backgroundColor: theme.palette.common.white,
    '&::placeholder': {
      fontSize: theme.typography.body2.fontSize,
      color: theme.palette.text.light,
    },
  },
  buttonWrapper: {
    display: 'flex',
  },
  button: {
    width: '100%',
    borderRadius: '0 4px 4px 0',
    backgroundColor: grey[900],
  },
}))

const SearchBar: React.FC<SearchBarProps> = (props) => {
  const { handleSearch, placeholder = 'Start Searching...' } = props
  const classes = useStyles()

  return (
    <Grid container className={classes.root}>
      <Grid item xs={8} md={10}>
        <TextField
          className={classes.searchField}
          InputProps={{ className: classes.input }}
          variant="outlined"
          placeholder={placeholder}
        />
      </Grid>
      <Grid className={classes.buttonWrapper} item xs={4} md={2}>
        <Button className={classes.button} variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
      </Grid>
    </Grid>
  )
}

export default SearchBar

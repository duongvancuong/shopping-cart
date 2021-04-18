import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';

import { useShoppingCart } from '../hooks/product-context';
import AlertMessage from '../components/AlertMessage';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginBottom: 10,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  oldPrice: {
    textDecoration: 'line-through'
  },
  textField: {
    width: 50,
  },
}));

export default function Cart({ cart }) {
  const classes = useStyles();
  const [alter, setAlert] = useState(false);
  const { removeItem, incrementItem, decrementItem } = useShoppingCart();

  const hanldeOnClickAddToCart = () => {
    if(cart.number === cart.quantity) {
      setAlert(true);
    } else {
      incrementItem(cart);
    }
  };

  const handleClose = (_, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlert(false);
  };

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.cover}
        image="https://material-ui.com/static/images/cards/paella.jpg"
        title="Live from space album cover"
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            { cart.name }
          </Typography>
          <Chip color="primary" variant="outlined" size="small" label={`${cart.category}`} />
          <Typography variant="subtitle1" color="textSecondary">
            Quantity available: { cart.quantity - cart.number }
          </Typography>
          <Typography className={classes.oldPrice} variant="subtitle1" color="textSecondary">
            { cart.price.old && `£${cart.price.old}` }
          </Typography>
          <Typography variant="h6" color="error">
            £{ cart.price.current }
          </Typography>
        </CardContent>
        <div className={classes.controls}>
          <ButtonGroup color="primary">
            <Button onClick={() => decrementItem(cart)}>
              <RemoveCircleOutlineIcon />
            </Button>
            <TextField
              className={classes.textField}
              size="small"
              variant="outlined"
              value={cart.number}
              disabled
            />
            <Button onClick={() => hanldeOnClickAddToCart()}>
              <AddCircleIcon />
            </Button>
          </ButtonGroup>
          <IconButton aria-label="previous" onClick={() => removeItem(cart)}>
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
      <AlertMessage
        open={alter}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        severity="error"
      >
        You can not add more than the quantity available !!!
      </AlertMessage>
    </Card>
  );
}

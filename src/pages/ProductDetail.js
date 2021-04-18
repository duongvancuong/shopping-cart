import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';

import { useSelector, useShoppingCart } from "../hooks/product-context";
import AlertMessage from '../components/AlertMessage';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    marginTop: 50,
    width: 1000,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 300,
    height: 300,
  },
  textField: {
    width: 50,
  },
  oldPrice: {
    textDecoration: 'line-through'
  },
}));

export default function ProductDetal() {
  const [item, setItem] = useState(null);
  const [alter, setAlert] = useState(false);
  let [numberOfItems, setNumberOfItems] = useState(0);
  const [quantityAvailable, setQuantityAvailable] = useState(0);
  const classes = useStyles();
  const products = useSelector("products");
  const { addToCart } = useShoppingCart();
  const { id } = useParams();

  useEffect(() => {
    const _item = products.find((i) => i.id.toString() === id);
    if(_item) {
        setItem(_item);
        setQuantityAvailable(_item.quantity);
        setNumberOfItems(0);
    }
  }, [id, products]);

  useEffect(() => {
    if(item) {
      if(item.quantity - numberOfItems > 0) {
        setQuantityAvailable(item.quantity - numberOfItems);
      } else {
        setQuantityAvailable(0);
      }
    }
  }, [numberOfItems, item]);

  const handleOnChange = (evt) => {
    if (/^\d+$/.test(evt.target.value)) {
      setNumberOfItems(parseInt(evt.target.value));
    }
  };

  const handleOnClickAddToCart = () => {
    if(numberOfItems > item.quantity) {
      setAlert(true);
    } else {
      numberOfItems > 0 && addToCart({...item, number: numberOfItems});
    }
  };

  const handleClose = (_, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlert(false);
  };

  return (
    <Container className={classes.root} maxWidth="lg">
      { item ? (
        <>
          <Card className={classes.root}>
            <CardMedia
              className={classes.cover}
              image="https://material-ui.com/static/images/cards/paella.jpg"
              title="Live from space album cover"
            />
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography component="h5" variant="h5">
                  { item.name }
                </Typography>
                <Chip color="primary" variant="outlined" size="small" label={`${item.category}`} />
                <Typography variant="button" display="block" gutterBottom>
                  {
                    item.quantity > 0 ? 
                    `Quantity Available: ${quantityAvailable}` :
                    <Chip color="secondary" size="small" label="Out of Stock" />
                  }
                </Typography>
                <Typography className={classes.oldPrice} color="textSecondary">
                  { item.price.old && `£${item.price.old}` }
                </Typography>
                <Typography variant="h5" color="error">
                  £{ item.price.current }
                </Typography>
                {
                  item.category === "Drinks" && (
                    <Typography variant="caption" display="block" gutterBottom color="primary">
                      Get 10% off bulk drinks – any drinks are 10% off the listed price (including already reduced items) when buying 10 or more
                    </Typography>
                  )
                }
                {
                  item.category === "Baking/Cooking Ingredients" && (
                    <Typography variant="caption" display="block" gutterBottom color="primary">
                      £5.00 off your order when spending £50.00 or more on Baking/Cooking Ingredients
                    </Typography>
                  )
                }
              </CardContent>
              { item.quantity > 0 &&
                <Box display="flex" p={1}>
                  <Box p={1}>
                    <ButtonGroup color="primary">
                      <Button onClick={() =>  numberOfItems > 0 && setNumberOfItems(() => numberOfItems-= 1)}>
                        <RemoveCircleOutlineIcon />
                      </Button>
                      <TextField
                        className={classes.textField}
                        size="small"
                        variant="outlined"
                        value={numberOfItems}
                        onChange={handleOnChange}
                      />
                        <Button onClick={() => quantityAvailable > 0 && setNumberOfItems(() => numberOfItems+= 1)}>
                        <AddCircleIcon />
                      </Button>
                    </ButtonGroup>
                  </Box>
                  <Box p={1} flexShrink={1}>
                    <Button
                      variant="contained"
                      size="large"
                      color="primary"
                      onClick={handleOnClickAddToCart}
                    >
                      Add To Cart
                    </Button>
                  </Box>
                </Box>
              }
            </div>
          </Card>
          <AlertMessage
            open={alter}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            severity="error"
          >
            You can not add more than the quantity available !!!
          </AlertMessage>
        </>
      ) : (
        <Alert icon={false} severity="error">
          The product is not found!
        </Alert>
      ) }
    </Container>
  );
};


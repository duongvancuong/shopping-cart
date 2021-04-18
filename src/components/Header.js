import React, { useRef, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CssBaseline from '@material-ui/core/CssBaseline';
import HomeIcon from '@material-ui/icons/Home';

import { useSelector } from "../hooks/product-context";
import AlertMessage from '../components/AlertMessage';

const useStyles = makeStyles((theme) =>({
  root: {
    flexGrow: 1,
  },
  menuButton: {
      marginRight: theme.spacing(2),
    },
  title: {
    flexGrow: 1,
  },
  alter: {
    marginTop: 50,
  }
}));


export default function Header() {
  const classes = useStyles();
  const [numberOfItems, setNumberOfItems] = useState(0);
  const [alter, setAlert] = useState(false);
  const shopping_cart = useSelector("shopping_cart");
  const history = useHistory();
  const prevCountRef = useRef();

  useEffect(() => {
    prevCountRef.current = numberOfItems;

    if(shopping_cart.length === 0) {
      setNumberOfItems(0);
    } else {
       setNumberOfItems(shopping_cart.reduce((n, {number}) => n + number, 0));
    }
  }, [shopping_cart]);

  useEffect(() => {
    if(numberOfItems > 0 && numberOfItems > prevCountRef.current) {
      setAlert(true);
    }
  }, [numberOfItems]);

  const handleClose = (_, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlert(false);
  };

  return (
    <>
      <CssBaseline />
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => history.push('/')}>
              <HomeIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Shopping Cart
            </Typography>
            <IconButton onClick={() => history.push('/shopping-cart')} color="inherit">
              <Badge badgeContent={`${numberOfItems}`} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <AlertMessage
          open={alter}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          severity="success"
        >
          New Item added to cart !!
        </AlertMessage>
      </div>
    </>
  );
};


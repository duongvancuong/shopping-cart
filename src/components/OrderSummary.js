import React, { useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import { useSelector, useOrderSummary } from "../hooks/product-context";
import Voucher from '../components/Voucher';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 600,
    backgroundColor: theme.palette.background.paper,
  },
  price: {
    textAlign: "end",
  }
}));

export default function OrderSummary() {
  const classes = useStyles();
  const shopping_cart = useSelector("shopping_cart");
  const {
    grandTotal,
    orderSubtotal,
    discountBulkDrinksPrices,
    discountSpendingMorePrices,
    discountVoucher
  } = useOrderSummary();

  const numberOfItems = useMemo(() => {
    if(shopping_cart.length === 0) {
      return 0;
    } else {
      return shopping_cart.reduce((n, {number}) => n + number, 0)
    }
  }, [shopping_cart]);

  return (
    <List component="nav" position="fixed" className={classes.root} aria-label="mailbox folders">
      <Divider />
      <ListItem>
        <ListItemText primary={`Order Subtotal: (${numberOfItems} items)`} />
        <ListItemText primary={`£${orderSubtotal}`} className={classes.price} />
      </ListItem>
      <Divider />
      <Voucher />
      <Divider />
      <ListItem divider>
        <ListItemText primary="Sales 10% off bulk drinks:" />
        <ListItemText primary={`- £${discountBulkDrinksPrices}`} className={classes.price} />
      </ListItem>
      <ListItem divider>
        <ListItemText primary="Sales spending £50.00 or more on Baking/Cooking Ingredients:" />
        <ListItemText primary={`- £${discountSpendingMorePrices}`} className={classes.price} />
      </ListItem>
      <ListItem divider>
        <ListItemText primary="Total order value when spending £100.00 or more and using the code" />
        <ListItemText primary={`- £${discountVoucher}`} className={classes.price} />
      </ListItem>
      <Divider light />
      <ListItem >
        <ListItemText primary="Grand Total:" />
        <ListItemText primary={`£${grandTotal}`} className={classes.price} />
      </ListItem>
    </List>
  );
}


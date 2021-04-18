import React, { useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Alert from '@material-ui/lab/Alert';

import { useSelector } from "../hooks/product-context";
import Cart from '../components/Cart';
import OrderSummary from '../components/OrderSummary';

const useProductStyles = makeStyles((theme) => ({
  root: {
    marginTop: 50,
  },
  section1: {
    padding: theme.spacing(3, 2),
  },
}));

export default function ShoppingCartPage() {
  const productClasses = useProductStyles();
  const shopping_cart = useSelector("shopping_cart");

  const hasCart = useMemo(() => shopping_cart.length, [shopping_cart]);

  return (
    <>
      <Container className={productClasses.root} maxWidth="lg">
        <Typography variant="body1" display="block" gutterBottom color="primary">
          £20.00 off your total order value when spending £100.00 or more and using the code
        </Typography>
      { hasCart > 0 ? (
          <Grid container justify="center" spacing={3}>
            <Grid item xs={6}>
              <Paper>
                {shopping_cart.map((value) => (
                  <Cart cart={value} key={value.id} />
                ))}
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper>
                <Typography variant="h6" className={productClasses.section1}>
                  Order Summary
                </Typography>
                <OrderSummary />
              </Paper>
            </Grid>
          </Grid>
      ) : (
        <Alert icon={false} severity="success">
          Your shopping cart is empty.
        </Alert>
      ) }
      </Container>
    </>
  );
};


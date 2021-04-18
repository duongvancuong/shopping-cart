import React from 'react';
import {  makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import { useSelector } from "../hooks/product-context";

import Product from '../components/Product';

const useProductStyles = makeStyles(() => ({
  root: {
    marginTop: 50,
  },
}));

export default function Products() {
  const productClasses = useProductStyles();
  const products = useSelector("products");

  return (
    <Container className={productClasses.root} maxWidth="lg">
      <Grid container justify="center" spacing={3}>
        {products.map((value) => (
          <Grid key={value.id} item sm={3} xs={6}>
            <Product product={value} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}


import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    height: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
    margin: 10,
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  oldPrice: {
    textDecoration: 'line-through'
  },
}));

export default function Product(props) {
  const classes = useStyles();
  const history = useHistory();
  const { product }= props;

  return (
    <CardActionArea onClick={()=> history.push(`/products/${product.id}`)}>
      <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image="https://material-ui.com/static/images/cards/paella.jpg"
          title="Paella dish"
        />
        <CardContent>
          <Typography variant="body1" gutterBottom>
            { product && product.name}
          </Typography>
          <Chip color="primary" variant="outlined" size="small" label={`${product.category}`} />
          <Typography variant="button" display="block" gutterBottom>
            {
              product && product.quantity > 0 ? 
              `Quantity Available: ${product.quantity}` :
              <Chip color="secondary" size="small" label="Out of Stock" />
            }
          </Typography>
          <div>
            <Typography variant="h5" gutterBottom color="error" display="inline">
              { product && `£${ product.price.current } ` }
            </Typography>
            <Typography className={classes.oldPrice} variant="subtitle1" display="inline">
              { product.price.old && `£${product.price.old}` }
            </Typography>
          </div>
        </CardContent>
      </Card>
    </CardActionArea>
  );
}


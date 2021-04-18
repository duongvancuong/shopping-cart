import React from 'react';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  alter: {
    marginTop: 50,
  },
}));

export default function AlertMessage(props) {
  const classes = useStyles();
  const { open, onClose, children, anchorOrigin, severity } = props;

  return(
    <Snackbar
      open={open}
      autoHideDuration={3000}
      anchorOrigin={anchorOrigin}
      className={classes.alter}
      onClose={onClose}
    >
      <Alert onClose={onClose} elevation={6} variant="filled" severity={severity}>
        { children }
      </Alert>
    </Snackbar>
  );
};

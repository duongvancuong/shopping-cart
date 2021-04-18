import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';

import { useShoppingCart, useSelector } from '../hooks/product-context';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '25ch',
    margin: theme.spacing(1),
  },
  textVoucher: {
    textAlign: "end",
  }
}));

export default function VoucherDialog() {
  const [open, setOpen] = React.useState(false);
  const [code, setCode] = React.useState("");
  const [isSubmuit, setSubmit] = React.useState(false);
  const { verifyVoucher } = useShoppingCart();
  const isValidVourcher = useSelector('valid_voucher');
  const voucherCode = useSelector("voucher");
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCode("");
  };

  const handleOnChange = (e) => {
    setSubmit(false);
    setCode(e.target.value);
  }

  return (
    <>
      {
        isValidVourcher ?
          <ListItem divider>
            <ListItemText primary="Voucher:" />
            <ListItemText className={classes.textVoucher}>
              <Chip color="primary" variant="outlined" size="small" label={`${voucherCode}`} />
            </ListItemText>
          </ListItem> : (
          <div classes={classes.root}>
            <ListItem>
              <ListItemText primary="Select or enter Promotion" />
              <Button size="small" color="primary" onClick={handleClickOpen}>
                Enter Promotion
              </Button>
            </ListItem>
            <Dialog maxWidth="xs" fullWidth={true} onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
              <DialogTitle id="simple-dialog-title"> Promotion Discount Code </DialogTitle>
              <DialogContent>
                <ListItem>
                  <ListItemText>
                    <TextField
                      id="outlined-start-adornment"
                      classes={classes.textField}
                      InputProps={{
                        startAdornment: <InputAdornment position="start"><ConfirmationNumberIcon /></InputAdornment>,
                      }}
                      variant="outlined"
                      onChange={handleOnChange}
                    />
                  </ListItemText>
                  <ListItemText className={classes.textVoucher}>
                    <Button
                      variant="contained"
                      color="primary"
                      disableElevation
                      onClick={() => {
                        verifyVoucher(code);
                        setSubmit(true);
                      }}
                    >
                      Apply
                    </Button>
                  </ListItemText>
                </ListItem>
                {
                  !isValidVourcher && isSubmuit && code &&
                  <Typography variant="caption" display="block" gutterBottom color="error">
                    { `Invalid ${code} Coupon !!` }
                  </Typography>
                }
              </DialogContent>
            </Dialog>
          </div>
        )
      }
    </>
  );
};

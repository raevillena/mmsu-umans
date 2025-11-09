import React from 'react'
import {Snackbar, Alert } from '@mui/material/';
import { useSelector, useDispatch } from "react-redux";
import { hideSnackbar } from '../store/slices/snackbarSlice';

const AlertSnackbar = () => {
  const dispatch = useDispatch();
  const { open, message, severity } = useSelector((state) => state.snackbar);

  const handleClose = (_, reason) => {
    if (reason !== "clickaway") {
      dispatch(hideSnackbar());
    }
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert onClose={handleClose} severity={severity} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AlertSnackbar;
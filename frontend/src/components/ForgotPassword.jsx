import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  OutlinedInput,
  InputAdornment,
  Box,
  Typography,
  Avatar,
} from '@mui/material';
import LockResetIcon from '@mui/icons-material/LockReset';

import { requestPasswordReset } from '../api/authApi';
import { useDispatch } from 'react-redux';
import { showSnackbar } from '../store/slices/snackbarSlice';

function ForgotPassword({ open, handleClose }) {
  const dispatch = useDispatch();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      slotProps={{
        paper: {
          component: 'form',
          onSubmit: async (event) => {
            event.preventDefault();
            const formData = new FormData(event.target);
            const email = formData.get('email');

            try {
              const response = await requestPasswordReset(email);
              dispatch(showSnackbar({ message: "Reset link sent!", severity: "success" }));
            } catch (error) {
              dispatch(showSnackbar({ message: error.message || "Failed to send reset link.", severity: "error" }));
            }
            handleClose();
          },
          sx: {
            backgroundImage: 'none',
            px: 4,
            py: 3,
            minWidth: 400,
          },
        }, 
      }}
    >
      <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
        <Avatar sx={{ bgcolor: 'primary.main', mb: 1, width: 56, height: 56 }}>
          <LockResetIcon fontSize="large" />
        </Avatar>
        <Typography variant="h6" fontWeight="bold">
          Reset your password
        </Typography>
      </Box>

      <DialogContent
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <DialogContentText sx={{ textAlign: 'center' }}>
          Enter your account's email address and we’ll send you a password reset link.
        </DialogContentText>

        <OutlinedInput
          autoFocus
          required
          id="email"
          name="email"
          placeholder="Email address"
          type="email"
          fullWidth
          startAdornment={
            <InputAdornment position="start">
              <LockResetIcon color="action" />
            </InputAdornment>
          }
        />
      </DialogContent>

      <DialogActions sx={{ pt: 2, px: 3, justifyContent: 'center' }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" type="submit">
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ForgotPassword.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default ForgotPassword;

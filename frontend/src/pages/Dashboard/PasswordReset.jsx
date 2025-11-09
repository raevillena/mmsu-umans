import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  InputAdornment,
  IconButton,
  Grid2
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import TextField from '@mui/material/TextField';
import { useDispatch } from 'react-redux';
import { showSnackbar } from '../../store/slices/snackbarSlice';
import { resetPasswordWithToken } from '../../api/authApi';

import { passwordResetSchema } from '../../utils/validationSchema';

const PasswordReset = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(passwordResetSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await resetPasswordWithToken(token, data.password);
      dispatch(showSnackbar({ message: response.message || 'Password reset successful', severity: 'success' }));
      reset();
      navigate('/login');
    } catch (error) {
      dispatch(showSnackbar({ message: error?.response?.data?.message || 'Reset failed', severity: 'error' }));
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', px: 2, width:'100vw' }}>
      <Box sx={{ maxWidth: 500, width: '100%', p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Reset Your Password
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid2 container spacing={2}>
            <Grid2 xs={12}>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    type={showPassword ? 'text' : 'password'}
                    label="New Password"
                    fullWidth
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Grid2>
            <Grid2 xs={12}>
              <Controller
                name="confirmPassword"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    type={showPassword ? 'text' : 'password'}
                    label="Confirm Password"
                    fullWidth
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message}
                  />
                )}
              />
            </Grid2>
            <Grid2 xs={12}>
              <Button type="submit" fullWidth variant="contained">
                Reset Password
              </Button>
            </Grid2>
          </Grid2>
        </form>
      </Box>
    </Box>
  );
};

export default PasswordReset;

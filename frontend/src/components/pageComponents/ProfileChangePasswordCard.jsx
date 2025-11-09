import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Divider,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';

import { useDispatch, useSelector } from "react-redux";

//import validation resources
import { useForm, Controller  } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { changePasswordSchema } from "../../utils/validationSchema";

//functions
import { changePassword } from "../../store/slices/usersSlice";


const ProfileChangePasswordCard = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user ) || null

  const onSubmit = async (data) => {
    try{
      const response = await dispatch(changePassword({id: user.id , data: {...data, email: user.email}})).unwrap()
      if(response.success === "ok"){
        reset();
      }
    }catch (error) {
      console.error("Failed to change password:", error);
    }
  };

  const { handleSubmit, control, formState: { errors }, reset } = useForm({
    defaultValues: {
      password: '',
      newPassword: '',
      confirmPassword: '',
    },
    resolver: yupResolver(changePasswordSchema),
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const toggleVisibility = (key) => {
    setShowPassword((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div>
        <Card sx={{ boxShadow: 3, backgroundColor: "#ffffff" }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                Change Password
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ maxWidth: 500, mx: 'auto' }}>
                  <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type={showPassword.current ? 'text' : 'password'}
                      label="Current Password"
                      fullWidth
                      margin="normal"
                      error={!!errors.password}
                      helperText={errors.password?.message}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => toggleVisibility('current')}
                              edge="end"
                            >
                              {showPassword.current ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />

                <Controller
                  name="newPassword"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type={showPassword.new ? 'text' : 'password'}
                      label="New Password"
                      fullWidth
                      margin="normal"
                      error={!!errors.newPassword}
                      helperText={errors.newPassword?.message}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => toggleVisibility('new')}
                              edge="end"
                            >
                              {showPassword.new ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />

                <Controller
                  name="confirmPassword"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type={showPassword.confirm ? 'text' : 'password'}
                      label="Confirm Password"
                      fullWidth
                      margin="normal"
                      error={!!errors.confirmPassword}
                      helperText={errors.confirmPassword?.message}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => toggleVisibility('confirm')}
                              edge="end"
                            >
                              {showPassword.confirm ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Change Password
                </Button>
              </Box>
            </CardContent>
          </Card>
    </div>
  )
}

export default ProfileChangePasswordCard

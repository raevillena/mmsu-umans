import React, { useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, IconButton, InputAdornment } from "@mui/material";
import { Autorenew as GenerateIcon, PersonAdd, Visibility, VisibilityOff } from "@mui/icons-material";

//validation imports
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../utils/validationSchema";

import AppTheme from '../../shared-theme/AppTheme';
import ColorModeSelect from '../../shared-theme/ColorModeSelect';
import CssBaseline from '@mui/material/CssBaseline';

// Function to generate a secure password
const generatePassword = (length = 12) => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
  return Array.from(crypto.getRandomValues(new Uint8Array(length)))
    .map((x) => chars[x % chars.length])
    .join("");
};

const AddUserDialog = ({ open, handleClose, onSubmit, props }) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [showPassword2, setShowPassword2] = React.useState(false);
    const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm({
        resolver: yupResolver(registerSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            mobileNo: "",
            office: "",
            role: "user",
            password: "",
            confirmPassword: "",
        },
    });
  
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  }
  const togglePasswordVisibility2 = () => {
    setShowPassword2((prev) => !prev);
  }

  return (
    <AppTheme {...props}>
    <CssBaseline enableColorScheme />
    <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>
          <PersonAdd fontSize="small" style={{ marginRight: 5 }} />Add New User
        </DialogTitle>
        <DialogContent>
            <TextField placeholder="Juana" label="First Name" {...register("firstName")} fullWidth error={!!errors.firstName} helperText={errors.firstName?.message} />
            <TextField placeholder="Dela Cruz" label="Last Name" {...register("lastName")} fullWidth margin="dense" error={!!errors.lastName} helperText={errors.lastName?.message} />
            <TextField placeholder="user@email.com" label="Email" {...register("email")} type="email" fullWidth margin="dense" error={!!errors.email} helperText={errors.email?.message} />
            <TextField placeholder="09123456789" label="Mobile No." {...register("mobileNo")} fullWidth margin="dense" error={!!errors.mobileNo} helperText={errors.mobileNo?.message} />
            <TextField placeholder="Research Directorate" label="Unit/Office" {...register("office")} fullWidth margin="dense" error={!!errors.office} helperText={errors.office?.message} />
            <TextField select label="Role" {...register("role")} value={watch("role")} fullWidth margin="dense" error={!!errors.role} helperText={errors.role?.message}>
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="user">User</MenuItem>
            </TextField>

            {/* Password Field with Generate Button */}
            <TextField
            label="Password"
            {...register("password")}
            type={showPassword ? "text" : "password"}
            fullWidth
            margin="dense"
            error={!!errors.password}
            helperText={errors.password?.message}
            slotProps={{
              input:{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => 
                        setValue("password", generatePassword(),{
                          shouldDirty: true,
                          shouldTouch: true
                        })
                      }
                    title="Generate Password">
                    <GenerateIcon />
                    </IconButton>
                    <IconButton onClick={togglePasswordVisibility}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            }}
            InputLabelProps={{ shrink: !!watch("password") }}
            />

            {/* Confirm Password Field */}
            <TextField
            label="Confirm Password"
            {...register("confirmPassword")}
            type={showPassword2 ? "text" : "password"}
            fullWidth
            margin="dense"
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            slotProps={{
              input:{
                endAdornment: (
                  <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility2}>
                      {showPassword2 ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                  </InputAdornment>
                  ),
              }
            }}
        />
      </DialogContent>

    <DialogActions>
      <Button onClick={()=>{reset(), handleClose()}} color="secondary">Cancel</Button>
      <Button onClick={handleSubmit(onSubmit)} color="primary" variant="contained">Add User</Button>
    </DialogActions>
  </Dialog>
  </AppTheme>
  );
};

export default AddUserDialog;
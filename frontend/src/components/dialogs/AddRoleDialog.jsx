import React, { useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, IconButton, InputAdornment } from "@mui/material";
import { Autorenew as GenerateIcon, Visibility, VisibilityOff } from "@mui/icons-material";
import AppShortcutIcon from '@mui/icons-material/AppShortcut';

//validation imports
import { useForm, Controller  } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addRoleSchema } from "../../utils/validationSchema";


const AddRoleDialog = ({ open, handleClose, onSubmit, users, apps, userTypes }) => {
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(addRoleSchema),
        defaultValues: {
            userType: "",
            appsId: "",
            userId: "",
        },
    });

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>
            <AppShortcutIcon fontSize="small" style={{ marginRight: 5 }}/>Add New Role
        </DialogTitle>
        <DialogContent>
        {/* User Select */}
        <Controller
          name="userId"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="User"
              fullWidth
              margin="normal"
              error={!!errors.userId}
              helperText={errors.userId?.message}
            >
              {users.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.firstName} {user.lastName} ({user.email})
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        {/* App Select */}
        <Controller
          name="appsId"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="App"
              fullWidth
              margin="normal"
              error={!!errors.appsId}
              helperText={errors.appsId?.message}
            >
              {apps.map((app) => (
                <MenuItem key={app.id} value={app.id}>
                  {app.name}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        {/* User Type Input */}
        <Controller
          name="userType"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="Role"
              fullWidth
              margin="normal"
              error={!!errors.userType}
              helperText={errors.userType?.message}
            >
              {userTypes.map((userType) => (
                <MenuItem key={userType.id} value={userType.userType}>
                  {userType.userType}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      </DialogContent>

    <DialogActions>
      <Button onClick={handleClose} color="secondary">Cancel</Button>
      <Button onClick={handleSubmit(onSubmit)} color="primary" variant="contained">Add New Role</Button>
    </DialogActions>
  </Dialog>
  );
};

export default AddRoleDialog;
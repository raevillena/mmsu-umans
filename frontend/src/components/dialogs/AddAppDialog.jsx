import React, { useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, IconButton, InputAdornment } from "@mui/material";
import { Autorenew as GenerateIcon, Visibility, VisibilityOff } from "@mui/icons-material";
import AppShortcutIcon from '@mui/icons-material/AppShortcut';

//validation imports
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addAppSchema } from "../../utils/validationSchema";


const AddAppDialog = ({ open, handleClose, onSubmit }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(addAppSchema),
        defaultValues: {
            name: "",
            url: "",
            email: "",
            mobileNumber: "",
            ownerOffice: ""
        },
    });
  

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>
            <AppShortcutIcon fontSize="small" style={{ marginRight: 5 }}/>Add New App
        </DialogTitle>
        <DialogContent>
            <TextField label="App Name" {...register("name")} fullWidth margin="dense" error={!!errors.name} helperText={errors.name?.message} />
            <TextField placeholder="https://site.com" label="URL" {...register("url")} fullWidth margin="dense" error={!!errors.url} helperText={errors.url?.message} />
            <TextField label="Office Email" {...register("email")} type="email" fullWidth margin="dense" error={!!errors.email} helperText={errors.email?.message} />
            <TextField label="Mobile No." {...register("mobileNumber")} fullWidth margin="dense" error={!!errors.mobileNumber} helperText={errors.mobileNumber?.message} />
            <TextField label="Owner Office" {...register("ownerOffice")} fullWidth margin="dense" error={!!errors.ownerOffice} helperText={errors.ownerOffice?.message} />
      </DialogContent>

    <DialogActions>
      <Button onClick={handleClose} color="secondary">Cancel</Button>
      <Button onClick={handleSubmit(onSubmit)} color="primary" variant="contained">Add App</Button>
    </DialogActions>
  </Dialog>
  );
};

export default AddAppDialog;
import React, { useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, IconButton, InputAdornment } from "@mui/material";
import { Autorenew as GenerateIcon, Visibility, VisibilityOff } from "@mui/icons-material";
import AppShortcutIcon from '@mui/icons-material/AppShortcut';

//validation imports
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addUserTypeSchema } from "../../utils/validationSchema";


const AddUserTypeDialog = ({ open, handleClose, onSubmit }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(addUserTypeSchema),
        defaultValues: {
            userType: "",
        },
    });
  

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>
            <AppShortcutIcon fontSize="small" style={{ marginRight: 5 }}/>Add New User Type
        </DialogTitle>
        <DialogContent>
            <TextField label="User Type" {...register("userType")} fullWidth margin="dense" error={!!errors.userType} helperText={errors.userType?.message} />
      </DialogContent>

    <DialogActions>
      <Button onClick={handleClose} color="secondary">Cancel</Button>
      <Button onClick={handleSubmit(onSubmit)} color="primary" variant="contained">Add User Type</Button>
    </DialogActions>
  </Dialog>
  );
};

export default AddUserTypeDialog;
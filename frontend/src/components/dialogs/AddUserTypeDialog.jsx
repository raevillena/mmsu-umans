import React, { useRef, useEffect, useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Checkbox, FormControlLabel } from "@mui/material";
import AppShortcutIcon from '@mui/icons-material/AppShortcut';

//validation imports
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addUserTypeSchema } from "../../utils/validationSchema";


const AddUserTypeDialog = ({ open, handleClose, onSubmit }) => {
    const [addMore, setAddMore] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(addUserTypeSchema),
        defaultValues: {
            userType: "",
        },
    });
    
    const inputRef = useRef(null);
    const { ref, ...registerProps } = register("userType");

    // Auto-focus the text field when dialog opens
    useEffect(() => {
        if (open) {
            // Use a small delay to ensure dialog is fully rendered
            const timer = setTimeout(() => {
                if (inputRef.current) {
                    inputRef.current.focus();
                }
            }, 150);
            return () => clearTimeout(timer);
        }
    }, [open]);

    // Reset checkbox when dialog closes
    useEffect(() => {
        if (!open) {
            setAddMore(false);
        }
    }, [open]);

    const handleFormSubmit = (data) => {
        // Capture the checkbox state at submission time
        const shouldKeepOpen = addMore; // "I'll add more" = keep open
        
        onSubmit(data);
        
        if (shouldKeepOpen) {
            // Keep dialog open when checkbox is checked ("I'll add more")
            // Clear the field and refocus
            reset({ userType: "" });
            setTimeout(() => {
                if (inputRef.current) {
                    inputRef.current.focus();
                }
            }, 50);
        } else {
            // Close the dialog when checkbox is unchecked (done adding)
            handleClose();
        }
    };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>
            <AppShortcutIcon fontSize="small" style={{ marginRight: 5 }}/>Add New User Type
        </DialogTitle>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <DialogContent>
                <TextField 
                    label="User Type" 
                    {...registerProps}
                    inputRef={(e) => {
                        ref(e);
                        inputRef.current = e;
                    }}
                    autoFocus
                    fullWidth 
                    margin="dense" 
                    error={!!errors.userType} 
                    helperText={errors.userType?.message}
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={addMore}
                            onChange={(e) => setAddMore(e.target.checked)}
                        />
                    }
                    label="I'll add more"
                    sx={{ mt: 1 }}
                />
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose} color="secondary" type="button">Cancel</Button>
                <Button type="submit" color="primary" variant="contained">Add User Type</Button>
            </DialogActions>
        </form>
    </Dialog>
  );
};

export default AddUserTypeDialog;
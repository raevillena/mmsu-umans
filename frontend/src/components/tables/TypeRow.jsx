import React, { useState } from "react";
import { TableRow, TableCell, Select, MenuItem, IconButton, TextField, Tooltip } from "@mui/material";
import { useDispatch } from "react-redux";
import { updateUserType } from "../../store/slices/userTypesSlice";
import { Edit, Save, Cancel, CheckCircle, Cancel as CancelIcon } from "@mui/icons-material";
import LoadingScreen from "../LoadingScreen";


const TypeRow= ({ type, loadingRowId }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedType, setEditedType] = useState(type);

  const handleEditClick = () => setIsEditing(true);
  const handleCancelClick = () => {
    setEditedType(type);
    setIsEditing(false);
  };

  const handleSaveClick = () => {
    try{
      dispatch(updateUserType({ id: type.id, data: editedType })); // Only update this type
      setIsEditing(false);
    }catch(error){
     console.log(error) 
    }
  };

  const isLoading = loadingRowId === type.id;

  return (
    <TableRow key={type.id}>
        <TableCell align="center">
          {isLoading ? (
            <LoadingScreen caption="Updating..." fullScreen={false} size={30} hideCaption={true} />
          ) : isEditing ? (
          <>
            <Tooltip title="Save" placement="right-start">
                <IconButton onClick={handleSaveClick} color="success">
                    <Save />
                </IconButton>
            </Tooltip>
            <Tooltip title="Cancel" placement="right-start">
                <IconButton onClick={handleCancelClick} color="error">
                <Cancel />
                </IconButton>
            </Tooltip>
          </>
        ) : (
            <Tooltip title="Edit">
                <IconButton onClick={handleEditClick} color="primary">
                    <Edit /> 
                </IconButton>
            </Tooltip>
        )}
        </TableCell>
      
        <TableCell align="center">
            {isEditing ? (
            <TextField
                variant="standard"
                value={editedType.userType}
                onChange={(e) => setEditedType({ ...editedType, userType: e.target.value })}
                size="small"
            />
            ) : (
            type.userType
            )}
        </TableCell>
        <TableCell sx={{ textAlign: "center" }}>
            {new Date(type.updatedAt).toLocaleString("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
            })}
        </TableCell>
        <TableCell sx={{ textAlign: "center" }}>
            {new Date(type.createdAt).toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            })}
        </TableCell>
        <TableCell>
            {isEditing ? (
            <Select
                variant="standard"
                value={editedType.isActive}
                onChange={(e) => setEditedType({ ...editedType, isActive: e.target.value })}
                size="small"
            >
                <MenuItem value={true}>
                    <CheckCircle color="success" fontSize="small" style={{ marginRight: 5 }} />
                    Active
                </MenuItem>
                <MenuItem value={false}>
                    <CancelIcon color="error" fontSize="small" style={{ marginRight: 5 }} />
                    Inactive
                </MenuItem>
            </Select>
            ) : (
                <IconButton onClick={() => dispatch(updateUserType({ id: type.id, data: { isActive: !type.isActive } }))}>
                {type.isActive ? <CheckCircle color="success" /> : <Cancel color="error" />}
              </IconButton>
            )}
        </TableCell>
    </TableRow>
  );
};

// Prevent unnecessary re-renders
export default React.memo(TypeRow)
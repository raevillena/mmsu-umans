import React, { useState } from "react";
import { TableRow, TableCell, Select, MenuItem, IconButton, TextField, Tooltip } from "@mui/material";
import { useDispatch } from "react-redux";
import { updateUser } from "../../store/slices/usersSlice";
import { Edit, Save, Cancel, CheckCircle, Cancel as CancelIcon } from "@mui/icons-material";
import LoadingScreen from "../LoadingScreen";


const UserRow = ({ user, loadingRowId }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  const handleEditClick = () => setIsEditing(true);
  const handleCancelClick = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  const handleSaveClick = () => {
    try{
        dispatch(updateUser({ id: user.id, data: editedUser })); // Only update this user
        setIsEditing(false);
    }catch(error){
        console.log(error)
    }
  };

  const isLoading = loadingRowId === user.id;

  return (
    <TableRow key={user.id}>
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
        <TableCell>
            {isEditing ? (
            <Select
                variant="standard"
                value={editedUser.role}
                onChange={(e) => setEditedUser({ ...editedUser, role: e.target.value })}
                //size="small"
            >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="user">User</MenuItem>
            </Select>
            ) : (
            user.role
            )}
        </TableCell>
        <TableCell align="center">
            {isEditing ? (
            <TextField
                variant="standard"
                value={editedUser.firstName}
                onChange={(e) => setEditedUser({ ...editedUser, firstName: e.target.value })}
                size="small"
            />
            ) : (
            user.firstName
            )}
        </TableCell>
        <TableCell align="center">
            {isEditing ? (
            <TextField
                variant="standard"
                value={editedUser.lastName}
                onChange={(e) => setEditedUser({ ...editedUser, lastName: e.target.value })}
                size="small"
            />
            ) : (
            user.lastName
            )}
        </TableCell>
        <TableCell align="center">
            {isEditing ? (
            <TextField
                variant="standard"
                value={editedUser.email}
                onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                size="small"
            />
            ) : (
            user.email
            )}
        </TableCell>
        <TableCell align="center">
            {isEditing ? (
            <TextField
                variant="standard"
                value={editedUser.office}
                onChange={(e) => setEditedUser({ ...editedUser, office: e.target.value })}
                size="small"
            />
            ) : (
            user.office
            )}
        </TableCell>
        <TableCell align="center">
            {isEditing ? (
            <TextField
                variant="standard"
                value={editedUser.mobileNo}
                onChange={(e) => setEditedUser({ ...editedUser, mobileNo: e.target.value })}
                size="small"
            />
            ) : (
            user.mobileNo
            )}
        </TableCell>
        <TableCell sx={{ textAlign: "center" }}>
            {new Date(user.updatedAt).toLocaleString("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
            })}
        </TableCell>
        <TableCell sx={{ textAlign: "center" }}>
            {new Date(user.createdAt).toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            })}
        </TableCell>

        <TableCell align="center">
            {isEditing ? (
            <Select
                variant="standard"
                value={editedUser.isActive}
                onChange={(e) => setEditedUser({ ...editedUser, isActive: e.target.value })}
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
                <IconButton onClick={() => dispatch(updateUser({ id: user.id, data: { isActive: !user.isActive } }))}>
                {user.isActive ? <CheckCircle color="success" /> : <Cancel color="error" />}
              </IconButton>
            )}
        </TableCell>
    </TableRow>
  );
};

// Prevent unnecessary re-renders
export default React.memo(UserRow);
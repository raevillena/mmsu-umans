import React, { useState } from "react";
import { TableRow, TableCell, Select, MenuItem, IconButton, Tooltip } from "@mui/material";
import { useDispatch } from "react-redux";
import { updateRole } from "../../store/slices/rolesSlice";
import { Edit, Save, Cancel, CheckCircle, Cancel as CancelIcon } from "@mui/icons-material";
import LoadingScreen from "../LoadingScreen";

const RoleRow = ({ role, users, apps, userTypes, loadingRowId }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedRole, setEditRole] = useState(role);

  const handleEditClick = () => setIsEditing(true);
  const handleCancelClick = () => {
    setEditRole(role);
    setIsEditing(false);
  };

  const handleSaveClick = () => {
    try{
      dispatch(updateRole({ id: role.id, data: editedRole })); // Only update this role
      setIsEditing(false);
    }catch(error){
      console.log(error)
    }
  };


  const isLoading = loadingRowId === role.id;

  return (
    <TableRow key={role.id}>
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
            <Select
                value={editedRole.appsId || role.appsId}
                onChange={(e) => setEditRole({ ...editedRole, appsId: e.target.value })}
                size="small"
            >
                {apps.map((app) => (
                <MenuItem key={app.id} value={app.id}>
                    {app.name}
                </MenuItem>
                ))}
            </Select>
            ) : (
            role.appName || "Unknown"
            )}
        </TableCell>
        <TableCell align="center">
            {isEditing ? (
            <Select
                value={editedRole.userId || role.userId}
                onChange={(e) => setEditRole({ ...editedRole, userId: e.target.value })}
                size="small"
            >
                {users.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                    {user.firstName} {user.lastName} ({user.email})
                </MenuItem>
                ))}
            </Select>
            ) : (
            role.userName || "Unknown"
            )}
        </TableCell>
        <TableCell align="center">
            {isEditing ? (
            <Select
                value={editedRole.userType || role.userType}
                onChange={(e) => setEditRole({ ...editedRole, userType: e.target.value })}
                size="small"
            >
                {userTypes.map((type) => (
                <MenuItem key={type.id} value={type.userType}>
                    {type.userType}
                </MenuItem>
                ))}
            </Select>
            ) : (
            role.userType || "Unknown"
            )}
        </TableCell>
        <TableCell sx={{ textAlign: "center" }}>
            {new Date(role.updatedAt).toLocaleString("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
            })}
        </TableCell>
        <TableCell sx={{ textAlign: "center" }}>
            {new Date(role.createdAt).toLocaleString("en-US", {
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
                value={editedRole.isActive}
                onChange={(e) => setEditRole({ ...editedRole, isActive: e.target.value })}
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
                <IconButton onClick={() => dispatch(updateRole({ id: role.id, data: { isActive: !role.isActive } }))}>
                {role.isActive ? <CheckCircle color="success" /> : <Cancel color="error" />}
              </IconButton>
            )}
        </TableCell>
    </TableRow>
  );
};

// Prevent unnecessary re-renders
export default React.memo(RoleRow);
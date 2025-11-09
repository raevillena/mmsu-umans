import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

//MUI components
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';


//custom Table for users
import RolesTable from "../../components/tables/RolesTable";

//functions to dispatch actions
import { getRoles, addRole } from '../../store/slices/rolesSlice';
import { getApps } from "../../store/slices/appsSlice";
import { getUsers } from "../../store/slices/usersSlice";
import { getUserTypes } from "../../store/slices/userTypesSlice";

//Custom loading screen
import LoadingScreen from "../../components/LoadingScreen";

//custom dialog for adding an app

import AddRoleDialog from "../../components/dialogs/AddRoleDialog";


export default function Roles() {
    //redux states
  const {roles, loading, loadingRowId } = useSelector((state) => state.roles);
  const users = useSelector((state) => state.users.users);
  const apps = useSelector((state) => state.apps.apps);
  const userTypes = useSelector((state) => state.userTypes.userTypes);

  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);

  //mount functions
  useEffect(() => {
    if (roles[0] === 'empty') {
      dispatch(getRoles());
    }
    if (users[0] === 'empty') {
        dispatch(getUsers());
    }
    if (apps[0] === 'empty') {
        dispatch(getApps());
    }
    if (userTypes[0] === 'empty') {
        dispatch(getUserTypes());
    }
  }
  ,[roles, users, apps, userTypes]);

  const enrichedFilteredRoles = useMemo(() => {
    // Step 1: Enrich roles with display values
    const enriched = roles.map(role => {
      const user = users.find(user => user.id === role.userId);
      const app = apps.find(app => app.id === role.appsId);

      //console.log(app.name)
      return {
        ...role,
        userName: user ? `${user.firstName} ${user.lastName}` : 'Unknown',
        appName: app ? app.name : 'Unknown',
      };
    });
  
    // Step 2: Filter enriched roles
    return enriched.filter((role) =>
      `${role.userName} ${role.appName} ${role.userType}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }, [roles, users, apps, userTypes, searchTerm]);

  // Filter roles based on firstName, lastName, or email
  const filterRoles = roles.filter((role) =>
    `${role.name} ${role.url} ${role.ownerOffice} ${role.userType}` //need to provide the right field since ids are being used
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  //reload roles
  const handleReload = () => {
    dispatch(getRoles());
    setSearchTerm("");  // Clear the search term
  }

  //add user dialog open close functions
  const handleOpen = () => {
    setOpen(true);
  } 
  const handleClose = () => {
    setOpen(false);
  }


  //add user function
  const handleAddApp = (roleData) => {
    dispatch(addRole(roleData)); // Dispatch the action to add a user
    handleClose(); // Close the dialog
  };
  
//console.log("enmriched: ", enrichedFilteredRoles)

  return (
    <div>
      {loading || roles[0] === 'empty'? <LoadingScreen caption='Loading...' fullScreen={false} /> : (
        <Paper sx={{ maxWidth: '95%', margin: 'auto', overflow: 'hidden' ,height: '100%'}}>
          <AppBar
            position="static"
            color="default"
            elevation={0}
            sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
          >
            <Toolbar>
              {/* {error && showSnackbar(error,"error")} */}
              <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                <Grid item>
                  <SearchIcon color="inherit" sx={{ display: 'block' }} />
                </Grid>
                <Grid item xs>
                  <TextField
                    fullWidth
                    placeholder="Search by name, email address, phone number, or user role."
                    onChange={(e) => setSearchTerm(e.target.value)}
                    variant="standard"
                  />
                </Grid>
                <Grid item>
                  <Button variant="contained" onClick={handleOpen} sx={{ mr: 1 }}>
                    Add New Role
                  </Button>
                  <AddRoleDialog open={open} handleClose={handleClose} onSubmit={handleAddApp} users={users} apps={apps} userTypes={userTypes}/>
                  <Tooltip title="Reload">
                    <IconButton onClick={handleReload}> 
                      <RefreshIcon color="inherit" sx={{ display: 'block' }} />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
          <RolesTable users={users} apps={apps} userTypes={userTypes} loadingRowId={loadingRowId} />
        </Paper>
      )}
    </div>
  );
}

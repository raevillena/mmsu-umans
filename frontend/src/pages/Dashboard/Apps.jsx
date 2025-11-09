import React, { useState, useEffect } from "react";
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
import AppsTable from "../../components/tables/AppsTable";

//functions to dispatch actions
import { getApps, createApp } from '../../store/slices/appsSlice';

//Custom loading screen
import LoadingScreen from "../../components/LoadingScreen";

//custom dialog for adding an app

import AddAppDialog from "../../components/dialogs/AddAppDialog";


export default function Apps() {
  const {apps, loading, loadingRowId } = useSelector((state) => state.apps);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (apps[0] === 'empty') {
      dispatch(getApps());
    }
  }
  ,[apps]);

  // Filter Apps based on firstName, lastName, or email
  const filteredApps = apps.filter((app) =>
    `${app.name} ${app.url} ${app.ownerOffice} ${app.email} ${app.mobileNumber}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  //reload Apps
  const handleReload = () => {
    dispatch(getApps());
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
  const handleAddApp = (appData) => {
    dispatch(createApp(appData)); // Dispatch the action to add a user
    handleClose(); // Close the dialog
  };


  return (
    <div>
      {loading || apps[0] === 'empty'? <LoadingScreen caption='Loading...' fullScreen={false} /> : (
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
                    Add New App
                  </Button>
                  <AddAppDialog open={open} handleClose={handleClose} onSubmit={handleAddApp} />
                  <Tooltip title="Reload">
                    <IconButton onClick={handleReload}> 
                      <RefreshIcon color="inherit" sx={{ display: 'block' }} />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
          <AppsTable apps = {filteredApps} loadingRowId = {loadingRowId} />
        </Paper>
      )}
    </div>
  );
}

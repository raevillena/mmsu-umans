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
import UserTypesTable from "../../components/tables/UserTypesTable";

//functions to dispatch actions
import { getUserTypes, addUserType } from '../../store/slices/userTypesSlice';

//Custom loading screen
import LoadingScreen from "../../components/LoadingScreen";

//custom dialog for adding an app
import AddUserTypeDialog from "../../components/dialogs/AddUserTypeDialog";


export default function UserTypes() {
  const {userTypes, loading, loadingRowId } = useSelector((state) => state.userTypes);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (userTypes[0] === 'empty') {
      dispatch(getUserTypes());
    }
  }
  ,[userTypes]);

  // Filter userTypes based on firstName, lastName, or email
  const filteredTypes = userTypes.filter((type) =>
    `${type.userType}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  //reload userTypes
  const handleReload = () => {
    dispatch(getUserTypes());
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
  const handleAddApp = (userTypeData) => {
    dispatch(addUserType(userTypeData)); // Dispatch the action to add a user
    // Don't close here - let the dialog handle closing based on checkbox state
  };


  return (
    <div>
      {loading || userTypes[0] === 'empty'? <LoadingScreen caption='Loading...' fullScreen={false} /> : (
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
                    Add New UserType
                  </Button>
                  <AddUserTypeDialog open={open} handleClose={handleClose} onSubmit={handleAddApp} />
                  <Tooltip title="Reload">
                    <IconButton onClick={handleReload}> 
                      <RefreshIcon color="inherit" sx={{ display: 'block' }} />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
          <UserTypesTable userTypes = {filteredTypes} loadingRowId={loadingRowId} />
        </Paper>
      )}
    </div>
  );
}

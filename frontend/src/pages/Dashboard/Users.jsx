import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//MUI components
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';


//custom Table for users
import UsersTable from "../../components/tables/UsersTable";

//functions to dispatch actions
import { getUsersPaginated, createUser, clearPaginatedCache } from '../../store/slices/usersSlice';

//Custom loading screen
import LoadingScreen from "../../components/LoadingScreen";

//custom dialog for adding a user
import AddUserDialog from "../../components/dialogs/AddUserDialog";


export default function Users({ isActive = true }) {
  const { loading, loadingRowId, loadedPagesActive, loadedPagesInactive } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);

  // Load first page on mount if not cached
  useEffect(() => {
    const loadedPages = isActive ? loadedPagesActive : loadedPagesInactive;
    if (!loadedPages.includes(1)) {
      dispatch(getUsersPaginated({ page: 1, isActive }));
    }
  }, [loadedPagesActive, loadedPagesInactive, isActive, dispatch]);

  //reload users - clear cache and reload first page
  const handleReload = () => {
    dispatch(clearPaginatedCache());
    dispatch(getUsersPaginated({ page: 1, isActive }));
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
  const handleAddUser = (userData) => {
    dispatch(createUser(userData)); // Dispatch the action to add a user
    handleClose(); // Close the dialog
  };


  const loadedPages = isActive ? loadedPagesActive : loadedPagesInactive;

  return (
    <div>
      {loading && !loadedPages.includes(1) ? <LoadingScreen caption='Loading...' fullScreen={false} /> : (
        <Paper sx={{ maxWidth: '95%', margin: 'auto', overflow: 'hidden' ,height: '100%'}}>
          <AppBar
            position="static"
            color="default"
            elevation={0}
            sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
          >
            <Toolbar>
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
                    disabled
                  />
                </Grid>
                <Grid item>
                  {isActive && (
                    <Button variant="contained" onClick={handleOpen} sx={{ mr: 1 }}>
                      Add user
                    </Button>
                  )}
                  {isActive && <AddUserDialog open={open} handleClose={handleClose} onSubmit={handleAddUser} />}
                  <Tooltip title="Reload">
                    <IconButton onClick={handleReload}> 
                      <RefreshIcon color="inherit" sx={{ display: 'block' }} />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
          <UsersTable loadingRowId={loadingRowId} isActive={isActive} />
        </Paper>
      )}
    </div>
  );
}

import React, { useState, useEffect, useMemo, useRef } from "react";
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
import RolesTable from "../../components/tables/RolesTable";

//functions to dispatch actions
import { getRolesPaginated, addRole, clearPaginatedCache } from '../../store/slices/rolesSlice';
import { getApps } from "../../store/slices/appsSlice";
import { getUsers } from "../../store/slices/usersSlice";
import { getUserTypes } from "../../store/slices/userTypesSlice";

//Custom loading screen
import LoadingScreen from "../../components/LoadingScreen";

//custom dialog for adding an app
import AddRoleDialog from "../../components/dialogs/AddRoleDialog";


export default function Roles({ isActive = true }) {
  const { loading, loadingRowId, paginatedActive, paginatedInactive } = useSelector((state) => state.roles);
  const users = useSelector((state) => state.users.users);
  const apps = useSelector((state) => state.apps.apps);
  const userTypes = useSelector((state) => state.userTypes.userTypes);

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const searchInputRef = useRef(null);

  const normalizedSearch = useMemo(
    () => searchTerm.trim().toLowerCase(),
    [searchTerm]
  );

  useEffect(() => {
    if (users[0] === 'empty') {
      dispatch(getUsers());
    }
    if (apps[0] === 'empty') {
      dispatch(getApps());
    }
    if (userTypes[0] === 'empty') {
      dispatch(getUserTypes());
    }
  }, [users, apps, userTypes, dispatch]);

  //reload roles - clear cache and reload first page
  const handleReload = () => {
    dispatch(clearPaginatedCache());
    setSearchInput("");
    setSearchTerm("");
    dispatch(getRolesPaginated({ page: 1, isActive, searchTerm: "" }));
    searchInputRef.current?.focus();
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
    console.log(roleData);
    dispatch(addRole(roleData)); // Dispatch the action to add a user
    handleClose(); // Close the dialog
  };

  const cacheMap = isActive ? paginatedActive : paginatedInactive;
  const cacheBucket = cacheMap[normalizedSearch];
  const isFirstPageLoaded = cacheBucket?.loadedPages?.includes(1);
  const showInitialLoader = loading && !isFirstPageLoaded;

  return (
    <div>
      {showInitialLoader ? <LoadingScreen caption='Loading...' fullScreen={false} /> : (
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
                    variant="standard"
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        setSearchTerm(searchInput);
                        searchInputRef.current?.focus();
                      }
                    }}
                    value={searchInput}
                    inputRef={searchInputRef}
                  />
                </Grid>
                <Grid item>
                  {isActive && (
                    <Button variant="contained" onClick={handleOpen} sx={{ mr: 1 }}>
                      Add New Role
                    </Button>
                  )}
                  {isActive && <AddRoleDialog open={open} handleClose={handleClose} onSubmit={handleAddApp} users={users} apps={apps} userTypes={userTypes}/>}
                  <Tooltip title="Reload">
                    <IconButton onClick={handleReload}> 
                      <RefreshIcon color="inherit" sx={{ display: 'block' }} />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
          <RolesTable users={users} apps={apps} userTypes={userTypes} loadingRowId={loadingRowId} isActive={isActive} searchTerm={searchTerm} />
        </Paper>
      )}
    </div>
  );
}

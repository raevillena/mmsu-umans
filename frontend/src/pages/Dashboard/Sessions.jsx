import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//MUI components
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';


//custom Table for users
import SessionsTable from "../../components/tables/SessionsTable";

//functions to dispatch actions
import { getSessionsPaginated, clearPaginatedCache } from '../../store/slices/sessionsSlice';
import { getApps } from "../../store/slices/appsSlice";
import { getUsers } from "../../store/slices/usersSlice";

//Custom loading screen
import LoadingScreen from "../../components/LoadingScreen";


export default function Sessions() {
  const { loading, loadingRowId, loadedPages } = useSelector((state) => state.sessions);
  const users = useSelector((state) => state.users.users);
  const apps = useSelector((state) => state.apps.apps);
  const dispatch = useDispatch();

  // Load first page on mount if not cached
  useEffect(() => {
    if (!loadedPages.includes(1)) {
      dispatch(getSessionsPaginated(1));
    }
    if (users[0] === 'empty') {
      dispatch(getUsers());
    }
    if (apps[0] === 'empty') {
      dispatch(getApps());
    }
  }, [loadedPages, users, apps, dispatch]);

  //reload sessions - clear cache and reload first page
  const handleReload = () => {
    dispatch(clearPaginatedCache());
    dispatch(getSessionsPaginated(1));
  }

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
                    variant="standard"
                    disabled
                  />
                </Grid>
                <Grid item>
                  <Tooltip title="Reload">
                    <IconButton onClick={handleReload}> 
                      <RefreshIcon color="inherit" sx={{ display: 'block' }} />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
          <SessionsTable users={users} apps={apps} loadingRowId={loadingRowId} />
        </Paper>
      )}
    </div>
  );
}

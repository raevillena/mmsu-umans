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
import LogsTable from "../../components/tables/LogsTable";

//functions to dispatch actions
import { getLogs } from "../../api/logsApi";
import { getUsers } from "../../store/slices/usersSlice";
//Custom loading screen
import LoadingScreen from "../../components/LoadingScreen";

import { showSnackbar } from "../../store/slices/snackbarSlice";


export default function Logs() {

  const [searchTerm, setSearchTerm] = useState("");
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();
  const [logs, setLogs] = useState(['empty']);
  const [loading, setLoading] = useState(true);

  const loadLogs = async () => {
    try {
      const data = await getLogs(50); // pass your limit here
      dispatch(showSnackbar({ message: "Logs loaded successfully!", severity: "info" }));
      setLogs(data);
    } catch (err) {
        dispatch(showSnackbar({ message: err, severity: "error" }));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (users[0] === 'empty') {
        dispatch(getUsers());
    }
    loadLogs();
  }
  ,[]);

  // Filter Apps based on firstName, lastName, or email
  const filteredLogs = logs.filter((log) =>
    `${log.name} ${log.url} ${log.ownerOffice} ${log.email} ${log.mobileNumber}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  //reload logs
  const handleReload = () => {
    loadLogs();
    setSearchTerm("");  // Clear the search term
  }

  return (
    <div>
      {loading || logs[0] === 'empty'? <LoadingScreen caption='Loading...' fullScreen={false} /> : (
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
                  <Tooltip title="Reload">
                    <IconButton onClick={handleReload}> 
                      <RefreshIcon color="inherit" sx={{ display: 'block' }} />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
          <LogsTable users={users} />
        </Paper>
      )}
    </div>
  );
}

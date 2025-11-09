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
import SessionsTable from "../../components/tables/SessionsTable";

//functions to dispatch actions
import { getSessions} from '../../store/slices/sessionsSlice';
import { getApps } from "../../store/slices/appsSlice";
import { getUsers } from "../../store/slices/usersSlice";

//Custom loading screen
import LoadingScreen from "../../components/LoadingScreen";


export default function Sessions() {
    const {sessions, loading, loadingRowId } = useSelector((state) => state.sessions);
    const users = useSelector((state) => state.users.users);
    const apps = useSelector((state) => state.apps.apps);
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        if (sessions[0] === 'empty') {
        dispatch(getSessions());
        }
        if (users[0] === 'empty') {
            dispatch(getUsers());
        }
        if (apps[0] === 'empty') {
            dispatch(getApps());
        }
    }
    ,[sessions,users, apps,]);

    // Filter sessions based on firstName, lastName, or email
    const filteredSessions = sessions.filter((type) =>
        `${type.userType}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

    //reload sessions
    const handleReload = () => {
        dispatch(getSessions());
        setSearchTerm("");  // Clear the search term
    }

    return (
        <div>
        {loading || sessions[0] === 'empty'? <LoadingScreen caption='Loading...' fullScreen={false} /> : (
            sessions.length <=0 ? <Typography variant="h6" align="center">No sessions found</Typography> : (
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
            <SessionsTable users={users} apps={apps} loadingRowId={loadingRowId} />
            </Paper>
        )
    )}
        </div>
    );
}

import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { 
  AppBar, Avatar,Toolbar, Typography, IconButton, Menu, MenuItem,Button, Grid2, Tooltip, Link, Box

} from '@mui/material';

import AppTheme from '../../shared-theme/AppTheme';
import CssBaseline from '@mui/material/CssBaseline';

import MenuIcon from '@mui/icons-material/Menu';
import { AccountCircle, Brightness4, Brightness7 } from '@mui/icons-material';

import { useDispatch,useSelector } from "react-redux";
import { logout } from "../../store/slices/authSlice";
import {useLocation, useNavigate  } from 'react-router-dom';

import { styled, alpha } from '@mui/material/styles';

import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import ColorModeIconDropdown from '../../shared-theme/ColorModeIconDropdown';

const avatarURL=import.meta.env.VITE_IMAGE_SERVER_URL

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));




function Header(props) {
  const { onDrawerToggle } = props;
  const dispatch = useDispatch();

  const location = useLocation();

  const [anchorEl, setAnchorEl] = useState(null);
  const avatar = useSelector((state) => state.auth.user.avatar) || null
  const navigate = useNavigate();

  // Dynamic title based on the current path
  const getTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Dashboard';
      case '/users':
        return 'Users';
      case '/apps':
        return 'Apps';
      case '/roles':
        return 'Roles';
      case '/userTypes':
        return 'User Types';
      case '/googleAccounts':
        return 'Google Accounts';
      case '/sessions':
        return 'Sessions';
      case '/about':
        return 'About';     
      case '/contact':
        return 'Contact';
      case '/logs':
        return 'Logs';
      default:
        return 'Dashboard';
    }
  };

  const handleLogout = () => {
    handleClose();
    dispatch(logout());
    navigate('/login');
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget); // Open the menu
  };

  const handleClose = () => {
    setAnchorEl(null); // Close the menu
  };

  const handleProfile = () => {
    handleClose();
    navigate('/profile'); // Navigate to profile page
  };

  
  return (
    
    <React.Fragment>
      <AppTheme {...props}>
        <CssBaseline enableColorScheme />
          <AppBar color="primary" position="sticky">
            <Toolbar sx={{ minHeight: 64 }}>
              <Box sx={{ display: 'flex', flexGrow: 1, alignItems: 'center' }}>
                <Grid2 sx={{ display: { sm: 'none', xs: 'block' } }}>
                  <IconButton
                   size="large"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={onDrawerToggle}
                    edge="start"
                  >
                    <MenuIcon />
                  </IconButton>
                </Grid2>
                {/* Display dynamic title */}
                <Typography color="inherit" variant="h6" component="h1">
                  <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                    {getTitle()}
                  </Link>
                </Typography>
              </Box>

              <ColorModeIconDropdown />
              {/* search bar */}
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>

              {/* User Account */}
              <IconButton sx={{ color: 'inherit', ml:2}} onClick={handleClick}>
                {avatar? (
                  <Avatar
                    src={`${avatarURL}${avatar}`}
                    alt="User Avatar"
                    sx={{ width: 40, height: 40, mb: 1, border: '1px solid#f1f1f1', boxShadow:3}}
                  />
                ):(
                  <AccountCircle />
                )}
                
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                slotProps={{
                  paper: {
                    variant: 'outlined',
                    elevation: 0,
                    sx: {
                      my: '4px',
                      width: 200,
                    },
                  },
                }}
              >
                <MenuItem onClick={handleProfile}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>Settings</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Toolbar>
          </AppBar>
        </AppTheme>
    </React.Fragment>
  );
}

Header.propTypes = {
  onDrawerToggle: PropTypes.func.isRequired,
};

export default Header;

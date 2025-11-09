import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Navigator from '../components/headers/Navigator';
//import Header from '../components/headers/Header';
import Header from '../components/headers/Header';
import { useTheme } from '@mui/material/styles';
import { Outlet } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" align="center" sx={{ color: 'text.secondary' }}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}

const drawerWidth = 256;

const AdminLayout = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', width:'100vw' }}>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        {isSmUp ? null : (
          <Navigator
            PaperProps={{ style: { width: drawerWidth } }}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
          />
        )}
        <Navigator
          PaperProps={{ style: { width: drawerWidth } }}
          sx={{ display: { sm: 'block', xs: 'none' } }}
        />
      </Box>

      <Box sx={{ flexGrow:1, display: 'flex', flexDirection: 'column', overflow: 'hidden'}}>
        <Header onDrawerToggle={handleDrawerToggle} />
        {/* Page Content */}
        <Box component="main" sx={{ flexGrow: 1, py: 6, px: 4, overflow: 'auto'}}>
          <Outlet />
        </Box>
        <Box component="footer" sx={{ p: 2,width: '100%' }}>
          <Copyright />
        </Box>
      </Box>
    </Box>

  );
}

export default AdminLayout
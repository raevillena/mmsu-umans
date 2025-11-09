import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';
import PermMediaOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActual';
import PublicIcon from '@mui/icons-material/Public';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';
import TimerIcon from '@mui/icons-material/Timer';
import SettingsIcon from '@mui/icons-material/Settings';
import PhonelinkSetupIcon from '@mui/icons-material/PhonelinkSetup';
import ListIcon from '@mui/icons-material/List';
import GoogleIcon from '@mui/icons-material/Google';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import WorkIcon from '@mui/icons-material/Work';

import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { Typography } from '@mui/material';
import { UmansLogoStyled } from '../CustomIcons';


const categories = [
  {
    id: 'Home',
    children: [
      {
        id: 'Overview',
        icon: <HomeIcon />,
        path:'/',
      },
    ],
  },
  {
    id: 'Manage',
    children: [
      {
        id: 'Users',
        icon: <PeopleIcon />,
        path:'/users',
      },
      { id: 'Apps', icon: <DnsRoundedIcon />, path:'/apps' },
      { id: 'Roles', icon: <WorkIcon />, path:'/roles' },
      { id: 'User Types', icon: <SupervisedUserCircleIcon />, path:'/userTypes' },
      { id: 'Google Accounts', icon: <GoogleIcon />, path:'/googleAccounts' },
      {
        id: 'Active Sessions',
        icon: <SettingsInputComponentIcon />,
        path:'/sessions'
      },
    ],
  },
  {
    id: 'Me',
    children: [
      { id: 'About', icon: <PublicIcon />, path:'/about' },
      { id: 'Contact', icon: <ContactPhoneIcon /> , path:'/contact'},
      { id: 'Logs', icon: <ListIcon />, path:'/logs' },
      { id: 'Profile', icon: <PhonelinkSetupIcon />, path:'/profile' },
    ],
  },
];


const itemCategory = {
  boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
  py: 1.5,
  px: 3,
};



export default function Navigator(props) {
  const { ...other } = props;
  const location = useLocation(); // Get current URL path

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem sx={{  ...itemCategory, fontSize: 22 }}>
          <Box display="flex" alignItems="center">
            <UmansLogoStyled style={{  width: 50, height: 50 }} />
            <Typography sx={{fontStyle: 'bold', fontWeight: 'regular',  fontSize: 14, ml:1 }}>User Management System</Typography>
          </Box>
        </ListItem>
        <Divider sx={{ mt: 2 }} />
        {categories.map(({ id, children }) => (
          <Box key={id} >
            <ListItem sx={{ py: 1, px: 3}}>
              <ListItemText>{id}</ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, path }) => (
              <ListItem disablePadding key={childId}>
                <ListItemButton component={NavLink} to={path} selected={location.pathname === path} >
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText>{childId}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
            <Divider sx={{ mt: 2 }} />
          </Box>
        ))}
      </List>
    </Drawer>
  );
}

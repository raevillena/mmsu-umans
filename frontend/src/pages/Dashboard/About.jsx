import React from 'react';
import { Box, Container, Typography, Paper, Divider } from '@mui/material';
import { Info as InfoIcon, Groups, Settings, Security, Email } from '@mui/icons-material';

const About = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Box display="flex" alignItems="center" mb={2}>
          <InfoIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="h4" fontWeight="bold">
            About UMANS
          </Typography>
        </Box>

        <Typography variant="body1" sx={{ mb: 3 }}>
          <strong>UMANS</strong> (User Management System) is a centralized platform designed to efficiently manage users, roles, and app-specific permissions across multiple applications. Whether you're an admin managing thousands of users or an app developer integrating user roles, UMANS provides a robust and secure solution.
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Box mb={2} display="flex" alignItems="center">
          <Groups color="secondary" sx={{ mr: 1 }} />
          <Typography variant="h6">Multi-App User Control</Typography>
        </Box>
        <Typography variant="body2" paragraph>
          Manage users across multiple applications, each with its own specific roles and permissions. Users can be assigned various roles per app, enabling flexible access control.
        </Typography>

        <Box mb={2} display="flex" alignItems="center">
          <Settings color="action" sx={{ mr: 1 }} />
          <Typography variant="h6">Customizable User Roles</Typography>
        </Box>
        <Typography variant="body2" paragraph>
          Easily define and manage custom roles tailored to your application's needs. UMANS supports dynamic role assignments and future-proof user types.
        </Typography>

        <Box mb={2} display="flex" alignItems="center">
          <Security color="error" sx={{ mr: 1 }} />
          <Typography variant="h6">Secure Authentication</Typography>
        </Box>
        <Typography variant="body2">
          Integrated with secure authentication mechanisms, including token-based auth and optional Google OAuth2. Sessions are securely managed and refresh tokens ensure smooth user experience.
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="caption" color="text.secondary">
          Built with ❤️ using React, Material UI, Express, and Sequelize by: <Typography sx={{ fontWeight: 'bold' }} >Raymart O. Villena</Typography>
          <Box sx={{display: 'flex', alignItems: 'center'}}>
            <Email color="primary" sx={{mr:0.5}}/> 
            <Typography sx={{fontStyle: 'italic', fontWeight: 'regular',  fontSize: 12 }}>raymart.o.villena@gmail.com</Typography>
          </Box>
        </Typography>
      </Paper>
    </Container>
  );
};

export default About;
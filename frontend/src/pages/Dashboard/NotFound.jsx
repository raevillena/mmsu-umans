import React from "react";
import { Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Using useNavigate for React Router v6

const NotFound = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/login"); // This will redirect the user to the home page
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh", // Ensure the full viewport height is used
        textAlign: "center",
        width: "100vw", // Full width of the viewport
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          padding: 2,
        }}
      >
        <Typography variant="h2" sx={{ fontWeight: "bold", color: "#1976d2" }}>
          404
        </Typography>
        <Typography variant="h4" sx={{ marginBottom: 2 }}>
          Oops! Page not found.
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 4 }}>
          The page you are looking for might have been removed or is temporarily unavailable.
        </Typography>
        <Button variant="contained" color="primary" onClick={goHome}>
          Go to Home
        </Button>
      </Box>
    </Box>
  );
};

export default NotFound;
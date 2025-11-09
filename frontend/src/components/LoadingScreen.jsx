import { CircularProgress, Box, Typography } from "@mui/material";

export default function LoadingScreen ({caption, fullScreen = true, size = 60, hideCaption = false}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: fullScreen ? "rgba(0, 0, 0, 0.5)" : "transparent",
        color: fullScreen ? "white" : "inherit",
        width: fullScreen ? "100vw" : "100%",
        height: fullScreen ? "100vh" : "100%",
        p: fullScreen ? 0 : 1,
        position: fullScreen ? "fixed" : "relative",
        top: fullScreen ? 0 : "auto",
        left: fullScreen ? 0 : "auto",
        zIndex: fullScreen ? 1300 : "auto",
      }}
    >
      <CircularProgress size={size} sx={{ color: fullScreen ? "white" : "primary.main" }} />
      {!hideCaption && caption && (
        <Typography variant="body2" sx={{ mt: 1 }}>
          {caption}
        </Typography>
      )}
    </Box>
  );
};

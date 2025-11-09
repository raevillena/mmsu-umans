import React, { useState } from "react";
import {
  Box,
  Grid2,
  Typography,

} from "@mui/material";


import ProfileAvatarCard from "../../components/pageComponents/ProfileAvatarCard";
import ProfileChangePasswordCard from "../../components/pageComponents/ProfileChangePasswordCard";

const Profile = () => {

  return (
    <Box sx={{ p: 3, backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold", color: "#333" }}>
        My Profile
      </Typography>

      <Grid2 container spacing={3}>
        {/* User Info + Avatar */}
        <Grid2 size= {{xs:12, md:6}} >
            <ProfileAvatarCard />
        </Grid2>

        {/* Change Password */}
        <Grid2 size= {{xs:12, md:6}}>
          <ProfileChangePasswordCard />
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default Profile;

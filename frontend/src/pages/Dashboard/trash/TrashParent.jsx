import React, { useState } from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Users from "../Users";
import Apps from "../Apps";
import Roles from "../Roles";

export default function TrashParent() {
  const [tabValue, setTabValue] = useState(0); // 0 = Users, 1 = Apps, 2 = Roles

  const handleTabChange = (_, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="trash tabs">
          <Tab label="Users" />
          <Tab label="Apps" />
          <Tab label="Roles" />
        </Tabs>
      </Box>
      {tabValue === 0 && <Users isActive={false} />}
      {tabValue === 1 && <Apps isActive={false} />}
      {tabValue === 2 && <Roles isActive={false} />}
    </Box>
  );
}


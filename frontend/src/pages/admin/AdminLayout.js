import React, { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";

import AdminVehicles from "./AdminVehicles";
import AdminDrivers from "./AdminDrivers";
import AdminRoutes from "./AdminRoutes";
import AdminAssignDriver from "./AdminAssignDriver";

export default function AdminLayout() {
  const [tab, setTab] = useState(0);

  return (
    <Box sx={{ width: "100%", padding: 3 }}>
      <Tabs
        value={tab}
        onChange={(e, v) => setTab(v)}
        textColor="primary"
        indicatorColor="primary"
        sx={{ mb: 3 }}
      >
        <Tab label="Vehicles" />
        <Tab label="Drivers" />
        <Tab label="Routes" />
        <Tab label="Assign Driver" />
      </Tabs>

      {tab === 0 && <AdminVehicles />}
      {tab === 1 && <AdminDrivers />}
      {tab === 2 && <AdminRoutes />}
      {tab === 3 && <AdminAssignDriver />}
    </Box>
  );
}

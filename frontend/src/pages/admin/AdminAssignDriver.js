import React, { useEffect, useState } from "react";
import API from "../../api/api";
import {
  Grid, Card, CardContent, Typography,
  MenuItem, Select, Stack, Chip
} from "@mui/material";

export default function AdminAssignDriver() {
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    API.get("/vehicles").then((r) => setVehicles(r.data));
    API.get("/auth/list-users?role=driver").then((r) => setDrivers(r.data));
  }, []);

  const assignDriver = async (vehicleId, email) => {
    await API.put(`/vehicles/${vehicleId}`, { driverName: email });

    setVehicles((prev) =>
      prev.map((v) =>
        v._id === vehicleId ? { ...v, driverName: email } : v
      )
    );
  };

  return (
    <div>
      <Typography variant="h4" mb={3}>
        Assign Drivers
      </Typography>

      <Grid container spacing={3}>
        {vehicles.map((v) => {
          const driver = v.driverName?.includes("@") ? v.driverName : "Unassigned";

          return (
            <Grid item xs={12} md={4} key={v._id}>
              <Card elevation={4} sx={{ borderRadius: 3 }}>
                <CardContent>

                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="h6">{v.regNumber}</Typography>
                    <Chip
                      label={driver === "Unassigned" ? "Unassigned" : "Assigned"}
                      color={driver === "Unassigned" ? "warning" : "success"}
                      size="small"
                    />
                  </Stack>

                  <Typography mt={1}>Driver: {driver}</Typography>
                  <Typography>Model: {v.model}</Typography>

                  <Select
                    fullWidth
                    sx={{ mt: 2 }}
                    defaultValue=""
                    onChange={(e) => assignDriver(v._id, e.target.value)}
                  >
                    <MenuItem value="">Assign Driver</MenuItem>

                    {drivers.map((d) => (
                      <MenuItem key={d._id} value={d.email}>
                        {d.name} ({d.email})
                      </MenuItem>
                    ))}
                  </Select>

                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

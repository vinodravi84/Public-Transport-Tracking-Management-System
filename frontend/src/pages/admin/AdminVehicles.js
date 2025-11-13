import React, { useEffect, useState } from "react";
import API from "../../api/api";
import {
  Grid, Card, CardContent, Typography, Chip, Stack,Box 
} from "@mui/material";

export default function AdminVehicles() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    API.get("/vehicles")
      .then((r) => setVehicles(r.data))
      .catch((e) => console.error(e));
  }, []);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" mb={3}>Vehicles</Typography>

      <Grid container spacing={3}>
        {vehicles.map((v) => {
          const driver = v.driverName?.includes("@") ? v.driverName : "Unassigned";

          return (
            <Grid item xs={12} md={4} key={v._id}>
              <Card elevation={3} sx={{ borderRadius: 3 }}>
                <CardContent>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="h6">{v.regNumber}</Typography>
                    <Chip
                      label={v.status || "active"}
                      color="primary"
                      size="small"
                    />
                  </Stack>

                  <Typography>Model: {v.model}</Typography>
                  <Typography>Capacity: {v.capacity}</Typography>
                  <Typography>Driver: {driver}</Typography>
                  <Typography>
                    Route: {v.route?.name || "Not Assigned"}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

import React, { useEffect, useState } from "react";
import API from "../../api/api";
import { Grid, Card, CardContent, Typography } from "@mui/material";

export default function AdminDrivers() {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    API.get("/auth/list-users?role=driver").then((r) => setDrivers(r.data));
  }, []);

  return (
    <div>
      <Typography variant="h4" mb={3}>Drivers</Typography>

      <Grid container spacing={3}>
        {drivers.map((d) => (
          <Grid item xs={12} md={4} key={d._id}>
            <Card elevation={3} sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h6">{d.name}</Typography>
                <Typography>{d.email}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

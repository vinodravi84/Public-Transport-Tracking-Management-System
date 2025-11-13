import React, { useEffect, useState } from "react";
import API from "../../api/api";
import { Grid, Card, CardContent, Typography } from "@mui/material";

export default function AdminRoutes() {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    API.get("/routes").then((r) => setRoutes(r.data));
  }, []);

  return (
    <div>
      <Typography variant="h4" mb={3}>Routes</Typography>

      <Grid container spacing={3}>
        {routes.map((r) => (
          <Grid item xs={12} md={4} key={r._id}>
            <Card elevation={3} sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h6">{r.name}</Typography>
                <Typography>{r.start} → {r.end}</Typography>
                <Typography>Distance: {r.distance} km</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

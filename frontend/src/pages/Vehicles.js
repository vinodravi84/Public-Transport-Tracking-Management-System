import React, { useState, useEffect } from "react";
import API from "../api/api";
import { Container, Typography, Grid, Paper } from "@mui/material";

const Vehicles = ({ user }) => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await API.get("/vehicles");
        setVehicles(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchVehicles();
  }, []);

  if (!user) return <Typography color="error">Please login to view vehicles.</Typography>;

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>Vehicles</Typography>
      <Grid container spacing={2}>
        {vehicles.map(v => (
          <Grid item xs={12} md={4} key={v._id}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6">{v.vehicleNumber}</Typography>
              <Typography>Type: {v.type}</Typography>
              <Typography>Route: {v.route}</Typography>
              <Typography>Capacity: {v.capacity}</Typography>
              <Typography>Status: {v.status}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Vehicles;

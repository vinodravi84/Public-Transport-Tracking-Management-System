// src/pages/Vehicles.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import {
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Chip,
  Stack,
  Box,
} from "@mui/material";

const Vehicles = ({ user }) => {
  const [vehicles, setVehicles] = useState([]);
  const navigate = useNavigate();

  // fetch and set vehicles
  const fetchVehicles = async () => {
    try {
      const res = await API.get("/vehicles");
      setVehicles(res.data || []);
    } catch (err) {
      console.error("Failed to fetch vehicles:", err);
    }
  };

  useEffect(() => {
    fetchVehicles();

    // Poll every 5 seconds to reflect live tracking updates
    const iv = setInterval(fetchVehicles, 5000);
    return () => clearInterval(iv);
  }, []);

  if (!user)
    return (
      <Container sx={{ mt: 6 }}>
        <Typography color="error">Please login to view vehicles.</Typography>
      </Container>
    );

  const handleTrack = (vehicleId) => {
    // open tracking page / vehicle detail - create route later
    navigate(`/vehicles/${vehicleId}/track`);
  };

  const handleBook = (vehicleId) => {
    // open booking flow for selected vehicle (create booking page later)
    navigate(`/book/${vehicleId}`);
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Vehicles
      </Typography>

      <Grid container spacing={2}>
        {vehicles.length === 0 && (
          <Grid item xs={12}>
            <Typography>No vehicles found.</Typography>
          </Grid>
        )}

        {vehicles.map((v) => {
          const lastSeen =
            v.lastSeenAt && new Date(v.lastSeenAt).toLocaleString();
          const location = v.currentLocation;
          return (
            <Grid item xs={12} md={4} key={v._id}>
              <Paper sx={{ p: 2, height: "100%" }}>
                <Stack spacing={1}>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6">
                      {v.regNumber || v.vehicleNumber || "—"}
                    </Typography>
                    <Chip
                      label={v.status ? v.status.toUpperCase() : "UNKNOWN"}
                      color={v.status === "active" ? "success" : "default"}
                      size="small"
                    />
                  </Box>

                  <Typography>Model: {v.model || v.type || "—"}</Typography>
                  <Typography>Capacity: {v.capacity ?? "—"}</Typography>
                  <Typography>Driver: {v.driverName || "Unassigned"}</Typography>
                  <Typography>Route: {v.route?.name || "Unassigned"}</Typography>

                  {location ? (
                    <>
                      <Typography>
                        Location: {Number(location.lat).toFixed(4)},{" "}
                        {Number(location.lng).toFixed(4)}
                      </Typography>
                      <Typography variant="body2">Last seen: {lastSeen}</Typography>
                    </>
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      No live location yet
                    </Typography>
                  )}

                  <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleTrack(v._id)}
                    >
                      Track
                    </Button>

                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleBook(v._id)}
                    >
                      Book
                    </Button>
                  </Stack>
                </Stack>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default Vehicles;

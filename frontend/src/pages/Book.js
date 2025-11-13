// src/pages/Book.jsx
import React, { useEffect, useState } from "react";
import { Container, Typography, Select, MenuItem, Card, CardContent, Grid, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import API from "../api/api";
import SeatMap from "../components/SeatMap";
import { useNavigate } from "react-router-dom";

export default function Book() {
  const [routes, setRoutes] = useState([]);
  const [routeId, setRouteId] = useState("");
  const [vehicles, setVehicles] = useState([]);
  const [openSeatDialog, setOpenSeatDialog] = useState(false);
  const [activeVehicle, setActiveVehicle] = useState(null);
  const [reservedSeats, setReservedSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [farePerSeat, setFarePerSeat] = useState(200); // default fare; you can compute based on distance

  const navigate = useNavigate();

  useEffect(() => {
    API.get("/routes").then(r => setRoutes(r.data)).catch(console.error);
  }, []);

  useEffect(() => {
    if (!routeId) return setVehicles([]);
    API.get(`/vehicles/by-route/${routeId}`)
      .then(res => setVehicles(res.data))
      .catch(console.error);
  }, [routeId]);

  const openSeatMap = async (vehicle) => {
    // load existing bookings for that vehicle to block seats (optional)
    // For now, we'll call booking API to fetch all bookings for vehicle and collect seatNumbers
    try {
      const res = await API.get(`/bookings/vehicle/${vehicle._id}`);
      const bookedSeatNums = (res.data || []).flatMap(b => b.seatNumbers || []);
      setReservedSeats(bookedSeatNums);
    } catch (err) {
      // ignore if endpoint not present; reservedSeats empty
      setReservedSeats([]);
    }
    setActiveVehicle(vehicle);
    setSelectedSeats([]);
    setOpenSeatDialog(true);
  };

  const toggleSeat = (num) => {
    setSelectedSeats(prev => prev.includes(num) ? prev.filter(s => s !== num) : [...prev, num]);
  };

  const confirmSelection = () => {
    setOpenSeatDialog(false);
    // go to confirm page with booking data
    navigate("/book/confirm", { state: { vehicle: activeVehicle, routeId, seatNumbers: selectedSeats, totalFare: selectedSeats.length * farePerSeat } });
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Book a Ticket</Typography>

      <Typography>Select Route</Typography>
      <Select fullWidth value={routeId} onChange={(e) => setRouteId(e.target.value)} sx={{ mb: 2 }}>
        <MenuItem value="">-- choose route --</MenuItem>
        {routes.map(r => <MenuItem key={r._id} value={r._id}>{r.name}</MenuItem>)}
      </Select>

      <Grid container spacing={2}>
        {vehicles.map(v => (
          <Grid item xs={12} md={6} key={v._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{v.regNumber} — {v.model}</Typography>
                <Typography>Driver: {v.driverName || "N/A"}</Typography>
                <Typography>Capacity: {v.capacity}</Typography>
                <Typography>Route: {v.route?.name}</Typography>
                <Button sx={{ mt: 1 }} variant="contained" onClick={() => openSeatMap(v)}>Select Seats</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openSeatDialog} onClose={() => setOpenSeatDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Select seats for {activeVehicle?.regNumber}</DialogTitle>
        <DialogContent>
          <SeatMap capacity={activeVehicle?.capacity || 40} reserved={reservedSeats} selected={selectedSeats} onToggle={toggleSeat} />
          <Typography sx={{ mt: 2 }}>Selected: {selectedSeats.join(", ") || "none"}</Typography>
          <TextField label="Fare per seat" type="number" value={farePerSeat} onChange={(e) => setFarePerSeat(Number(e.target.value))} sx={{ mt: 2 }} fullWidth />
          <Typography sx={{ mt: 1 }}>Total: ₹{selectedSeats.length * farePerSeat}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSeatDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={confirmSelection} disabled={selectedSeats.length === 0}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

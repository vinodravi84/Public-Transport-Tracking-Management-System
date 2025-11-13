// src/pages/Track.jsx
import React, { useEffect, useState, useRef } from "react";
import { Container, Typography } from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import API from "../api/api";
import { useParams } from "react-router-dom";

const busIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/61/61221.png",
  iconSize: [36, 36],
  iconAnchor: [18, 36],
});

export default function Track() {
  const { vehicleId } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [pos, setPos] = useState([28.7041, 77.1025]); // default Delhi
  const mapRef = useRef();

  useEffect(() => {
    let iv;
    const fetch = async () => {
      try {
        const res = await API.get(`/vehicles/${vehicleId}`);
        setVehicle(res.data);
        if (res.data.currentLocation) {
          setPos([res.data.currentLocation.lat, res.data.currentLocation.lng]);
          // center map
          if (mapRef.current) {
            mapRef.current.setView([res.data.currentLocation.lat, res.data.currentLocation.lng], 13);
          }
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
    iv = setInterval(fetch, 5000);
    return () => clearInterval(iv);
  }, [vehicleId]);

  return (
    <Container sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom>Live Tracking</Typography>
      <div style={{ height: "60vh" }}>
        <MapContainer center={pos} zoom={10} style={{ height: "100%" }} whenCreated={mapInstance => (mapRef.current = mapInstance)}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {vehicle?.currentLocation && (
            <Marker position={[vehicle.currentLocation.lat, vehicle.currentLocation.lng]} icon={busIcon}>
              <Popup>
                {vehicle.regNumber} <br /> {vehicle.driverName}
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    </Container>
  );
}

import React, { useEffect, useState } from "react";
import API from "../api/api";

export default function DriverDashboard() {
  const [vehicle, setVehicle] = useState(null);
  const [tracking, setTracking] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    if (!user) return;

    const fetchVehicle = async () => {
      try {
        const res = await API.get(`/vehicles`);
        const myVehicle = res.data.find(v => v.driverName === user.email);

        setVehicle(myVehicle || null);
      } catch (err) {
        console.error("Failed to load assigned vehicle", err);
      }
    };

    fetchVehicle();
  }, [user]);

  const startTracking = () => {
    setTracking(true);

    const watchId = navigator.geolocation.watchPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          await API.post(`/vehicles/${vehicle._id}/tracking`, {
            lat: latitude,
            lng: longitude,
          });
        } catch (err) {
          console.error("Failed to update location", err);
        }
      },
      (error) => console.error("Location error:", error),
      { enableHighAccuracy: true }
    );

    localStorage.setItem("driver_watch_id", watchId);
  };

  const stopTracking = async () => {
    setTracking(false);

    const watchId = localStorage.getItem("driver_watch_id");
    if (watchId) navigator.geolocation.clearWatch(watchId);

    await API.patch(`/vehicles/${vehicle._id}/tracking/stop`);
  };

  if (!user) return <h2>You must log in as Driver.</h2>;

  if (user.role !== "driver") return <h2>Unauthorized</h2>;

  if (!vehicle) return <h3>No vehicle assigned to your driver account.</h3>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Driver Dashboard</h1>
      <h2>Welcome, {user.name}</h2>

      <div style={{ marginTop: 20 }}>
        <h3>Your Vehicle</h3>
        <p><strong>Vehicle No:</strong> {vehicle.regNumber}</p>
        <p><strong>Route:</strong> {vehicle.route?.start} → {vehicle.route?.end}</p>

        {!tracking ? (
          <button
            onClick={startTracking}
            style={{
              marginTop: 20,
              padding: "12px 20px",
              background: "green",
              color: "white",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
            }}
          >
            ▶ START SHARING LOCATION
          </button>
        ) : (
          <button
            onClick={stopTracking}
            style={{
              marginTop: 20,
              padding: "12px 20px",
              background: "red",
              color: "white",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
            }}
          >
            ■ STOP SHARING
          </button>
        )}
      </div>
    </div>
  );
}

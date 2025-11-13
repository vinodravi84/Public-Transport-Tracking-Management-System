import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import LoginForm from "./components/LoginForm";
import Vehicles from "./pages/Vehicles";
import Navbar from "./components/Navbar";
import NotFound from "./pages/NotFound";
import RegisterForm from "./components/RegisterForm";
import AuthSuccess from "./pages/AuthSuccess";



// NEW IMPORTS for Booking System
import Book from "./pages/Book.js";
import ConfirmBooking from "./pages/ConfirmBooking.js";
import MyBookings from "./pages/MyBooking.js";
import Track from "./pages/Track.js";

function App() {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const syncUserFromStorage = useCallback(() => {
    try {
      const stored = localStorage.getItem("user");
      setUser(stored ? JSON.parse(stored) : null);
    } catch {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("storage", syncUserFromStorage);

    const onVisibility = () => {
      if (!document.hidden) syncUserFromStorage();
    };
    document.addEventListener("visibilitychange", onVisibility);

    window.addEventListener("userChanged", syncUserFromStorage);

    return () => {
      window.removeEventListener("storage", syncUserFromStorage);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("userChanged", syncUserFromStorage);
    };
  }, [syncUserFromStorage]);

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm setUser={setUser} />} />
        <Route path="/register" element={<RegisterForm />} />

        {/* Google Auth */}
        <Route path="/auth/success" element={<AuthSuccess />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard user={user} />} />

        {/* Vehicles (Admin only later) */}
        <Route path="/vehicles" element={<Vehicles user={user} />} />

        {/* BOOKING SYSTEM ROUTES */}
        <Route path="/book" element={<Book />} />
        <Route path="/book/confirm" element={<ConfirmBooking />} />
        <Route path="/bookings" element={<MyBookings />} />
        <Route path="/track/:vehicleId" element={<Track />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        
        {/* Logo Click → Home */}
        <h1 
          className="navbar-logo" 
          onClick={() => navigate("/")} 
          style={{ cursor: "pointer" }}
        >
          PT Tracker
        </h1>

        <div className="navbar-menu">

          {/* Always Visible */}
          <Link to="/" className="navbar-link">Home</Link>

          {/* Logged Out */}
          {!user && (
            <>
              <Link to="/login" className="navbar-link">Login</Link>
              <Link to="/register" className="navbar-link">Register</Link>
            </>
          )}

          {/* Logged In */}
          {user && (
            <>
              {/* Passenger Booking Flow */}
              <Link to="/book" className="navbar-link">Book Ticket</Link>
              <Link to="/bookings" className="navbar-link">My Bookings</Link>

              {/* Dashboard & Vehicles (temporary for demo) */}
              <Link to="/dashboard" className="navbar-link">Dashboard</Link>
              <Link to="/vehicles" className="navbar-link">Vehicles</Link>

              {/* Logout */}
              <button onClick={handleLogout} className="navbar-button">
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

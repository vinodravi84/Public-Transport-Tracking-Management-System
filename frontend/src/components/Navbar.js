import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  const role = user?.role;

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <h1
          className="navbar-logo"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          PT Tracker
        </h1>

        <div className="navbar-menu">

          {/* Public */}
          <Link to="/" className="navbar-link">Home</Link>

          {/* Not Logged In */}
          {!user && (
            <>
              <Link to="/login" className="navbar-link">Login</Link>
              <Link to="/register" className="navbar-link">Register</Link>
            </>
          )}

          {/* Passenger Menu */}
          {user && role === "passenger" && (
            <>
              <Link to="/book" className="navbar-link">Book Ticket</Link>
              <Link to="/bookings" className="navbar-link">My Bookings</Link>
              <Link to="/dashboard" className="navbar-link">Dashboard</Link>

              <button onClick={handleLogout} className="navbar-button">
                Logout
              </button>
            </>
          )}

          {/* Driver Menu */}
          {user && role === "driver" && (
            <>
              <Link to="/driver" className="navbar-link">Driver Panel</Link>
              <button onClick={handleLogout} className="navbar-button">
                Logout
              </button>
            </>
          )}

          {/* Admin Menu — CLEANED, ONLY ONE ENTRY */}
          {user && role === "admin" && (
            <>
              <Link to="/admin" className="navbar-link">Admin Panel</Link>

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

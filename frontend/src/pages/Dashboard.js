import React from "react";
import "../styles/Dashboard.css";

const Dashboard = ({ user }) => {
  // If user is undefined or role is missing, show a message
  if (!user || !user.role) {
    return (
      <div className="dashboard-container">
        <div className="error-message-dashboard">
          <span className="error-icon">⚠️</span>
          Please login to access the dashboard.
        </div>
      </div>
    );
  }

  const role = user.role || "passenger"; // fallback

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Dashboard</h1>
          <p className="dashboard-welcome">Welcome, {user.name || "User"}!</p>
          <span className="dashboard-role">{role.toUpperCase()}</span>
        </div>

        {role === "admin" ? (
          <div className="dashboard-grid">
            <div className="dashboard-card">
              <div className="card-icon">🚍</div>
              <h2 className="card-title">Fleet Overview</h2>
              <p className="card-description">
                Manage vehicles, routes, and schedules.
              </p>
            </div>
            <div className="dashboard-card">
              <div className="card-icon">📊</div>
              <h2 className="card-title">Passenger Analytics</h2>
              <p className="card-description">
                View passenger counts, busy routes, and occupancy trends.
              </p>
            </div>
          </div>
        ) : (
          <div className="dashboard-grid">
            <div className="dashboard-card dashboard-card-full">
              <div className="card-icon">📍</div>
              <h2 className="card-title">Live Vehicle Tracking</h2>
              <p className="card-description">
                See real-time locations of buses and autos on your routes.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
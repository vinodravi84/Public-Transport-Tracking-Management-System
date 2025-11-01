import React from "react";
import "../styles/Home.css";

const Home = () => (
  <div className="home-container">
    <div className="home-content">
      <div className="home-hero">
        <div className="hero-icon">🚌</div>
        <h1 className="home-title">Public Transport Tracker</h1>
        <p className="home-description">
          Real-time vehicle tracking, ETA predictions, and fleet management for small cities.
        </p>
        <div className="home-features">
          <div className="feature-item">
            <span className="feature-icon">📍</span>
            <span className="feature-text">Live Tracking</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">⏱️</span>
            <span className="feature-text">ETA Predictions</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🚦</span>
            <span className="feature-text">Fleet Management</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Home;
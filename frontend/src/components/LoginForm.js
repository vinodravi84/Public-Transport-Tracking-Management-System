import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import "../styles/LoginForm.css";

const LoginForm = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [role, setRole] = useState("passenger"); // NEW ROLE STATE

  const navigate = useNavigate();
  const backendURL = process.env.REACT_APP_API_URL;

  const handleGoogleLogin = () => {
    if (role !== "passenger") {
      alert("Google login allowed only for passengers.");
      return;
    }
    window.location.href = `${backendURL}/auth/google`;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await API.post("/auth/login", { email, password });
      const user = res.data.user;

      // Ensure role matches selected role
      if (user.role !== role) {
        setError(`Invalid role. You are registered as: ${user.role}`);
        setLoading(false);
        return;
      }

      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", res.data.token);

      // Redirect based on role
      if (user.role === "admin") navigate("/admin");
      else if (user.role === "driver") navigate("/driver");
      else navigate("/dashboard");

    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <h1 className="login-title">
          Login as {role.charAt(0).toUpperCase() + role.slice(1)}
        </h1>

        {/* ROLE SELECTOR */}
        <div className="role-switcher">
          <button
            className={role === "passenger" ? "active-role" : ""}
            onClick={() => setRole("passenger")}
          >
            Passenger
          </button>
          <button
            className={role === "driver" ? "active-role" : ""}
            onClick={() => setRole("driver")}
          >
            Driver
          </button>
          <button
            className={role === "admin" ? "active-role" : ""}
            onClick={() => setRole("admin")}
          >
            Admin
          </button>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              id="email"
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              id="password"
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          {error && (
            <div className="error-message">
              <span className="error-icon">⚠️</span>
              {error}
            </div>
          )}

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? <> <span className="spinner"></span> Logging in... </> : "Login"}
          </button>
        </form>

        {/* GOOGLE LOGIN FOR PASSENGERS ONLY */}
        <div className="google-login-container">
          <button className="google-login-btn" onClick={handleGoogleLogin}>
            Continue with Google (Passengers)
          </button>
        </div>

        <div className="register-link">
          New Passenger?{" "}
          <button type="button" className="link-button" onClick={() => navigate("/register")}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

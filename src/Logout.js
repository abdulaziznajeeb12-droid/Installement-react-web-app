// src/components/Logout.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove user info from localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("token"); // if you use token-based auth
    localStorage.removeItem("loggedInUser"); // if your project used this name

    // Redirect to login after logout
    navigate("/login");
  }, [navigate]);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="text-center">
        <div className="spinner-border text-danger mb-3" role="status"></div>
        <h5>Signing out...</h5>
      </div>
    </div>
  );
}

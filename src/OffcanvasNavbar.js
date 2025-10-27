import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./App.css";

export default function OffcanvasNavbar() {
  const navigate = useNavigate();

  // 🔒 Handle Sign Out
  const handleLogout = () => {
    // Remove stored user info
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");

    // Redirect to login
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">🛒 My Store</h2>
      <nav className="sidebar-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/Configuration" className="nav-link">Configuration</Link>
        <Link to="/Electronics" className="nav-link">Electronics</Link>
        <Link to="/components/ProductManager" className="nav-link">Product</Link>
        <Link to="/components/CustomerManager" className="nav-link">Customer</Link>
        <Link to="/components/StockManager" className="nav-link">Stock List</Link>
        <Link to="/Expense" className="nav-link">Expense</Link>
        <Link to="/Calculator" className="nav-link">Installment</Link>
        <Link to="/components/SalesHistory" className="nav-link">Sales History</Link>


        {/* 🚪 Logout Button */}
        <button
          onClick={handleLogout}
          className="btn btn-danger w-100 mt-3"
          style={{ borderRadius: "8px" }}
        >
          🔓 Logout
        </button>
      </nav>
    </div>
  );
}

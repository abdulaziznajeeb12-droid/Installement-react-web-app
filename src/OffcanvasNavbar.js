import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

export default function OffcanvasNavbar() {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">🛒 My Store</h2>
      <nav className="sidebar-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/Configuration" className="nav-link">Configuration</Link>
        <Link to="/Electronics" className="nav-link">Electronics</Link>
        <Link to="/Expense" className="nav-link">Expense</Link>
        <Link to="/Calculator" className="nav-link"> Instalment </Link>
      </nav>
    </div>
  );
}

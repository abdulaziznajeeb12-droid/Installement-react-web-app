import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Home,
  Settings,
  Cpu,
  Users,
  Package,
  DollarSign,
  Calculator,
  Clock,
  LogOut,
} from "lucide-react";
import "./OffcanvasNavbar.css";

export default function OffcanvasNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>🛒 My Store</h3>
      </div>

      <nav className="sidebar-menu">
        <Link to="/" className="nav-link">
          <Home size={18} className="me-2" /> Home
        </Link>
        <Link to="/Configuration" className="nav-link">
          <Settings size={18} className="me-2" /> Configuration
        </Link>
        <Link to="/Electronics" className="nav-link">
          <Cpu size={18} className="me-2" /> Electronics
        </Link>
        {/* <Link to="/components/ProductManager" className="nav-link">
          <Package size={18} className="me-2" /> Product
        </Link>
        <Link to="/components/CustomerManager" className="nav-link">
          <Users size={18} className="me-2" /> Customer
        </Link> */}
        <Link to="/components/StockManager" className="nav-link">
          <Package size={18} className="me-2" /> Stock List
        </Link>
        <Link to="/Expense" className="nav-link">
          <DollarSign size={18} className="me-2" /> Expense
        </Link>
        <Link to="/Calculator" className="nav-link">
          <Calculator size={18} className="me-2" /> Installment
        </Link>
        <Link to="/components/SalesHistory" className="nav-link">
          <Clock size={18} className="me-2" /> Sales History
        </Link>
      </nav>

      <div className="logout-section">
        <button onClick={handleLogout} className="logout-btn">
          <LogOut size={18} className="me-2" /> Logout
        </button>
      </div>
    </div>
  );
}

import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OffcanvasNavbar from "./OffcanvasNavbar";
import Configuration from "./Configuration";
import Electronics from "./Electronics";
import Home from "./Home";
import Expense from "./Expense";
import Calculator from "./Calculator";
import { ProductProvider } from "./context/ProductContext";
import Login from "./Login";
import Register from "./Register";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <ProductProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
            
          {/* Protected routes */}
          <Route
            path="/*"
            element={
              <PrivateRoute>
                <div style={{ display: "flex" }}>
                  <OffcanvasNavbar />
                  <div style={{ marginLeft: "240px", padding: "20px", width: "100%" }}>

                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/Configuration" element={<Configuration />} />
                      <Route path="/Electronics" element={<Electronics />} />
                      <Route path="/Expense" element={<Expense />} />
                      <Route path="/Calculator" element={<Calculator />} />
                    </Routes>
                  </div>
                </div>
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </ProductProvider>
  );
}

export default App;

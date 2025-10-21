// src/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Card } from "react-bootstrap";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const matchedUser = storedUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (matchedUser) {
      localStorage.setItem("loggedIn", "true");
      navigate("/");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Card style={{ width: "400px", padding: "20px", borderRadius: "12px" }}>
        <h3 className="text-center mb-3">🔐 Login</h3>
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter email"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter password"
            />
          </Form.Group>

          <Button type="submit" variant="primary" className="w-100">
            Login
          </Button>
        </Form>

        <p className="mt-3 text-center">
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </Card>
    </div>
  );
}

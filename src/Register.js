// src/Register.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Card, Alert } from "react-bootstrap";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const exists = users.find((user) => user.email === email);
    if (exists) {
      setError("User already exists!");
      return;
    }

    users.push({ email, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("✅ Registered successfully!");
    navigate("/login");
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Card style={{ width: "400px", padding: "20px", borderRadius: "12px" }}>
        <h3 className="text-center mb-3">📝 Register</h3>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleRegister}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              placeholder="Min 6 characters"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button type="submit" variant="success" className="w-100">
            Register
          </Button>
        </Form>

        <p className="mt-3 text-center">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </Card>
    </div>
  );
}

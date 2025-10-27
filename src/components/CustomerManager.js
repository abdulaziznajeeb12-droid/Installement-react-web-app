import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Button, Form, Table } from "react-bootstrap";

export default function CustomerManager() {
  const { customers, setCustomers } = useContext(AppContext);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", address: "", cnic: "", contact: "" });
  const [editing, setEditing] = useState();

  const handleSave = () => {
    if (!form.name || !form.address || !form.cnic || !form.contact)
      return alert("Please fill all fields!");

    if (editing) {
      // ✅ Edit existing customer
      setCustomers(
        customers.map((c) =>
          c.id === editing ? { ...form, id: editing } : c
        )
      );
      setEditing(null);
    } else {
      // ✅ Add new customer
      setCustomers([...customers, { ...form, id: Date.now() }]);
    }

    setForm({ name: "", address: "", cnic: "", contact: "" });
    setShowForm(false);
  };

  const handleEdit = (customer) => {
    setForm(customer);
    setEditing(customer.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure to delete this customer?")) {
      setCustomers(customers.filter((p) => p.id !== id));
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-end mb-3">
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? "Close Form" : "+ Add Customer"}
        </Button>
      </div>

      {showForm && (
        <Form className="mt-2">
          <Form.Control
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="mb-2"
          />
          <Form.Control
            placeholder="Address"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            className="mb-2"
          />
          <Form.Control
            placeholder="CNIC"
            value={form.cnic}
            onChange={(e) => setForm({ ...form, cnic: e.target.value })}
            className="mb-2"
          />
          <Form.Control
            placeholder="Contact Number"
            value={form.contact}
            onChange={(e) => setForm({ ...form, contact: e.target.value })}
            className="mb-2"
          />
          <Button onClick={handleSave}>Save</Button>
        </Form>
      )}

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <td>#</td>
            <th>Name</th>
            <th>Address</th>
            <th>CNIC</th>
            <th>Contact</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c, i) => (
            <tr key={c.id}>
              <td>{i + 1}</td>
              <td>{c.name}</td>
              <td>{c.address}</td>
              <td>{c.cnic}</td>
              <td>{c.contact}</td>
              <td>
                <Button
                  size="sm"
                  variant="info"
                  className="me-2"
                  onClick={() => handleEdit(c)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  className="me-2"
                  onClick={() => handleDelete(c.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

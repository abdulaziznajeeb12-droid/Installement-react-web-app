import React, { useState, useContext } from "react";
import { Button, Table } from "react-bootstrap";
import { AppContext } from "../context/AppContext";
import UserFormModal from "./UserFormModals";

export default function UsersManager() {
  const { users, setUsers } = useContext(AppContext); // 🧠 from context
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    name: "",
    
    address: "",
    phone: "",
    status: "Active",
  });

  // ✅ Save User (Add or Edit)
  const handleSave = () => {
    if (!form.name  || !form.phone)
      return alert("Please fill all required fields!");

    if (editing) {
      // Update existing user
      setUsers(users.map((u) => (u.id === editing ? { ...form, id: editing } : u)));
    } else {
      // Add new user
      setUsers([...users, { ...form, id: Date.now() }]);
    }

    // Reset form
    setForm({
      name: "",
    
      address: "",
      phone: "",
      status: "Active",
    });
    setEditing(null);
    setShowForm(false);
  };

  // ✅ Edit User
  const handleEdit = (user) => {
    setForm(user);
    setEditing(user.id);
    setShowForm(true);
  };

  // ✅ Delete User
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  // ✅ Toggle Active/Inactive
  const toggleStatus = (id) => {
    setUsers(
      users.map((u) =>
        u.id === id
          ? { ...u, status: u.status === "Active" ? "Inactive" : "Active" }
          : u
      )
    );
  };

  return (
    <div className="container mt-3">
      {/* Add Button */}
      <div className="d-flex justify-content-end mb-3">
        <Button onClick={() => setShowForm(!showForm)} variant="primary">
          {showForm ? "Close Form" : "+ Add User"}
        </Button>
      </div>

      {/* User Modal */}
      <UserFormModal
        show={showForm}
        onHide={() => {
          setShowForm(false);
          setEditing(null);
        }}
        form={form}
        setForm={setForm}
        onSave={handleSave}
      />

      {/* User Table */}
      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users && users.length > 0 ? (
            users.map((u, i) => (
              <tr key={u.id}>
                <td>{i + 1}</td>
                <td>{u.name}</td>
                
                <td>{u.address}</td>
                <td>{u.phone}</td>
                <td>
                  <span
                    className={`badge ${
                      u.status === "Active" ? "bg-success" : "bg-secondary"
                    }`}
                  >
                    {u.status}
                  </span>
                </td>
                <td>
                  <Button
                    size="sm"
                    variant="info"
                    className="me-2"
                    onClick={() => handleEdit(u)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    className="me-2"
                    onClick={() => handleDelete(u.id)}
                  >
                    Delete
                  </Button>
                  <Button
                    size="sm"
                    variant={u.status === "Active" ? "secondary" : "success"}
                    onClick={() => toggleStatus(u.id)}
                  >
                    {u.status === "Active" ? "Deactivate" : "Activate"}
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}

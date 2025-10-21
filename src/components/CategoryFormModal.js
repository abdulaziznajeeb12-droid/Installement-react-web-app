import React, { useState, useEffect, useContext } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { AppContext } from "../context/AppContext";

export default function CategoryFormModal({ show, handleClose, editCategory }) {
  const { categories, setCategories } = useContext(AppContext);
  const [form, setForm] = useState({ name: "", status: "Active" });

  useEffect(() => {
    if (editCategory) setForm(editCategory);
    else setForm({ name: "", status: "Active" });
  }, [editCategory]);

  const handleSave = () => {
    if (!form.name.trim()) return alert("Please enter category name.");

    if (editCategory) {
      // Edit existing
      const updated = categories.map((c) =>
        c.id === editCategory.id ? form : c
      );
      setCategories(updated);
    } else {
      // Add new
      const newCat = { ...form, id: Date.now() };
      setCategories([...categories, newCat]);
    }

    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{editCategory ? "Edit Category" : "Add Category"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Category Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter category name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Status</Form.Label>
            <Form.Select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <option>Active</option>
              <option>Inactive</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

import React, { useContext, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { AppContext } from "../context/AppContext";
import CategoryFormModal from "./CategoryFormModal";

export default function CategoryManager() {
  const { categories, setCategories } = useContext(AppContext);
  const [showModal, setShowModal] = useState(false);
  const [editCategory, setEditCategory] = useState(null);

  const handleAdd = () => {
    setEditCategory(null);
    setShowModal(true);
  };

  const handleEdit = (cat) => {
    setEditCategory(cat);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this category?")) {
      const updated = categories.filter((c) => c.id !== id);
      setCategories(updated);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>📂 Category Manager</h4>
        <Button variant="primary" onClick={handleAdd}>
          + Add Category
        </Button>
      </div>

      {categories.length === 0 ? (
        <p className="text-muted text-center">No categories added yet.</p>
      ) : (
        <Table bordered hover responsive>
          <thead className="table-dark text-center">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {categories.map((cat, index) => (
              <tr key={cat.id}>
                <td>{index + 1}</td>
                <td>{cat.name}</td>
                <td>
                  <span
                    className={`badge ${
                      cat.status === "Active" ? "bg-success" : "bg-secondary"
                    }`}
                  >
                    {cat.status}
                  </span>
                </td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEdit(cat)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(cat.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Modal */}
      <CategoryFormModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        editCategory={editCategory}
      />
    </div>
  );
}

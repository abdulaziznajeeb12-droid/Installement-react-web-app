import React, { useState, useContext } from "react";
import { Button, Table } from "react-bootstrap";
import { AppContext } from "../context/AppContext";
import ProductFormModal from "./ProductFormModal";

export default function ProductManager() {
  const { products, setProducts, categories } = useContext(AppContext);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState({
    name: "",
    brand: "",
    model: "",
    color: "",
    size: "",
    price: "",
    oldPrice: "",
  
    quantity: "",
    warranty: "",
    
    img: "",
    category: "",
    status: "Active",
  });

  // ✅ Save Product (Add or Edit)
  const handleSave = () => {
    if (!form.name || !form.price || !form.category)
      return alert("Please fill all required fields!");

    if (editing) {
      // Update existing product
      setProducts(
        products.map((p) => (p.id === editing ? { ...form, id: editing } : p))
      );
    } else {
      // Add new product
      setProducts([...products, { ...form, id: Date.now() }]);
    }

    // Reset form
    setForm({
      name: "",
      brand: "",
      model: "",
      color: "",
      size: "",
      price: "",
      oldPrice: "",
    
      quantity: "",
      warranty: "",
    
      img: "",
      category: "",
      status: "Active",
    });
    setEditing(null);
    setShowForm(false);
  };

  // ✅ Edit Product
  const handleEdit = (product) => {
    setForm(product);
    setEditing(product.id);
    setShowForm(true);
  };

  // ✅ Delete Product
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  // ✅ Toggle Active/Inactive
  const toggleStatus = (id) => {
    setProducts(
      products.map((p) =>
        p.id === id
          ? { ...p, status: p.status === "Active" ? "Inactive" : "Active" }
          : p
      )
    );
  };

  return (
    <div className="container ">
      {/* Add Button */}
            {/* <h2>Product</h2> */}

      <div className="d-flex justify-content-end mb-3">
        <Button onClick={() => setShowForm(!showForm)} variant="primary">
          {showForm ? "Close Form" : "+ Add Product"}
        </Button>
      </div>

      {/* Product Form Modal */}
      <ProductFormModal
        show={showForm}
        onHide={() => {
          setShowForm(false);
          setEditing(null);
        }}
        form={form}
        setForm={setForm}
        onSave={handleSave}
        categories={categories}
      />

      {/* Product Table */}
      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Brand</th>
            <th>Model</th>
            <th>Category</th>
            <th>Color</th>
            <th>Size</th>
            <th>Sell Price</th>
            <th>Qty</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((p, i) => (
              <tr key={p.id}>
                <td>{i + 1}</td>
                <td>{p.name}</td>
                <td>{p.brand}</td>
                <td>{p.model}</td>
                <td>{p.category}</td>
                <td>{p.color}</td>
                <td>{p.size}</td>
                <td>{p.price}</td>
                <td>{p.quantity}</td>
                <td>
                  <span
                    className={`badge ${
                      p.status === "Active" ? "bg-success" : "bg-secondary"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td>
                  <Button
                    size="sm"
                    variant="info"
                    className="me-2"
                    onClick={() => handleEdit(p)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    className="me-2"
                    onClick={() => handleDelete(p.id)}
                  >
                    Delete
                  </Button>
                  <Button
                    size="sm"
                    variant={p.status === "Active" ? "secondary" : "success"}
                    onClick={() => toggleStatus(p.id)}
                  >
                    {p.status === "Active" ? "Deactivate" : "Activate"}
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="11" className="text-center">
                No products found
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}

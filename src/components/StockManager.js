import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Button, Form, Table } from "react-bootstrap";

export default function StockManager() {
  const { products, setProducts } = useContext(AppContext);
  const [form, setForm] = useState({
    product: "",
    size: "",
    color: "",
    brand: "",
    quantity: "",
    price: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleAdd = () => {
    if (!form.product || !form.quantity) {
      alert("Please fill all fields!");
      return;
    }

    // agar product pehle se exist karta hai to update qty
    const existing = products.find((p) => p.name === form.product);
    if (existing) {
      setProducts(
        products.map((p) =>
          p.name === form.product
            ? { ...p, quantity: p.quantity + Number(form.quantity) }
            : p
        )
      );
    } else {
      setProducts([
        ...products,
        {
          id: Date.now(),
          name: form.product,
          size: form.size,
          color: form.color,
          brand: form.brand,
          quantity: Number(form.quantity),
          price: Number(form.price),
        },
      ]);
    }

    setForm({
      product: "",
      size: "",
      color: "",
      brand: "",
      quantity: "",
      price: "",
    });
  };

  // Sell function
  const handleSell = (name) => {
    setProducts(
      products.map((p) =>
        p.name === name && p.quantity > 0
          ? { ...p, quantity: p.quantity - 1 }
          : p
      )
    );
  };

  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="container mt-4">
      <h3>📦 Stock Manager</h3>

      <Form className="row g-3 mt-2">
        <div className="col-md-3">
          <Form.Control
            name="product"
            value={form.product}
            onChange={handleChange}
            placeholder="Product Name"
          />
        </div>
        <div className="col-md-2">
          <Form.Control
            name="size"
            value={form.size}
            onChange={handleChange}
            placeholder="Size"
          />
        </div>
        <div className="col-md-2">
          <Form.Control
            name="color"
            value={form.color}
            onChange={handleChange}
            placeholder="Color"
          />
        </div>
        <div className="col-md-2">
          <Form.Control
            name="brand"
            value={form.brand}
            onChange={handleChange}
            placeholder="Brand"
          />
        </div>
        <div className="col-md-1">
          <Form.Control
            type="number"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            placeholder="Qty"
          />
        </div>
        <div className="col-md-2">
          <Form.Control
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
          />
        </div>
        <div className="col-md-2">
          <Button className="w-100" onClick={handleAdd}>
            ➕ Add Stock
          </Button>
        </div>
      </Form>

      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Product</th>
            <th>Size</th>
            <th>Color</th>
            <th>Brand</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, i) => (
            <tr key={p.id}>
              <td>{i + 1}</td>
              <td>{p.name}</td>
              <td>{p.size}</td>
              <td>{p.color}</td>
              <td>{p.brand}</td>
              <td>{p.quantity}</td>
              <td>{p.price}</td>
              <td>{p.price * p.quantity}</td>
              <td>
                <Button
                  size="sm"
                  variant="success"
                  onClick={() => handleSell(p.name)}
                >
                  💸 Sell
                </Button>{" "}
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => handleDelete(p.id)}
                >
                  🗑️
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

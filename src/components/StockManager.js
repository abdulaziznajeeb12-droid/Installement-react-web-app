import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Button, Form, Table } from "react-bootstrap";

export default function StockManager() {
  const { products, setProducts } = useContext(AppContext);
  const [search, setSearch] = useState("");
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

  // ✅ Filter products according to search
  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase()) ||
      p.color.toLowerCase().includes(search.toLowerCase()) ||
      p.size.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container ">
      <h2>Stock Manager</h2>

      <Form.Control
        type="text"
        placeholder="Search by name, brand, color, or size..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4"
      />

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
          {filteredProducts.map((p, i) => (
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
      <p>.</p>
    </div>
  );
}

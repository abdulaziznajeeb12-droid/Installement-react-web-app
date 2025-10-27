import React, { useContext, useState } from "react";
import { AppContext } from "./context/AppContext";
import { Form, Button, Table } from "react-bootstrap";

export default function Calculator() {
  const { customers, categories, products, setSales } = useContext(AppContext);

  const [form, setForm] = useState({
    customer: "",
    category: "",
    product: "",
    color: "",
    brand: "",
    model: "",
    markup: 0,
    months: 3,
    advance: 0,
  });

  const [addedItems, setAddedItems] = useState([]);
  const [confirmed, setConfirmed] = useState(false);

  // input change handler
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // add product item
  const handleAdd = () => {
    if (!form.customer || !form.category || !form.product)
      return alert("Please select all required fields!");

    const product = products.find((p) => p.name === form.product);
    if (!product) return alert("Product not found!");

    const newItem = {
      ...product,
      id: Date.now(),
    };

    setAddedItems((prev) => [...prev, newItem]);
    setForm({ ...form, product: "" }); // clear product only
  };

  const handleConfirmSale = () => {
    if (addedItems.length === 0) return alert("No items added!");
    setConfirmed(true);
  };

  const handleSave = () => {
    const total = addedItems.reduce((sum, i) => sum + parseFloat(i.price || 0), 0);
    const balance = total - form.advance;

    const perMonth = balance / form.months;
    const newInstallments = Array.from({ length: form.months }, (_, i) => ({
      id: i + 1,
      month: `Month ${i + 1}`,
      amount: perMonth.toFixed(2),
      status: "Unpaid",
    }));

    const newSale = {
      id: Date.now(),
      customer: form.customer,
      
      category: form.category,
      items: addedItems,
      totalAmount: total,
      advance: form.advance,
      balance,
      months: form.months,
      date: new Date().toLocaleDateString(),
      installments: newInstallments,
    };

    // Save in context + localStorage
    setSales((prev) => [newSale, ...prev]);
    localStorage.setItem(
      "sales",
      JSON.stringify([newSale, ...JSON.parse(localStorage.getItem("sales") || "[]")])
    );

    // reset form
    setAddedItems([]);
    setConfirmed(false);
    setForm({
      customer: "",
      category: "",
      product: "",
      color: "",
      brand: "",
      model: "",
      markup: 0,
      months: 3,
      advance: 0,
    });

    alert("✅ Sale saved successfully!");
  };

  return (
    <div className="container mt-4">
      <h3>💰 Sale Calculator</h3>
      <Form>
        {/* Customer (Disabled after first item) */}
        <Form.Group className="mb-2">
          <Form.Label>Customer</Form.Label>
          <Form.Select
            name="customer"
            value={form.customer}
            onChange={handleChange}
            disabled={addedItems.length > 0} // 👈 disabled when items exist
          >
            <option value="">Select Customer</option>
            {customers.map((c, i) => (
              <option key={i}>{c.name}</option>
            ))}
          </Form.Select>
        </Form.Group>

      

        {/* Product (Can be changed for adding multiple items) */}
        <Form.Group className="mb-2">
          <Form.Label>Category</Form.Label>
          <Form.Select
            name="category"
            value={form.category}
            onChange={handleChange}
        
          >
            <option value="">Select Category</option>
            {categories.map((cat, i) => (
              <option key={i}>{cat.name}</option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Product</Form.Label>
          <Form.Select
            name="product"
            value={form.product}
            onChange={handleChange}
          >
            <option value="">Select Product</option>
            {products
              .filter((p) => p.category === form.category)
              .map((p, i) => (
                <option key={i}>{p.name}</option>
              ))}
          </Form.Select>
        </Form.Group>

        {!confirmed && (
          <Button className="mt-2" onClick={handleAdd}>
            ➕ Add Item
          </Button>
        )}
      </Form>

      {/* Added Items Table */}
      {addedItems.length > 0 && (
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {addedItems.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.price}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {!confirmed && addedItems.length > 0 && (
        <Button variant="success" onClick={handleConfirmSale}>
          ✅ Confirm Sale
        </Button>
      )}

      {/* Show markup/advance/months only after confirmation */}
      {confirmed && (
        <div className="mt-3 border rounded p-3 bg-light">
          <Form.Group>
            <Form.Label>Markup %</Form.Label>
            <Form.Control
              type="number"
              name="markup"
              value={form.markup}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Advance</Form.Label>
            <Form.Control
              type="number"
              name="advance"
              value={form.advance}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Months</Form.Label>
            <Form.Control
              type="number"
              name="months"
              value={form.months}
              onChange={handleChange}
            />
          </Form.Group>

          <Button className="mt-3" variant="primary" onClick={handleSave}>
            💾 Save Sale
          </Button>
        </div>
      )}
    </div>
  );
}

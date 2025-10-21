import React, { useContext, useState } from "react";
import { AppContext } from "./context/AppContext";
import { Form, Button, Card, Row, Col } from "react-bootstrap";

export default function Calculator() {
  const { customers, categories, products, setProducts } = useContext(AppContext);

  const [form, setForm] = useState({
    customer: "",
    category: "",
    product: "",
    markup: 0,
    months: 3,
    advance: 0,
  });

  const [summary, setSummary] = useState(null);
  const [installments, setInstallments] = useState([]);

  const selectedProduct = products.find((p) => p.name === form.product);
  const basePrice = selectedProduct ? parseFloat(selectedProduct.price) : 0;
  const markupAmount = (basePrice * form.markup) / 100;
  const totalAmount = basePrice + markupAmount;
  const balance = totalAmount - form.advance;

  const handleConfirm = () => {
    if (!form.customer || !form.category || !form.product)
      return alert("Please select customer, category & product first!");

    if (!selectedProduct) return alert("Invalid product selected!");

    if (selectedProduct.quantity <= 0)
      return alert("⚠️ Product is out of stock!");

    // 🔻 decrease quantity
    setProducts((prev) =>
      prev.map((p) =>
        p.name === form.product ? { ...p, quantity: p.quantity - 1 } : p
      )
    );

    // generate installments
    const perMonth = balance / form.months;
    const newInstallments = Array.from({ length: form.months }, (_, i) => ({
      id: i + 1,
      month: `Month ${i + 1}`,
      amount: perMonth.toFixed(2),
      status: "Pending",
    }));

    setInstallments(newInstallments);

    setSummary({
      customer: form.customer,
      category: form.category,
      product: form.product,
      basePrice,
      markup: form.markup,
      totalAmount: totalAmount.toFixed(2),
      advance: form.advance,
      balance: balance.toFixed(2),
      months: form.months,
    });

    alert("✅ Sale confirmed & installments generated!");
  };

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-3">🧮 Installment Calculator</h3>

      <Form className="border rounded p-4 bg-light shadow-sm">
        <Row className="mb-3">
          <Col md={4}>
            <Form.Group>
              <Form.Label>Customer</Form.Label>
              <Form.Select
                value={form.customer}
                onChange={(e) => setForm({ ...form, customer: e.target.value })}
              >
                <option value="">Select Customer</option>
                {customers.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group>
              <Form.Label>Category</Form.Label>
              <Form.Select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                <option value="">Select Category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group>
              <Form.Label>Product</Form.Label>
              <Form.Select
                value={form.product}
                onChange={(e) => setForm({ ...form, product: e.target.value })}
              >
                <option value="">Select Product</option>
                {products
                  .filter((p) => p.category === form.category)
                  .map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name} — Rs.{p.price} (Stock: {p.quantity})
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={3}>
            <Form.Group>
              <Form.Label>Markup %</Form.Label>
              <Form.Control
                type="number"
                placeholder="0–100%"
                min="0"
                max="100"
                value={form.markup}
                onChange={(e) =>
                  setForm({ ...form, markup: parseFloat(e.target.value) || 0 })
                }
              />
            </Form.Group>
          </Col>

          <Col md={3}>
            <Form.Group>
              <Form.Label>Total Amount</Form.Label>
              <Form.Control
                type="text"
                readOnly
                value={totalAmount ? `Rs. ${totalAmount.toFixed(2)}` : ""}
              />
            </Form.Group>
          </Col>

          <Col md={3}>
            <Form.Group>
              <Form.Label>Advance Received</Form.Label>
              <Form.Control
                type="number"
                placeholder="Advance"
                value={form.advance}
                onChange={(e) =>
                  setForm({ ...form, advance: parseFloat(e.target.value) || 0 })
                }
              />
            </Form.Group>
          </Col>

          <Col md={3}>
            <Form.Group>
              <Form.Label>Months</Form.Label>
              <Form.Select
                value={form.months}
                onChange={(e) =>
                  setForm({ ...form, months: parseInt(e.target.value) })
                }
              >
                {Array.from({ length: 36 }, (_, i) => i + 1).map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={3}>
            <Form.Group>
              <Form.Label>Balance</Form.Label>
              <Form.Control
                type="text"
                readOnly
                value={balance ? `Rs. ${balance.toFixed(2)}` : ""}
              />
            </Form.Group>
          </Col>

          <Col md={3} className="d-flex align-items-end">
            <Button variant="primary" className="w-100" onClick={handleConfirm}>
              Confirm Sale
            </Button>
          </Col>
        </Row>
      </Form>

      {/* Summary Card */}
      {summary && (
        <Card className="mt-4 shadow">
          <Card.Header as="h5" className="bg-primary text-white">
            Sale Summary
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={6}>
                <p><strong>Customer:</strong> {summary.customer}</p>
                <p><strong>Category:</strong> {summary.category}</p>
                <p><strong>Product:</strong> {summary.product}</p>
              </Col>
              <Col md={6}>
                <p><strong>Total:</strong> Rs.{summary.totalAmount}</p>
                <p><strong>Advance:</strong> Rs.{summary.advance}</p>
                <p><strong>Balance:</strong> Rs.{summary.balance}</p>
                <p><strong>Months:</strong> {summary.months}</p>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      )}

      {/* Installment Cards */}
      {installments.length > 0 && (
        <div className="mt-4">
          
          {/* Installment Cards */}
{installments.length > 0 && (
  <div className="mt-4">

    {/* Installment Cards */}
{installments.length > 0 && (
  <div className="mt-4">
    <h4 className="mb-3 text-center">📅 Installments</h4>
    <Row>
      {installments.map((i) => (
        <Col md={4} key={i.id} className="mb-3">
          <Card
            className={`shadow-sm text-center p-3 border-0 rounded-4 ${
              i.status === "Paid" ? "bg-success text-white" : "bg-light"
            }`}
          >
            <h5>{i.month}</h5>
            <p className="mb-1">
              <strong>Amount:</strong> Rs.{i.amount}
            </p>
            
            <p className="mb-2">
              <strong>status:</strong>{" "}
              <span
                className={`badge ${
                  i.status === "Paid" ? "bg-white text-success" : "bg-warning"
                }`}
              >
                {i.status}
              </span>
            </p>

            {i.status !== "Paid" && (
              <Button
                variant="success"
                size="sm"
                onClick={() =>
                  setInstallments(
                    installments.map((inst) =>
                      inst.id === i.id ? { ...inst, status: "Paid" } : inst
                    )
                  )
                }
              >
                Mark as Paid
              </Button>
            )}
          </Card>
        </Col>
      ))}
    </Row>
  </div>
)}

  </div>
)}

        </div>
      )}
    </div>
  );
}

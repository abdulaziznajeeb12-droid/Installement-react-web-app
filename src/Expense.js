import React, { useState } from "react";
import { Card, Table, Form, Button } from "react-bootstrap";

export default function Expense() {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({ type: "", amount: "" });
  const [editIndex, setEditIndex] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or update expense
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.type || !form.amount)
      return alert("⚠️ Please fill all fields before adding.");

    const newExpense = {
      type: form.type,
      amount: parseFloat(form.amount),
      date: new Date().toLocaleDateString(),
    };

    if (editIndex !== null) {
      const updated = [...expenses];
      updated[editIndex] = newExpense;
      setExpenses(updated);
      setEditIndex(null);
    } else {
      setExpenses([...expenses, newExpense]);
    }

    setForm({ type: "", amount: "" });
  };

  // Delete expense
  const handleDelete = (index) => {
    const updated = expenses.filter((_, i) => i !== index);
    setExpenses(updated);
  };

  // Edit expense
  const handleEdit = (index) => {
    setForm(expenses[index]);
    setEditIndex(index);
  };

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="container col py-4">
      <Card className="shadow-lg border-0 rounded-4 p-4 bg-light" style={{
    background: "linear-gradient(135deg, #0d1117, #6e9dde)",
    minHeight: "100vh",
    borderRadius: "15px",
    color: "white"
  }}>
        <h2 className="text-center mb-4 text-white   fw-bold">
          💰 Expense Tracker
        </h2>

        {/* Expense Form */}
        <Form
          onSubmit={handleSubmit}
          className="d-flex flex-wrap justify-content-center gap-3 mb-4"
        >
          <Form.Control
            type="text"
            name="type"
            placeholder="Enter expense type"
            value={form.type}
            onChange={handleChange}
            className="w-auto p-3 rounded-4 shadow-sm border-0"
          />
          <Form.Control
            type="number"
            name="amount"
            placeholder="Enter amount"
            value={form.amount}
            onChange={handleChange}
            className="w-auto p-3 rounded-4 shadow-sm border-0"
          />
          <Button
            type="submit"
            className="px-4 py-2 rounded-4 shadow-sm"
            variant={editIndex !== null ? "warning" : "success"}
          >
            {editIndex !== null ? "✏️ Update" : "➕ Add"}
          </Button>
        </Form>

        {/* Expense Table */}
        {expenses.length > 0 ? (
          <div className="table-responsive">
            <Table bordered hover className="text-center align-middle shadow-sm">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Expense Type</th>
                  <th>Amount (PKR)</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((exp, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{exp.type}</td>
                    <td className="fw-bold text-success">
                      Rs. {exp.amount.toFixed(2)}
                    </td>
                    <td>{exp.date}</td>
                    <td>
                      <Button
                        variant="outline-warning"
                        size="sm"
                        className="me-2"
                        onClick={() => handleEdit(index)}
                      >
                        ✏️ Edit
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDelete(index)}
                      >
                        🗑 Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="table-secondary fw-bold">
                  <td colSpan="2">Total</td>
                  <td colSpan="3" className="text-success">
                    Rs. {total.toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </Table>
          </div>
        ) : (
          <h5 className="text-center text-muted">No expenses yet 💸</h5>
        )}
      </Card>
    </div>
  );
}


import React, { useState } from "react";
export default function Expense() {
 const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({ type: "", amount: "" });
  const [editIndex, setEditIndex] = useState(null);

  // handle form change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // add or update expense
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.type || !form.amount) return alert("Please fill all fields");

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

  // delete expense
  const handleDelete = (index) => {
    const updated = expenses.filter((_, i) => i !== index);
    setExpenses(updated);
  };

  // edit expense
  const handleEdit = (index) => {
    setForm(expenses[index]);
    setEditIndex(index);
  };

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="container mt-3">
      <h2 className="text-center mb-3">Expense Tracker</h2>

      {/* Form Section */}
      <form
        onSubmit={handleSubmit}
        className="d-flex flex-wrap gap-3 justify-content-center mb-4"
      >
        <input
          type="text"
          name="type"
          className="form-control w-auto"
          placeholder="Expense Type"
          value={form.type}
          onChange={handleChange}
        />
        <input
          type="number"
          name="amount"
          className="form-control w-auto"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
        />
        <button type="submit" className="btn btn-primary">
          {editIndex !== null ? "Update" : "Add"} Expense
        </button>
      </form>

      {/* Expense Table */}
      {expenses.length > 0 ? (
        <table className="table table-striped text-center">
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
                <td>{exp.amount}</td>
                <td>{exp.date}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="table-secondary">
              <td colSpan="2"><strong>Total</strong></td>
              <td colSpan="3"><strong>{total.toFixed(2)} PKR</strong></td>
            </tr>
          </tfoot>
        </table>
      ) : (
        <h4 className="text-center text-muted">No expenses yet.</h4>
      )}
    </div>
  );
}

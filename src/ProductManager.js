import React, { useState } from "react";
import TableComponent from "./TableComponent";
import CustomerFormModal from "./CustomerFormModal";

export default function CustomerManager() {
  const [customers, setCustomers] = useState([]);
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ name: "", status: "Active" });
  const [editIndex, setEditIndex] = useState(null);

  const handleAdd = () => {
    setForm({ name: "", status: "Active" });
    setEditIndex(null);
    setShow(true);
  };

  const handleSave = () => {
    if (!form.name.trim()) return alert("Enter customer name!");

    const updated = [...customers];
    if (editIndex !== null) updated[editIndex] = form;
    else updated.push(form);

    setCustomers(updated);
    setShow(false);
  };

  const handleEdit = (i) => {
    setForm(customers[i]);
    setEditIndex(i);
    setShow(true);
  };

  const handleDelete = (i) => {
    setCustomers(customers.filter((_, index) => index !== i));
  };

  return (
    <>
      <TableComponent
        title="Customers"
        data={customers}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <CustomerFormModal
        show={show}
        onHide={() => setShow(false)}
        form={form}
        setForm={setForm}
        onSave={handleSave}
      />
    </>
  );
}

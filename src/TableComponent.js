import React from "react";
import { Button, Table, Form } from "react-bootstrap";

export default function TableComponent({ title, data, onAdd, onEdit, onDelete }) {
  const [search, setSearch] = React.useState("");

  const filtered = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mt-3">
      <div className="d-flex justify-content-between mb-3">
        <h5>{title} List</h5>
        <div className="d-flex">
          <Form.Control
            placeholder={`Search ${title}`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: "200px", marginRight: "10px" }}
          />
          <Button onClick={onAdd}>+ Add {title.slice(0, -1)}</Button>
        </div>
      </div>

      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">
                No {title.toLowerCase()} found
              </td>
            </tr>
          ) : (
            filtered.map((item, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{item.name}</td>
                <td>
                  <span
                    className={`badge ${
                      item.status === "Active" ? "bg-success" : "bg-secondary"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => onEdit(i)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => onDelete(i)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
}

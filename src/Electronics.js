import React, { useContext, useState } from "react";
import { AppContext } from "./context/AppContext";
import { Card, Row, Col, Form } from "react-bootstrap";

export default function Electronic() {
  const { products } = useContext(AppContext);
  const [search, setSearch] = useState("");

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">🧭 Electronics</h3>

      {/* Search bar */}
      <Form.Control
        type="text"
        placeholder="Search by name or category..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4"
      />

      {/* Product Cards */}
      <Row xs={1} md={3} lg={4} className="g-4">
        {filtered.length > 0 ? (
          filtered.map((p) => (
            <Col key={p.id}>
              <Card className="h-100 shadow-sm">
                <Card.Img
                  variant="top"
                  src={p.img || "/images/default.png"}
                  style={{ height: "180px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title>{p.name}</Card.Title>
                  <Card.Subtitle className="text-muted mb-2">
                    {p.category}
                  </Card.Subtitle>
                  <Card.Text>
                    <strong>Price:</strong> ${p.price} <br />
                    {p.oldPrice && (
                      <>
                        <strong>Old Price:</strong>{" "}
                        <span className="text-decoration-line-through text-danger">
                          ${p.oldPrice}
                        </span>
                      </>
                    )}
                  </Card.Text>
                  <span
                    className={`badge ${
                      p.status === "Active" ? "bg-success" : "bg-secondary"
                    }`}
                  >
                    {p.status}
                  </span>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-center">No products found</p>
        )}
      </Row>
    </div>
  );
}

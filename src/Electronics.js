import React, { useContext, useState } from "react";
import { AppContext } from "./context/AppContext";
import { Card, Row, Col, Form, Badge } from "react-bootstrap";

export default function Electronic() {
  const { products } = useContext(AppContext);
  const [search, setSearch] = useState("");

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
  
>

      <Card className="shadow-lg border-0 rounded-4 p-4 bg-light "
  style={{
    background: "linear-gradient(135deg, #0d1117, #6e9dde)",
    minHeight: "100vh",
    borderRadius: "15px",
    color: "white"
  }}>
        <h2 className="text-center mb-4 text-white fw-bold">
          🧭 Electronics Store
        </h2>

        {/* Search bar */}
        <Form.Control
          type="text"
          placeholder="🔍 Search by name or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4 p-3 rounded-4 shadow-sm border-0"
        />

        {/* Product Cards */}
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {filtered.length > 0 ? (
            filtered.map((p) => (
              <Col key={p.id}>
                <Card className="h-100 shadow-sm border-0 rounded-4 product-card transition-all">
                  <Card.Img
                    variant="top"
                    src={p.img || "/images/default.png"}
                    className="rounded-top-4"
                    style={{
                      height: "180px",
                      objectFit: "cover",
                    }}
                  />
                  <Card.Body>
                    <Card.Title className="fw-bold text-center text-dark">
                      {p.name}
                    </Card.Title>

                    <Card.Text className="text-center mb-2">
                      <strong className="text-success fs-5">
                        ${p.price}
                      </strong>{" "}
                      {/* {p.oldPrice && (
                        <span className="text-muted text-decoration-line-through ms-2">
                          ${p.oldPrice}
                        </span>
                      )} */}
                    </Card.Text>

                    <p className="text-center mb-1 text-muted small">
                      Category: {p.category}
                    </p>

                    <div className="text-center">
                      <Badge
                        bg={p.status === "Active" ? "success" : "secondary"}
                        className="px-3 py-2 rounded-pill"
                      >
                        {p.status}
                      </Badge>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p className="text-center text-muted mt-3">
              😔 No products found
            </p>
          )}
        </Row>
      </Card>
    </div>
  );
}

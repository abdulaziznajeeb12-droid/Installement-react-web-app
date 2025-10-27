import React from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";

export default function ProductFormModal({
  show,
  onHide,
  form,
  setForm,
  onSave,
  categories = [],
}) {
  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{form.name ? "Edit Product" : "Add Product"}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          {/* Category */}
<Row className="mb-3">
  <Col md={4}>
    <Form.Group>
      <Form.Label>Category</Form.Label>
      <Form.Select
        value={form.category || ""}
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
      <Form.Label>Product Name</Form.Label>
      <Form.Control
        type="text"
        value={form.name || ""}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
    </Form.Group>
  </Col>

  <Col md={4}>
    <Form.Group>
      <Form.Label>Brand Name</Form.Label>
      <Form.Control
        type="text"
        value={form.brand || ""}
        onChange={(e) => setForm({ ...form, brand: e.target.value })}
      />
    </Form.Group>
  </Col>
</Row>

<Row className="mb-3">
  <Col md={4}>
    <Form.Group>
      <Form.Label>Model Number</Form.Label>
      <Form.Control
        type="text"
        value={form.model || ""}
        onChange={(e) => setForm({ ...form, model: e.target.value })}
      />
    </Form.Group>
  </Col>

  <Col md={4}>
    <Form.Group>
      <Form.Label>Color</Form.Label>
      <Form.Control
        type="text"
        value={form.color || ""}
        onChange={(e) => setForm({ ...form, color: e.target.value })}
      />
    </Form.Group>
  </Col>

  <Col md={4}>
    <Form.Group>
      <Form.Label>Size</Form.Label>
      <Form.Control
        type="text"
        value={form.size || ""}
        onChange={(e) => setForm({ ...form, size: e.target.value })}
      />
    </Form.Group>
  </Col>
</Row>

<Row className="mb-3">
  <Col md={4}>
    <Form.Group>
      <Form.Label>Sell Price</Form.Label>
      <Form.Control
        type="number"
        value={form.price || ""}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />
    </Form.Group>
  </Col>

  <Col md={4}>
    <Form.Group>
      <Form.Label>Purchase Price</Form.Label>
      <Form.Control
        type="number"
        value={form.oldPrice || ""}
        onChange={(e) => setForm({ ...form, oldPrice: e.target.value })}
      />
    </Form.Group>
  </Col>

   <Col md={4}>
    <Form.Group>
      <Form.Label>Quantity</Form.Label>
      <Form.Control
        type="number"
        value={form.quantity || ""}
        onChange={(e) => setForm({ ...form, quantity: e.target.value })}
      />
    </Form.Group>
  </Col>

</Row>

<Row className="mb-3">
 
  <Col md={4}>
    <Form.Group>
      <Form.Label>Warranty</Form.Label>
      <Form.Control
        type="text"
        value={form.warranty || ""}
        onChange={(e) => setForm({ ...form, warranty: e.target.value })}
      />
    </Form.Group>
  </Col>
<Col md={8}>
   <Form.Group className="mb-3">
            <Form.Label>Product Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = () => {
                    setForm({ ...form, img: reader.result });
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
            {form.img && (
              <img
                src={form.img}
                alt="Preview"
                className="mt-2 rounded"
                width="100"
                height="100"
                style={{ objectFit: "cover" }}
              />
            )}
          </Form.Group>
          </Col>
</Row>

          {/* Image Upload */}
          
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="success" onClick={onSave}>
          Save Product
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

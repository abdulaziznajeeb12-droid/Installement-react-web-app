import React from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

export default function UserFormModal({ show, onHide, form, setForm, onSave }) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{form.id ? "Edit User" : "Add User"}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          {/* Row 1 - Name, Email, Phone */}
          <Row className="mb-3">
            <Col md={4}>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Enter name"
                />
              </Form.Group>
            </Col>

            

            <Col md={4}>
              <Form.Group>
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="Enter phone"
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Row 2 - Address + Status */}
          <Row>
            <Col md={8}>
              <Form.Group>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  placeholder="Enter address"
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Status</Form.Label>
                <Form.Select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={onSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

import React, { useEffect, useState } from "react";
import { Table, Button, Card, Row, Col } from "react-bootstrap";

export default function SalesHistory() {
  const [sales, setSales] = useState([]);
  const [selectedSale, setSelectedSale] = useState(null);

  useEffect(() => {
    const storedSales = JSON.parse(localStorage.getItem("sales")) || [];
    setSales(storedSales);
  }, []);

  const handleMarkPaid = (saleId, instId) => {
    const updatedSales = sales.map((sale) =>
      sale.id === saleId
        ? {
            ...sale,
            installments: sale.installments.map((inst) =>
              inst.id === instId ? { ...inst, status: "Paid" } : inst
            ),
          }
        : sale
    );

    setSales(updatedSales);
    localStorage.setItem("sales", JSON.stringify(updatedSales));
  };

  return (
    <div className="container mt-4">
      <h2>📊 Sales History</h2>
      <p className="text-muted">Click on a customer name to view their installments.</p>

      <Table bordered hover responsive className="shadow-sm mt-3">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Customer</th>
            <th>Product</th>
            <th>Total</th>
            <th>Advance</th>
            <th>Balance</th>
            <th>Months</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((s, i) => (
            <tr key={s.id}>
              <td>{i + 1}</td>
              <td>{s.date}</td>
              <td>
                <Button variant="link" onClick={() => setSelectedSale(s)}>
                  {s.customer}
                </Button>
              </td>
              <td>{s.product}</td>
              <td>Rs.{s.totalAmount}</td>
              <td>Rs.{s.advance}</td>
              <td>Rs.{s.balance}</td>
              <td>{s.months}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {selectedSale && (
        <div className="mt-5">
          <h4>📅 Installments for {selectedSale.customer}</h4>
          <Row>
            {selectedSale.installments.map((i) => (
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
                    <strong>Status:</strong>{" "}
                    <span
                      className={`badge ${
                        i.status === "Paid"
                          ? "bg-white text-success"
                          : "bg-warning"
                      }`}
                    >
                      {i.status}
                    </span>
                  </p>
                  {i.status !== "Paid" && (
                    <Button
                      size="sm"
                      variant="success"
                      onClick={() => handleMarkPaid(selectedSale.id, i.id)}
                    >
                      Mark as Paid
                    </Button>
                  )}
                </Card>
              </Col>
            ))}
          </Row>

          <Button
            variant="secondary"
            className="mt-3"
            onClick={() => setSelectedSale(null)}
          >
            🔙 Back to Sales List
          </Button>
        </div>
      )}
    </div>
  );
}

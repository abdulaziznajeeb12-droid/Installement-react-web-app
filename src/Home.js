import React, { useContext } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { AppContext } from "./context/AppContext";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import "./Home.css"; // 👈 custom styles

export default function Home() {
  const { products, customers, sales } = useContext(AppContext);
  const totalRevenue = sales.reduce((s, x) => s + Number(x.totalAmount || 0), 0);
  const totalSales = sales.length;
  const totalProducts = products.length;
  const totalCustomers = customers.length;

  const chartData = sales
    .slice(0, 6)
    .map((s, i) => ({ name: s.date || `S${i + 1}`, value: Number(s.totalAmount || 0) }));

  return (
    <div className="dashboard-container p-4">
      <h2 className="mb-4 fw-bold text-white">📊 Welcome to Smart Sales</h2>

      <Row className="g-3">
        <Col md={3}>
          <Card className="dash-card gradient-1 shadow-sm">
            <Card.Body>
              <h5>Total Revenue</h5>
              <h3>Rs. {totalRevenue.toFixed(2)}</h3>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="dash-card gradient-2 shadow-sm">
            <Card.Body>
              <h5>Total Sales</h5>
              <h3>{totalSales}</h3>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="dash-card gradient-3 shadow-sm">
            <Card.Body>
              <h5>Products</h5>
              <h3>{totalProducts}</h3>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="dash-card gradient-4 shadow-sm">
            <Card.Body>
              <h5>Customers</h5>
              <h3>{totalCustomers}</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <div className="mt-4 chart-card p-4 shadow-lg rounded">
        <h5 className="text-white mb-3">📈 Recent Sales Trend</h5>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart
            data={chartData.length ? chartData : [{ name: "No data", value: 0 }]}
          >
            <XAxis dataKey="name" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip />
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#00eaff"
              strokeWidth={3}
              dot={{ fill: "#00eaff", r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

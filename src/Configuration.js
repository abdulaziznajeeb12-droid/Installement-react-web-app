import React, { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import ProductManager from "./components/ProductManager";
import CategoryManager from "./components/CategoryManager";
import CustomerManager from "./components/CustomerManager";
import Users from "./components/UsersManager";
import StockManager from "./components/StockManager";
import "./Configuration.css"; // 👈 custom styles

export default function Configuration() {
  const [activeTab, setActiveTab] = useState("products");

  return (
    <div className="config-container">
      <div className="config-header">
        <h2 className="h">⚙️ Configuration Panel</h2>
      </div>

      <div className="config-card shadow-lg">
        <Tabs
          id="config-tabs"
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k)}
          className="mb-3 custom-tabs"
          justify
        >
          <Tab eventKey="categories" title="📦 Categories">
            <CategoryManager />
          </Tab>

          <Tab eventKey="products" title="🛍️ Products">
            <ProductManager />
          </Tab>

          <Tab eventKey="customers" title="👥 Customers">
            <CustomerManager />
          </Tab>

          <Tab eventKey="stock" title="📊 Stock List">
            <StockManager />
          </Tab>

          <Tab eventKey="users" title="👤 Users">
            <Users />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

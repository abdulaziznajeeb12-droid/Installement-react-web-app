import React, { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import ProductManager from "./components/ProductManager";
import CategoryManager from "./components/CategoryManager";
import CustomerManager from "./components/CustomerManager";
import Users from "./components/UsersManager";
import StockManager from "./components/StockManager";

export default function Configuration() {
  const [activeTab, setActiveTab] = useState("products");

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-3">⚙️ Configuration</h2>

      <Tabs
  id="config-tabs"
  activeKey={activeTab}
  onSelect={(k) => setActiveTab(k)}
  className="mb-3 custom-tabs"
>
  <Tab eventKey="categories" title="Categories">
    <CategoryManager />
  </Tab>

  <Tab eventKey="products" title="Products">
    <ProductManager />
  </Tab>

  <Tab eventKey="customers" title="Customers">
    <CustomerManager />
  </Tab>

  <Tab eventKey="stock" title="Stock List">
  <StockManager />
</Tab>



    <Tab eventKey="Users" title="Users">
    <Users />
  </Tab>


</Tabs>

        
    </div>
  );
}

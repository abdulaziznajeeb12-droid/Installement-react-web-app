import React from "react";
import { Card } from "react-bootstrap";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Mon", value: 30 },
  { name: "Tue", value: 45 },
  { name: "Wed", value: 35 },
  { name: "Thu", value: 60 },
  { name: "Fri", value: 50 },
];

export default function Home() {
  return (
    <>
    
    <div style={{ display: "flex", gap: "20px", flexWrap: "wrap"}}>
     
      
      {/* Box 1 */}
      <Card style={{ color:"white",flex: "1", minWidth: "250px", padding: "10px", textAlign: "center" ,backgroundColor:"black"}}>
        <h5>📈 Sales</h5>
        <ResponsiveContainer width="100%" height={150}>
          <LineChart data={data}>
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Box 2 */}
      <Card style={{ color:"white",flex: "1", minWidth: "250px", padding: "10px", textAlign: "center" ,backgroundColor:"black"}}>
        <h5>💰 Revenue</h5>
        <ResponsiveContainer width="100%" height={150}>
          <LineChart data={data}>
            <Line type="monotone" dataKey="value" stroke="#82ca9d" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Box 3 */}
      <Card style={{color:"white", flex: "1", minWidth: "250px", padding: "10px", textAlign: "center" ,backgroundColor:"black"}}>
        <h5>🛒 Orders</h5>
        <ResponsiveContainer width="100%" height={150}>
          <LineChart data={data}>
            <Line type="monotone" dataKey="value" stroke="#ffc658" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Box 4 */}
      <Card style={{ flex: "1", minWidth: "250px", padding: "10px", textAlign: "center" ,backgroundColor:"black" }}>
        <h5>👥 Visitors</h5>
        <ResponsiveContainer width="100%" height={150}>
          <LineChart data={data}>
            <Line type="monotone" dataKey="value" stroke="#ff7300" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
    </>
  );
}

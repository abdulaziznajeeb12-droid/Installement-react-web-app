import React, { createContext, useState, useEffect } from "react";

// Context creation
export const AppContext = createContext();

// Provider
export const AppProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);

  // ✅ Add these lines
  const [sales, setSales] = useState(() => {
    return JSON.parse(localStorage.getItem("sales")) || [];
  });

  // ✅ Keep sales synced with localStorage
  useEffect(() => {
    localStorage.setItem("sales", JSON.stringify(sales));
  }, [sales]);

  return (
    <AppContext.Provider
      value={{
        products,
        setProducts,
        customers,
        setCustomers,
        categories,
        setCategories,
        users,
        setUsers,
        sales,        // ✅ Added
        setSales,     // ✅ Added
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

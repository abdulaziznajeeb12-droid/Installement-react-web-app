import React, { createContext, useState } from "react";

// Context creation
export const AppContext = createContext();

// Provider
export const AppProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);


  return (
    <AppContext.Provider
      value={{
        products,
        setProducts,
        customers,
        setCustomers,
        categories,
        setCategories,
        users, setUsers,

      }}
    >
      {children}
    </AppContext.Provider>
  );
};

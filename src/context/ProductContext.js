import React, { createContext, useState, useEffect } from "react";

export const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [categories, setCategories] = useState([]);

  // Load from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("categories")) || [];
    setCategories(saved);
  }, []);

  // Save whenever changed
  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  return (
    <ProductContext.Provider value={{ categories, setCategories }}>
      {children}
    </ProductContext.Provider>
  );
}

import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      // Check if product already exists in cart
      const existingItem = prevItems.find(
        (item) => item.title === product.title,
      );

      if (existingItem) {
        // Increase quantity if exists
        return prevItems.map((item) =>
          item.title === product.title
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        // Add new item with quantity 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeItem = (index) => {
    setCartItems((prevItems) => {
      const updatedCart = [...prevItems];
      updatedCart.splice(index, 1);
      return updatedCart;
    });
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeItem, getTotalItems }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}

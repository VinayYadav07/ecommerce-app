import { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  // Cart
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.title === product.title,
      );
      if (existingItem) {
        return prevItems.map((item) =>
          item.title === product.title
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
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

  // ✅ AUTH - TOKEN MANAGEMENT
  const [token, setToken] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedEmail = localStorage.getItem("userEmail");
    if (storedToken) {
      setToken(storedToken);
      setUserEmail(storedEmail);
      setIsLoggedIn(true);
    }
  }, []);

  const login = (newToken, email) => {
    setToken(newToken);
    setUserEmail(email);
    setIsLoggedIn(true);
    localStorage.setItem("token", newToken);
    localStorage.setItem("userEmail", email);
  };

  const logout = () => {
    setToken(null);
    setUserEmail(null);
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
  };

  return (
    <CartContext.Provider
      value={{
        // Cart
        cartItems,
        addToCart,
        removeItem,
        getTotalItems,
        // Auth
        token,
        userEmail,
        isLoggedIn,
        login,
        logout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}

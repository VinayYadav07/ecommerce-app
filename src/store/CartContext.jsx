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

  // ✅ Auto logout timer reference
  const [logoutTimer, setLogoutTimer] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedEmail = localStorage.getItem("userEmail");
    const storedLoginTime = localStorage.getItem("loginTime");

    if (storedToken && storedLoginTime) {
      const currentTime = Date.now();
      const loginTime = parseInt(storedLoginTime);
      const timeElapsed = (currentTime - loginTime) / 1000 / 60; // minutes

      // ✅ Check if 5 minutes have passed
      if (timeElapsed >= 5) {
        // Auto logout if more than 5 minutes
        logout();
        alert("Session expired! Please login again.");
      } else {
        setToken(storedToken);
        setUserEmail(storedEmail);
        setIsLoggedIn(true);

        // ✅ Set timer for remaining time
        const remainingTime = (5 - timeElapsed) * 60 * 1000;
        const timer = setTimeout(() => {
          logout();
          alert("Session expired! Please login again.");
        }, remainingTime);

        setLogoutTimer(timer);
      }
    }

    // ✅ Cleanup timer on unmount
    return () => {
      if (logoutTimer) {
        clearTimeout(logoutTimer);
      }
    };
  }, []);

  const login = (newToken, email) => {
    setToken(newToken);
    setUserEmail(email);
    setIsLoggedIn(true);

    // ✅ Store login time
    localStorage.setItem("token", newToken);
    localStorage.setItem("userEmail", email);
    localStorage.setItem("loginTime", Date.now().toString());

    // ✅ Set auto logout timer (5 minutes)
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }

    const timer = setTimeout(
      () => {
        logout();
        alert("Session expired! Please login again.");
      },
      5 * 60 * 1000, // ✅ 5 minutes
    );

    setLogoutTimer(timer);
  };

  const logout = () => {
    setToken(null);
    setUserEmail(null);
    setIsLoggedIn(false);

    // ✅ Clear localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("loginTime");

    // ✅ Clear timer
    if (logoutTimer) {
      clearTimeout(logoutTimer);
      setLogoutTimer(null);
    }
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

import React, { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  // Cart
  const [cartItems, setCartItems] = useState([]);

  // ✅ AUTH - TOKEN MANAGEMENT
  const [token, setToken] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [logoutTimer, setLogoutTimer] = useState(null);

  // ✅ YOUR API KEY
  const API_KEY = "daad08ee3f7446168624d18fdf241e0e";

  // ✅ Clean email for API (remove @ and .)
  const cleanEmail = (email) => {
    return email.replace(/[@.]/g, "");
  };

  // ✅ Fetch cart from backend
  const fetchCart = async (email) => {
    if (!email) return;

    const cleanedEmail = cleanEmail(email);
    const url = `https://crudcrud.com/api/${API_KEY}/cart${cleanedEmail}`;

    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setCartItems(data);
        console.log("Cart fetched:", data);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  // ✅ Add to cart - POST to backend
  const addToCart = async (product) => {
    if (!isLoggedIn || !userEmail) {
      alert("Please login to add items to cart");
      return;
    }

    const cleanedEmail = cleanEmail(userEmail);
    const url = `https://crudcrud.com/api/${API_KEY}/cart${cleanedEmail}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...product, quantity: 1 }),
      });

      if (response.ok) {
        const data = await response.json();
        setCartItems((prev) => [...prev, data]);
        console.log("Product added to cart:", data);
      } else {
        console.error("Failed to add product");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  // ✅ Remove from cart
  const removeItem = async (index) => {
    const itemToRemove = cartItems[index];
    if (!itemToRemove || !itemToRemove._id) {
      // If no _id, just remove locally
      setCartItems((prev) => prev.filter((_, i) => i !== index));
      return;
    }

    const cleanedEmail = cleanEmail(userEmail);
    const url = `https://crudcrud.com/api/${API_KEY}/cart${cleanedEmail}/${itemToRemove._id}`;

    try {
      await fetch(url, { method: "DELETE" });
      setCartItems((prev) => prev.filter((_, i) => i !== index));
      console.log("Product removed from cart");
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
  };

  // ✅ Auth functions
  const login = (newToken, email) => {
    setToken(newToken);
    setUserEmail(email);
    setIsLoggedIn(true);

    localStorage.setItem("token", newToken);
    localStorage.setItem("userEmail", email);
    localStorage.setItem("loginTime", Date.now().toString());

    // ✅ Fetch cart on login
    fetchCart(email);

    // ✅ Auto logout timer (5 minutes)
    if (logoutTimer) clearTimeout(logoutTimer);
    const timer = setTimeout(
      () => {
        logout();
        alert("Session expired! Please login again.");
      },
      5 * 60 * 1000,
    );
    setLogoutTimer(timer);
  };

  const logout = () => {
    setToken(null);
    setUserEmail(null);
    setIsLoggedIn(false);
    setCartItems([]);

    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("loginTime");

    if (logoutTimer) {
      clearTimeout(logoutTimer);
      setLogoutTimer(null);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedEmail = localStorage.getItem("userEmail");
    const storedLoginTime = localStorage.getItem("loginTime");

    if (storedToken && storedEmail && storedLoginTime) {
      const currentTime = Date.now();
      const loginTime = parseInt(storedLoginTime);
      const timeElapsed = (currentTime - loginTime) / 1000 / 60;

      if (timeElapsed >= 5) {
        logout();
        alert("Session expired! Please login again.");
      } else {
        setToken(storedToken);
        setUserEmail(storedEmail);
        setIsLoggedIn(true);

        // ✅ Fetch cart on refresh
        fetchCart(storedEmail);

        const remainingTime = (5 - timeElapsed) * 60 * 1000;
        const timer = setTimeout(() => {
          logout();
          alert("Session expired! Please login again.");
        }, remainingTime);
        setLogoutTimer(timer);
      }
    }

    return () => {
      if (logoutTimer) clearTimeout(logoutTimer);
    };
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeItem,
        getTotalItems,
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

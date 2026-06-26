import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { CartProvider } from "./store/CartContext";
import Home from "./components/Home";
import Products from "./components/Products";
import About from "./components/About";
import { Container } from "react-bootstrap";
import Cart from "./components/Cart";

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        {/* Cart Icon */}
        <div
          style={{ position: "fixed", top: "20px", right: "20px", zIndex: 999 }}
        >
          <Cart />
        </div>

        {/* Navigation Links */}
        <nav className="bg-dark p-3">
          <NavLink to="/" className="text-white me-3">
            HOME
          </NavLink>
          <NavLink to="/store" className="text-white me-3">
            STORE
          </NavLink>
          <NavLink to="/about" className="text-white">
            ABOUT
          </NavLink>
        </nav>

        <Container className="py-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/store" element={<Products />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Container>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;

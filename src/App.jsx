import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { CartProvider } from "./store/CartContext";
import Home from "./components/Home";
import Products from "./components/Products";
import ProductDetail from "./components/ProductDetail";
import About from "./components/About";
import ContactUs from "./components/ContactUs";
import Signup from "./components/Signup";
import Login from "./components/Login"; // ✅ Login import
import { Container } from "react-bootstrap";
import Cart from "./components/Cart";

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <div
          style={{ position: "fixed", top: "20px", right: "20px", zIndex: 999 }}
        >
          <Cart />
        </div>

        <nav className="bg-dark p-3">
          <NavLink to="/" className="text-white me-3">
            HOME
          </NavLink>
          <NavLink to="/store" className="text-white me-3">
            STORE
          </NavLink>
          <NavLink to="/about" className="text-white me-3">
            ABOUT
          </NavLink>
          <NavLink to="/contact" className="text-white me-3">
            CONTACT US
          </NavLink>
          <NavLink to="/signup" className="text-white me-3">
            SIGN UP
          </NavLink>
          <NavLink to="/login" className="text-white">
            LOGIN
          </NavLink>
        </nav>

        <Container className="py-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/store" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Container>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;

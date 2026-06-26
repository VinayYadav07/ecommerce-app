import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./store/CartContext";
import Home from "./components/Home";
import Products from "./components/Products";
import ProductDetail from "./components/ProductDetail";
import About from "./components/About";
import ContactUs from "./components/ContactUs";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ChangePassword from "./components/ChangePassword"; // ✅ Import
import Navigation from "./components/Navigation";
import { Container } from "react-bootstrap";

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Navigation />
        <Container className="py-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/store" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/change-password" element={<ChangePassword />} />{" "}
            {/* ✅ Route add */}
          </Routes>
        </Container>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;

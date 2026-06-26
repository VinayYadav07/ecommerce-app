import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./store/CartContext";
import { Container, Spinner } from "react-bootstrap";
import Navigation from "./components/Navigation";

// ✅ Lazy Loading - Components on-demand load honge
const Home = lazy(() => import("./components/Home"));
const Products = lazy(() => import("./components/Products"));
const ProductDetail = lazy(() => import("./components/ProductDetail"));
const About = lazy(() => import("./components/About"));
const ContactUs = lazy(() => import("./components/ContactUs"));
const Signup = lazy(() => import("./components/Signup"));
const Login = lazy(() => import("./components/Login"));
const ChangePassword = lazy(() => import("./components/ChangePassword"));

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Navigation />
        <Container className="py-4">
          {/* ✅ Suspense - Loader dikhayega jab tak component load ho */}
          <Suspense
            fallback={
              <div className="text-center py-5">
                <Spinner animation="border" variant="primary" />
                <p className="mt-2">Loading...</p>
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/store" element={<Products />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/change-password" element={<ChangePassword />} />
            </Routes>
          </Suspense>
        </Container>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;

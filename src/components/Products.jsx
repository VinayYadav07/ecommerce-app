import React, { useState, useEffect, useCallback, useRef } from "react";
import { Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCart } from "../store/CartContext";
import AddMovieForm from "./AddMovieForm";

function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const retryIntervalRef = useRef(null);
  const isMountedRef = useRef(true);

  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts?_limit=4",
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      if (isMountedRef.current) {
        const productsArray = data.map((item) => ({
          id: item.id,
          title: item.title,
          price: Math.floor(Math.random() * 100) + 10,
          imageUrl: `https://picsum.photos/seed/${item.id}/200/200`,
        }));

        setProducts(productsArray);
        setIsLoading(false);
        setError(null);

        if (retryIntervalRef.current) {
          clearInterval(retryIntervalRef.current);
          retryIntervalRef.current = null;
        }
      }
    } catch (err) {
      console.error("Fetch error:", err);

      if (isMountedRef.current) {
        setError(`Something went wrong....Retrying (${retryCount + 1})`);
        setIsLoading(false);

        if (!retryIntervalRef.current) {
          retryIntervalRef.current = setInterval(() => {
            if (isMountedRef.current) {
              setRetryCount((prev) => {
                const newCount = prev + 1;
                setError(`Something went wrong....Retrying (${newCount + 1})`);
                return newCount;
              });
              fetchProducts();
            }
          }, 5000);
        }
      }
    }
  }, [retryCount]);

  const deleteMovie = async (id) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to delete movie");
      }

      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id),
      );
      console.log("Movie deleted successfully");
    } catch (error) {
      console.error("Error deleting movie:", error);
      alert("Failed to delete movie. Please try again.");
    }
  };

  const cancelRetry = useCallback(() => {
    if (retryIntervalRef.current) {
      clearInterval(retryIntervalRef.current);
      retryIntervalRef.current = null;
    }
    setError("Retry cancelled");
    setIsLoading(false);
  }, []);

  useEffect(() => {
    isMountedRef.current = true;
    fetchProducts();

    return () => {
      isMountedRef.current = false;
      if (retryIntervalRef.current) {
        clearInterval(retryIntervalRef.current);
        retryIntervalRef.current = null;
      }
    };
  }, [fetchProducts]);

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  if (isLoading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-5">
        <h4 className="text-danger">{error}</h4>
        <Button variant="danger" onClick={cancelRetry} className="mt-3">
          Cancel Retry
        </Button>
      </div>
    );
  }

  return (
    <>
      <AddMovieForm onMovieAdded={fetchProducts} />

      <Row xs={1} md={2} lg={4} className="g-4">
        {products.map((product) => (
          <Col key={product.id}>
            <Card className="h-100">
              <div
                onClick={() => handleProductClick(product.id)}
                style={{ cursor: "pointer" }}
              >
                <Card.Img
                  variant="top"
                  src={product.imageUrl}
                  style={{ height: "200px", objectFit: "cover" }}
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/200?text=No+Image";
                  }}
                />
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text>${product.price}</Card.Text>
                </Card.Body>
              </div>
              <Card.Body>
                <Button
                  variant="danger"
                  size="sm"
                  className="me-2"
                  onClick={() => deleteMovie(product.id)}
                >
                  Delete
                </Button>

                <Button
                  variant="primary"
                  size="sm"
                  onClick={() =>
                    addToCart({
                      title: product.title,
                      price: product.price,
                      imageUrl: product.imageUrl,
                    })
                  }
                >
                  ADD TO CART
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default React.memo(Products);

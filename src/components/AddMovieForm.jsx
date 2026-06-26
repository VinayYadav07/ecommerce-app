import { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

function AddMovieForm({ onMovieAdded }) {
  const [movieData, setMovieData] = useState({
    title: "",
    price: "",
    imageUrl: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieData({
      ...movieData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newMovieObj = {
      title: movieData.title,
      price: parseFloat(movieData.price) || 0,
      imageUrl: movieData.imageUrl || "https://via.placeholder.com/200",
    };

    try {
      // ✅ POST Request - Fake API par save karo
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newMovieObj),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to add movie");
      }

      const data = await response.json();
      console.log("Movie added:", data);

      if (onMovieAdded) {
        onMovieAdded();
      }

      setMovieData({
        title: "",
        price: "",
        imageUrl: "",
      });

      alert("Movie added successfully! Check console.");
    } catch (error) {
      console.error("Error adding movie:", error);
      alert("Failed to add movie. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container className="mb-4">
      <Row className="justify-content-center">
        <Col md={8}>
          <div className="border p-4 rounded">
            <h4 className="mb-3">Add New Movie</h4>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Movie Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={movieData.title}
                  onChange={handleChange}
                  placeholder="Enter movie title"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Price ($)</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={movieData.price}
                  onChange={handleChange}
                  placeholder="Enter price"
                  step="0.01"
                  min="0"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Image URL</Form.Label>
                <Form.Control
                  type="url"
                  name="imageUrl"
                  value={movieData.imageUrl}
                  onChange={handleChange}
                  placeholder="Enter image URL (optional)"
                />
              </Form.Group>

              <Button variant="primary" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Adding..." : "Add Movie"}
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default AddMovieForm;

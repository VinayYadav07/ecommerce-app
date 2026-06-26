import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

function AddMovieForm() {
  const [movieData, setMovieData] = useState({
    title: "",
    price: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieData({
      ...movieData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newMovieObj = {
      title: movieData.title,
      price: parseFloat(movieData.price) || 0,
      imageUrl: movieData.imageUrl || "https://via.placeholder.com/200",
    };

    // ✅ Console me show karo
    console.log("NewMovieObj:", newMovieObj);

    // ✅ Alert bhi add karte hain (confirm ke liye)
    alert("Movie Added! Check console for NewMovieObj");

    // Form reset karo
    setMovieData({
      title: "",
      price: "",
      imageUrl: "",
    });
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

              <Button variant="primary" type="submit">
                Add Movie
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default AddMovieForm;

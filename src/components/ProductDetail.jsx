import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

const productData = {
  1: {
    title: "Colors",
    price: 100,
    description:
      "A beautiful collection of vibrant colors for your creative projects.",
    images: [
      "https://prasadyash2411.github.io/ecom-website/img/Album%201.png",
      "https://picsum.photos/seed/color1/400/400",
      "https://picsum.photos/seed/color2/400/400",
    ],
    reviews: [
      {
        user: "Rahul",
        rating: 5,
        comment: "Amazing quality! Highly recommend.",
      },
      {
        user: "Priya",
        rating: 4,
        comment: "Very good product, loved the colors.",
      },
      {
        user: "Amit",
        rating: 5,
        comment: "Perfect for my project, thank you!",
      },
    ],
  },
  2: {
    title: "Black and white Colors",
    price: 50,
    description: "Classic black and white tones for elegant designs.",
    images: [
      "https://prasadyash2411.github.io/ecom-website/img/Album%202.png",
      "https://picsum.photos/seed/bw1/400/400",
      "https://picsum.photos/seed/bw2/400/400",
    ],
    reviews: [
      { user: "Sneha", rating: 5, comment: "Perfect black and white shades." },
      { user: "Vikram", rating: 4, comment: "Good quality, fast delivery." },
    ],
  },
  3: {
    title: "Yellow and Black Colors",
    price: 70,
    description: "Bold yellow and black combination for eye-catching designs.",
    images: [
      "https://prasadyash2411.github.io/ecom-website/img/Album%203.png",
      "https://picsum.photos/seed/yb1/400/400",
      "https://picsum.photos/seed/yb2/400/400",
    ],
    reviews: [
      { user: "Anjali", rating: 5, comment: "Very striking colors!" },
      { user: "Raj", rating: 3, comment: "Good but yellow could be brighter." },
    ],
  },
  4: {
    title: "Blue Color",
    price: 100,
    description: "Calming and professional blue tones for any project.",
    images: [
      "https://prasadyash2411.github.io/ecom-website/img/Album%204.png",
      "https://picsum.photos/seed/blue1/400/400",
      "https://picsum.photos/seed/blue2/400/400",
    ],
    reviews: [
      {
        user: "Neha",
        rating: 5,
        comment: "Beautiful blues, exactly what I needed.",
      },
      { user: "Karan", rating: 4, comment: "Very good, would buy again." },
      { user: "Meera", rating: 5, comment: "Loved the shades!" },
    ],
  },
};

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const data = productData[id];
    if (data) {
      setProduct(data);
    } else {
      navigate("/store");
    }
  }, [id, navigate]);

  if (!product) {
    return <h4 className="text-center py-5">Loading product...</h4>;
  }

  return (
    <Container className="py-4">
      <Button
        variant="outline-secondary"
        onClick={() => navigate("/store")}
        className="mb-4"
      >
        ← Back to Store
      </Button>

      <Row>
        <Col md={6}>
          <Card className="mb-3">
            <Card.Img
              src={product.images[selectedImage]}
              style={{ height: "400px", objectFit: "contain" }}
            />
          </Card>
          <Row xs={3} className="g-2">
            {product.images.map((img, index) => (
              <Col key={index}>
                <Card
                  onClick={() => setSelectedImage(index)}
                  style={{
                    cursor: "pointer",
                    border:
                      selectedImage === index
                        ? "3px solid blue"
                        : "1px solid #ddd",
                  }}
                >
                  <Card.Img
                    src={img}
                    style={{ height: "100px", objectFit: "cover" }}
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </Col>

        <Col md={6}>
          <h2>{product.title}</h2>
          <h3 className="text-success">${product.price}</h3>
          <p className="mt-3">{product.description}</p>
          <Button variant="primary" className="mb-4">
            Add to Cart
          </Button>

          <h4 className="mt-4">Reviews</h4>
          {product.reviews.map((review, index) => (
            <Card key={index} className="mb-2">
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <strong>{review.user}</strong>
                  <span>⭐ {review.rating} / 5</span>
                </div>
                <p className="mb-0">{review.comment}</p>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetail;

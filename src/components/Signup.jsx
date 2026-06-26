import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Spinner,
} from "react-bootstrap";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // ✅ Firebase Signup API call
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=YOUR_ACTUAL_API_KEY",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        // ✅ Server se error message show karo
        throw new Error(data.error.message || "Signup failed");
      }

      console.log("Signup success:", data);
      setSuccess(true);
      setEmail("");
      setPassword("");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="py-4">
      <h2 className="text-center mb-4">Sign Up</h2>

      <Row className="justify-content-center">
        <Col md={6}>
          {error && (
            <Alert variant="danger" onClose={() => setError(null)} dismissible>
              {error}
            </Alert>
          )}

          {success && (
            <Alert variant="success">
              Account created successfully! Please check your email.
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              disabled={isLoading}
              className="w-100"
            >
              {isLoading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  Loading...
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Signup;

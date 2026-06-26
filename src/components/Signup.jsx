import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Spinner,
} from "react-bootstrap";
import { createClient } from "@supabase/supabase-js";

// ✅ BAS YAHAN DO CHEEZE CHANGE KARO
const supabaseUrl = "https://fsqrhukkqkuirglctmkj.supabase.co";
const supabaseAnonKey = "sb_publishable_DfogggJlLwKWP8XzFSHYhQ_mrvbYOCa";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (error) throw new Error(error.message);

      console.log("Signup success:", data);
      setSuccess(true);
      setEmail("");
      setPassword("");
      setError(null);
    } catch (err) {
      setError(err.message);
      setSuccess(false);
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
            <Alert
              variant="success"
              onClose={() => setSuccess(false)}
              dismissible
            >
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
                placeholder="Password (min 6 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                minLength="6"
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

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
import { useCart } from "../store/CartContext";
import { createClient } from "@supabase/supabase-js";

// ✅ Supabase Config (Signup wali same keys)
const supabaseUrl = "https://fsqrhukkqkuirglctmkj.supabase.co";
const supabaseAnonKey = "sb_publishable_DfogggJlLwKWP8XzFSHYhQ_mrvbYOCa";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

function ChangePassword() {
  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { logout } = useCart();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // ✅ Supabase se password update
      const { data, error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw new Error(error.message);

      console.log("Password updated:", data);
      setSuccess(true);
      setNewPassword("");

      // ✅ Logout kar do
      logout();
      alert("Password updated! Please login again with new password.");
    } catch (err) {
      setError(err.message);
      setSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="py-4">
      <h2 className="text-center mb-4">Change Password</h2>

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
              Password changed successfully! Please login again.
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter new password (min 6 characters)"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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
                  Updating...
                </>
              ) : (
                "Change Password"
              )}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default ChangePassword;

import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../store/CartContext";
import Cart from "./Cart";

function Navigation() {
  const { isLoggedIn, userEmail, logout } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); //  Token null + localStorage clear
    navigate("/login"); // Redirect to login page
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          The Generics
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">
              HOME
            </Nav.Link>
            <Nav.Link as={NavLink} to="/store">
              STORE
            </Nav.Link>
            <Nav.Link as={NavLink} to="/about">
              ABOUT
            </Nav.Link>
            <Nav.Link as={NavLink} to="/contact">
              CONTACT US
            </Nav.Link>
            {!isLoggedIn && (
              <>
                <Nav.Link as={NavLink} to="/signup">
                  SIGN UP
                </Nav.Link>
                <Nav.Link as={NavLink} to="/login">
                  LOGIN
                </Nav.Link>
              </>
            )}
            {isLoggedIn && (
              <Nav.Link as={NavLink} to="/change-password">
                CHANGE PASSWORD
              </Nav.Link>
            )}
          </Nav>

          {isLoggedIn ? (
            <div className="d-flex align-items-center text-white">
              <span className="me-3">{userEmail}</span>
              {/* ✅ LOGOUT BUTTON - YAHAN HAI */}
              <Button variant="outline-light" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          ) : (
            <span className="text-white me-3">Please Login</span>
          )}

          <Cart />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;

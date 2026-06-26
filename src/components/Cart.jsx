import { useState } from "react";
import { Modal, Button, Row, Col, Image } from "react-bootstrap";
import { useCart } from "../store/CartContext";

function Cart() {
  const [show, setShow] = useState(false);
  const { cartItems, removeItem, getTotalItems } = useCart();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <>
      {/* Cart Icon */}
      <div
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          cursor: "pointer",
          zIndex: 999,
        }}
      >
        <Button variant="outline-primary" onClick={handleShow}>
          🛒 Cart <span className="badge bg-primary">{getTotalItems()}</span>
        </Button>
      </div>

      {/* Cart Modal */}
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>CART</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <>
              <Row className="border-bottom pb-2 fw-bold">
                <Col xs={6}>ITEM</Col>
                <Col xs={3}>PRICE</Col>
                <Col xs={2}>QUANTITY</Col>
                <Col xs={1}></Col>
              </Row>

              {cartItems.map((item, index) => (
                <Row
                  key={index}
                  className="py-3 border-bottom align-items-center"
                >
                  <Col xs={6} className="d-flex align-items-center">
                    <Image
                      src={item.imageUrl}
                      thumbnail
                      style={{ width: "60px", marginRight: "15px" }}
                    />
                    <span>{item.title}</span>
                  </Col>
                  <Col xs={3}>${item.price}</Col>
                  <Col xs={2}>{item.quantity}</Col>
                  <Col xs={1}>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => removeItem(index)}
                    >
                      ✕
                    </Button>
                  </Col>
                </Row>
              ))}

              <Row className="mt-3">
                <Col className="text-end fw-bold">Total: ${total}</Col>
              </Row>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {cartItems.length > 0 && <Button variant="success">PURCHASE</Button>}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Cart;

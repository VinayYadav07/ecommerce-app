import { Container, Row, Col } from "react-bootstrap";

function Home() {
  return (
    <Container className="py-4">
      <h1 className="text-center mb-4">The Generics</h1>

      <h2 className="text-center mb-4">TOURS</h2>

      <Row className="justify-content-center">
        <Col md={8}>
          <div className="border-bottom py-3">
            <Row>
              <Col xs={3} className="fw-bold">
                JUL16
              </Col>
              <Col xs={4}>DETROIT, MI</Col>
              <Col xs={5}>DTE ENERGY MUSIC THEATRE</Col>
            </Row>
          </div>
          <div className="border-bottom py-3">
            <Row>
              <Col xs={3} className="fw-bold">
                JUL19
              </Col>
              <Col xs={4}>TORONTO, ON</Col>
              <Col xs={5}>BUDWEISER STAGE</Col>
            </Row>
          </div>
          <div className="border-bottom py-3">
            <Row>
              <Col xs={3} className="fw-bold">
                JUL22
              </Col>
              <Col xs={4}>BRISTOW, VA</Col>
              <Col xs={5}>JIGGY LUBE LIVE</Col>
            </Row>
          </div>
          <div className="border-bottom py-3">
            <Row>
              <Col xs={3} className="fw-bold">
                JUL29
              </Col>
              <Col xs={4}>PHOENIX, AZ</Col>
              <Col xs={5}>AK-CHIN PAVILION</Col>
            </Row>
          </div>
          <div className="border-bottom py-3">
            <Row>
              <Col xs={3} className="fw-bold">
                AUG 2
              </Col>
              <Col xs={4}>LAS VEGAS, NV</Col>
              <Col xs={5}>T-MOBILE ARENA</Col>
            </Row>
          </div>
          <div className="border-bottom py-3">
            <Row>
              <Col xs={3} className="fw-bold">
                AUG 7
              </Col>
              <Col xs={4}>CONCORD, CA</Col>
              <Col xs={5}>CONCORD PAVILION</Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;

import React from 'react'
import './footer.css'
import { Container, Row, Col, ListGroup, ListGroupItem} from "reactstrap"
import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();
  return <footer className="footer">
    <Container>
      <Row>
        <Col lg="4" className="mb-4" md="6">
        <div className="logo">
              <div>
                <h1 className="text-white">BlackStanley</h1>
              </div>
            </div>
              <p className="footer__text mt-4">
                Garantia de confianza!, si no te gusto el producto tenes 7 dias para cambiarlo por lo que vos quieras.
              </p>
        </Col>

        <Col lg="3" md="3" className="mb-4">
          <div className="footer__quick-links">
            <h4 className="quick__links-title">Categorias</h4>
            <ListGroup className="mb-3">
              <ListGroupItem className="ps-0 border-0">
                <Link to='#'>Celulares</Link>
              </ListGroupItem>

              <ListGroupItem className="ps-0 border-0">
                <Link to='#'>Sofa modernos</Link>
              </ListGroupItem>

              <ListGroupItem className="ps-0 border-0">
                <Link to='#'>Sillas ArmChair</Link>
              </ListGroupItem>

              <ListGroupItem className="ps-0 border-0">
                <Link to='#'>Relojes</Link>
              </ListGroupItem>
            </ListGroup>
          </div>
        </Col>

        <Col lg="2" md="3" className="mb-4">
        <div className="footer__quick-links">
            <h4 className="quick__links-title">Links</h4>
            <ListGroup className="mb-3">
              <ListGroupItem className="ps-0 border-0">
                <Link to='/shop'>Shop</Link>
              </ListGroupItem>

              <ListGroupItem className="ps-0 border-0">
                <Link to='/cart'>Cart</Link>
              </ListGroupItem>

              <ListGroupItem className="ps-0 border-0">
                <Link to='/login'>Login</Link>
              </ListGroupItem>

              <ListGroupItem className="ps-0 border-0">
                <Link to='#'>Privacy Policy</Link>
              </ListGroupItem>
            </ListGroup>
          </div>
        </Col>

        <Col lg="3" md="4" className="mb-4">
        <div className="footer__quick-links">
            <h4 className="quick__links-title">Contacto</h4>
            <ListGroup className="footer__contact">
              <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                <span><i className="ri-map-pin-line"></i></span>
                <p>1234, Ezeiza, Argentina</p>
              </ListGroupItem>

              <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                <span><i className="ri-phone-line"></i></span>
                <p>+54 011 1234 5678</p>
              </ListGroupItem>

              <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
              <span><i className="ri-mail-line"></i></span>
                <p>bs1234@blackstanley.com</p>
              </ListGroupItem>
            </ListGroup>
          </div>
        </Col>

        <Col lg="12">
          <p className="footer__copyright">Copyright {year} Claudio Matias Lugo 3era entrega CoderHouse React JS</p>
        </Col>
      </Row>
    </Container>
  </footer>
}

export default Footer
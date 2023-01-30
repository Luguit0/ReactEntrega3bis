import React from "react";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";

import "../styles/Checkout.css";
import {useSelector} from "react-redux";

const Checkout = () => {

  const totalQty = useSelector((state) => state.cart.totalQuantity)
  const totalAmount = useSelector((state) => state.cart.totalAmount)

  return (
    <Helmet title="Checkout">
      <CommonSection title="Checkout" />
      <section>
        <Container>
          <Row>
            <Col lg="8">
              <h6 className="mb-4 fw-bold">Informacion de Facturacion</h6>
              <Form className="billing__form">
                <FormGroup className="form__group">
                  <input type="text" placeholder="Nombre" />
                </FormGroup>

                <FormGroup className="form__group">
                  <input type="email" placeholder="Email" />
                </FormGroup>

                <FormGroup className="form__group">
                  <input type="number" placeholder="Num Celular" />
                </FormGroup>

                <FormGroup className="form__group">
                  <input type="text" placeholder="Direccion" />
                </FormGroup>

                <FormGroup className="form__group">
                  <input type="text" placeholder="Ciudad" />
                </FormGroup>

                <FormGroup className="form__group">
                  <input type="text" placeholder="Cod Postal" />
                </FormGroup>

                <FormGroup className="form__group">
                  <input type="text" placeholder="Pais" />
                </FormGroup>
              </Form>
            </Col>

            <Col>
              <div className="checkout__cart">
                <h6>
                  Total Cant: <span>{totalQty} Productos</span>
                </h6>
                <h6>
                  Subtotal: <span>${totalAmount}</span>
                </h6>
                <h6>
                  <span>
                    Envios: <br />
                    Envios Gratis
                  </span>
                  <span>$0</span>
                </h6>
                <h4>
                  Total : <span>${totalAmount}</span>
                </h4>
                <button className="buy__btn auth__btn w-100">
                  Generar Orden
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Checkout;

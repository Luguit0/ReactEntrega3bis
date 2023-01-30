import React, { useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.config";
import { toast } from "react-toastify";
import { useFormik } from "formik"
import * as Yup from "yup"

import "../styles/login.css";

const Login = () => {

  const[errEmail, setErrEmail] = useState("")
  const[errPassword, setErrPassword] = useState("")
  const [loading, setLoading] = useState(false);
  
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },



    onSubmit: async (values) => {
      setLoading(true);
  
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
  
        const user = userCredential.user;
  
        console.log(user);
        setLoading(false);
        toast.success("Ingresaste de manera correcta!");
        navigate("/checkout");
      } catch (error) {
        setLoading(false);
        toast.error("Error al Iniciar");
        setErrEmail("Tu Email es Incorrecto")
        setErrPassword("Tu Contraseña es Incorrecta")
      }
    }
  })

  const navigate = useNavigate();



  return (
    <Helmet title="Login">
      <section>
        <Container>
          <Row>
            {loading ? (
              <Col lg="12" className="text-center">
                <h5 className="fw-bold">Cargando</h5>
              </Col>
            ) : (
              <Col lg="6" className="m-auto text-center">
                <h3 className="fw-bold mb-4">Login</h3>
                <Form className="auth__form" onSubmit={formik.handleSubmit}>
                  <FormGroup className="form__group">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Ingresa tu EMAIL"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                    />
                    {errEmail && (<p className="errorMsg">{errEmail}</p>)}
                  </FormGroup>

                  <FormGroup className="form__group">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Ingresa tu CONTRASEÑA"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                    />
                    {errPassword && (<p className="errorMsg">{errPassword}</p>)}
                  </FormGroup>

                  <button type="submit" className="buy__btn auth__btn">
                    Login
                  </button>
                  <p>
                    No tenes cuenta ?{" "}
                    <Link to="/signup">Registrate aca</Link>
                  </p>
                </Form>
              </Col>
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Login;

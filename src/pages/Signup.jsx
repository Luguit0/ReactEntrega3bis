import React, { useState } from "react";
import Helmet from "../components/Helmet/Helmet";

import { useFormik } from "formik"
import * as Yup from "yup"

import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { setDoc, doc } from "firebase/firestore";

import { auth } from "../firebase.config";
import { storage } from "../firebase.config";
import { db } from "../firebase.config";

import { toast } from "react-toastify";

import "../styles/login.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  // const [username, setUsername] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmedPassword: "",
      file: null,
    },
    
    validationSchema: Yup.object({
      username: Yup.string().required("Nombre es requerido"),
      email: Yup.string().required("Email es requerido").matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,"Ingresa un EMAIL valido"),
      password: Yup.string().required("Contraseña es requerida").min(6,"La contraseña tiene que tener al menos 6 caracteress"),
      confirmedPassword: Yup.string().required("Confirma tu contraseña").oneOf([Yup.ref("password"),null], "las contrasenias deben coincidir"),
      file: Yup.mixed().required('Imagen es requerida'),
    }),

    onSubmit: async(values) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      const user = userCredential.user;
      const storageRef = ref(storage, `images/${Date.now() + values.username}`);
      const uploadTask = uploadBytesResumable(storageRef, values.file);

      uploadTask.on(
        (error) => {
          toast.error(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            //update user profile
            await updateProfile(user, {
              displayName: values.username,
              photoURL: downloadURL,
            });

            //store user data in firestore database
            await setDoc(doc(db, "users", user.uid), {
              uid: user.uid,
              displayName: values.username,
              email: values.email,
              photoURL: downloadURL,
            });
          });
        }
      );

      setLoading(false);
      toast.success("Cuenta Creadaaa!");
      navigate("/login");
    } catch (error) {
      setLoading(false);
      toast.error("Algo salio mal");
    }
    }
  })

  return (
    <Helmet title="Signup">
      <section>
        <Container>
          <Row>
            {loading ? (
              <Col lg="12" className="text-center">
                <h5 className="fw-bold">Cargando.....</h5>
              </Col>
            ) : (
              <Col lg="6" className="m-auto text-center">
                <h3 className="fw-bold mb-4">Registrate</h3>
                <Form className="auth__form" onSubmit={formik.handleSubmit}>
                  <FormGroup className="form__group">
                    <input
                      type="text"
                      id="username"
                      name="username"
                      placeholder="Usuario"
                      value={formik.values.username}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.username && (<p className="errorMsg">{formik.errors.username}</p>)}
                  </FormGroup>

                  <FormGroup className="form__group">
                    <input
                      type="email"
                      placeholder="Ingresa tu email"
                      id="email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                    />
                  {formik.errors.email && (<p className="errorMsg">{formik.errors.email}</p>)}
                  </FormGroup>

                  <FormGroup className="form__group">
                    <input
                      type="password"
                      placeholder="Ingresa tu contraseña"
                      id="password"
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.password && (<p className="errorMsg">{formik.errors.password}</p>)}
                  </FormGroup>

                  <FormGroup className="form__group">
                    <input
                      type="password"
                      placeholder="Confirma tu contraseña"
                      id="confirmedPassword"
                      name="confirmedPassword"
                      value={formik.values.confirmedPassword}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.confirmedPassword && (<p className="errorMsg">{formik.errors.confirmedPassword}</p>)}
                  </FormGroup>

                  <FormGroup className="form__group">
                      <input
                        type="file"
                        id="file"
                        name="file"
                        onChange={(event) => {
                          formik.setFieldValue("file", event.target.files[0]);
                        }}
                      />
                      {formik.errors.file && (<p className="errorMsg">{formik.errors.file}</p>)}
                  </FormGroup>

                  <button type="submit" className="buy__btn auth__btn">
                    Crear Cuenta
                  </button>
                  <p>
                    Ya tenes cuenta ? <Link to="/login">Inicia Sesion</Link>
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

export default Signup;

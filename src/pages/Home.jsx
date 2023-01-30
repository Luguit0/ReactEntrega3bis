import React, { useState, useEffect } from "react";

import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Helmet from "../components/Helmet/Helmet";
import "../styles/home.css";
import { Col, Container, Row } from "reactstrap";
import heroImg from "../assets/images/hero-img.png";
import Services from "../services/Services";
import ProductsList from "../components/UI/ProductsList";
import Clock from "../components/UI/Clock";
import counterImg from "../assets/images/counter-timer-img.png";

// import useGetData from "../custom-hooks/useGetData";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApi = async() => {
      const res = await axios.get("https://json-products-5pbv94v77-vanhoa2k2.vercel.app/v1/product")
      setProducts(res.data)
      setLoading(false)
    }
    fetchApi()
  },[])

  // const {data: products, loading} = useGetData('products');
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [bestSalesProducts, setBestSalesProducts] = useState([]);
  const [mobileProducts, setMobileProducts] = useState([]);
  const [wirelessProducts, setWirelessProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  const year = new Date().getFullYear();

  useEffect(() => {
    const filteredTrendingProducts = products.filter(
      (item) => item.category === "chair"
    );

    const filteredBestSalesProducts = products.filter(
      (item) => item.category === "sofa"
    );

    const filteredMobileProducts = products.filter(
      (item) => item.category === "mobile"
    );

    const filteredWirelessProducts = products.filter(
      (item) => item.category === "wireless"
    );

    const filteredPopularProducts = products.filter(
      (item) => item.category === "watch"
    );

    setTrendingProducts(filteredTrendingProducts);
    setBestSalesProducts(filteredBestSalesProducts);
    setMobileProducts(filteredMobileProducts);
    setWirelessProducts(filteredWirelessProducts);
    setPopularProducts(filteredPopularProducts);
  }, [products]);

  return (
    <Helmet title={"Home"}>
      <section className="hero__section">
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="hero__content">
                <p className="hero__subtitle">Importando Productos desde 2022</p>
                <h2>Acercandote todos los productos a la puerta de tu hogar!</h2>
                <p>
                Somos blackstanley, emprendimiento familiar, importando todos los productos deseados a hasta la puerta de tu hogar!.
                Todos los productos en dolares oficial.
                </p>
                <motion.button whileTap={{ scale: 1.2 }} className="buy__btn">
                  <Link to="/shop">Comprar Ahora</Link>
                </motion.button>
              </div>
            </Col>

            <Col lg="6" md="6">
              <img src={heroImg} alt="" />
            </Col>
          </Row>
        </Container>
      </section>

      <Services />

      <section className="trending__products">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section__title">Tendencias</h2>
            </Col>

            {loading ? <h5 className="fw-bold">Cargando.......</h5> : <ProductsList data={trendingProducts} />}
          </Row>
        </Container>
      </section>

      <section className="best_sales">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section__title">Mas Vendidos</h2>
            </Col>

            {loading ? <h5 className="fw-bold">Cargando.......</h5> : <ProductsList data={bestSalesProducts} />}
          </Row>
        </Container>
      </section>

      <section className="timer__count">
        <Container>
          <Row>
            <Col lg="6" md="12" className="count__down-col">
              <div className="clock__top-content">
                <h4 className="text-white fs-6 mb-2">Ofertas Limitadas</h4>
                <h3 className="text-white fs-5 mb-3">Calidad Armchair</h3>
              </div>

              <Clock />

              <motion.button
                whileTap={{ scale: 1.2 }}
                className="buy__btn store__btn"
              >
                <Link to="/shop">Visita la tienda</Link>
              </motion.button>
            </Col>
            <Col lg="6" md="12" className="text-end counter__img">
              <img src={counterImg} alt="" />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="new__arrivals">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section__title">Lo que se viene!!</h2>
            </Col>
            {loading ? <h5 className="fw-bold">Cargando.......</h5> : <ProductsList data={mobileProducts} />}
            {loading ? <h5 className="fw-bold">Cargando.......</h5> : <ProductsList data={wirelessProducts} />}
          </Row>
        </Container>
      </section>

      <section className="popular__category">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section__title">Relojes</h2>
            </Col>
            {loading ? <h5 className="fw-bold">Cargando.......</h5> : <ProductsList data={popularProducts} />}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Home;
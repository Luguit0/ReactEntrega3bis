import React, { useRef, useEffect, useState } from "react";

import { Link, NavLink, useNavigate } from "react-router-dom";
import "./header.css";

import { motion } from "framer-motion";

import logo from "../../assets/images/eco-logo.png";
import userIcon from "../../assets/images/user-icon.png";
import noLoveProduct from "../../assets/images/no-love-product.png";

import { Container, Row } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "../../custom-hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.config";
import { toast } from "react-toastify";
import Tippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";

import { favoriteActions } from "../../redux/slices/favoriteSlice";
import { cartActions } from "../../redux/slices/cartSlice";

// import useGetData from "../../custom-hooks/useGetData";
import axios from "axios";

const nav__links = [
  {
    path: "home",
    display: "Home",
  },
  {
    path: "shop",
    display: "Tienda",
  },
  {
    path: "cart",
    display: "Carrito",
  },
];

const Header = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchApi = async() => {
      const res = await axios.get("https://json-products-5pbv94v77-vanhoa2k2.vercel.app/v1/product")
      setProducts(res.data)
    }
    fetchApi()
  },[])

  // const {data: products, loading} = useGetData('products');
  const headerRef = useRef(null);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const lovesProduct = useSelector((state) => state.favorite.favoriteItems);

  const totalLoveProduct = useSelector(
    (state) => state.favorite.totalLoveProduct
  );
  const profileActionRef = useRef(null);

  const menuRef = useRef(null);
  const meenuRef = useRef(null);

  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [visible, setVisible] = useState(false);
  const show = () => setVisible(true);
  const hide = () => setVisible(false);

  const stickyHeaderFunc = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    });
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Cerraste Sesion");
        navigate("/home");
        setVisible(false);
      })
      .catch((err) => {
        toast.error(err.massage);
      });
  };

  useEffect(() => {
    stickyHeaderFunc();

    return () => window.removeEventListener("scroll", stickyHeaderFunc);
  });

  const menuToggle = () => {
    menuRef.current.classList.toggle("active__navigation");
    meenuRef.current.classList.toggle("active__menu");
  };

  const navigateToCart = () => {
    navigate("/cart");
  };

  const dispatch = useDispatch();
  // Delete Love Product

  const [idDeleteItem, setIdDeleteItem] = useState();

  const deleteLoveItem = () => {
    dispatch(favoriteActions.deleteLoveItem(idDeleteItem));
  };
  useEffect(deleteLoveItem);

  // Add To Cart
  const [idLoveItem, setIdLoveItem] = useState();
  const addToCart = () => {
    const loveItem = products.find((item) => {
      return item._id === idLoveItem;
    });

    loveItem &&
      dispatch(
        cartActions.addItem({
          id: loveItem._id,
          productName: loveItem.productName,
          price: loveItem.price,
          imgUrl: loveItem.imgUrl,
          quantity: 1,
        })
      );

    idLoveItem && toast.success("Producto Agregado al Carro");
  };
  useEffect(addToCart, [idLoveItem]);

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav__wrapper">
            <Link to="home">
              <div className="logo">
                <img src={logo} alt="" />
                <div>
                  <h1>BlackStanley</h1>
                </div>
              </div>
            </Link>

            <div className="navigation" ref={menuRef} onClick={menuToggle}>
              <ul className="menu" ref={meenuRef}>
                {nav__links.map((item, index) => (
                  <li className="nav__item" key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? "nav__active" : ""
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="nav__icons">
              <Tippy
                offset={[-136, -10]}
                interactive
                render={(attrs) => (
                  <div className="love__product-box" tabIndex="-1" {...attrs}>
                    <h4 className="love__product-title">Guardados</h4>
                    {lovesProduct.length === 0 ? (
                      <img
                        className="no__products"
                        src={noLoveProduct}
                        alt="no love product"
                      />
                    ) : (
                      <div className="love__product-box-wrap">
                        {lovesProduct.map((item) => (
                          <div className="love__product" key={item.id}>
                            <Link
                              className="love__product-link"
                              to={`/shop/${item.id}`}
                            >
                              <img src={item.imgUrl} alt="" />
                            </Link>
                            <div className="love__product-info">
                              <h5 className="love__product-name">
                                <Link to={`/shop/${item.id}`}>
                                  {item.productName}
                                </Link>
                              </h5>
                              <div className="love__product-wrap">
                                <h6 className="love__product-category">
                                  Category: {item.category}
                                </h6>
                                <h6 className="love__product-price">
                                  ${item.price}
                                </h6>
                              </div>
                            </div>
                            <div className="love__product-icon">
                              <i
                                className="ri-delete-bin-line"
                                onClick={() => setIdDeleteItem(item.id)}
                              ></i>
                              <i
                                className="ri-shopping-cart-line"
                                onClick={() => setIdLoveItem(item.id)}
                              ></i>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              >
                <span className="fav__icon">
                  <i className="ri-heart-line"></i>
                  <span className="badge">{totalLoveProduct}</span>
                </span>
              </Tippy>
              <span className="cart__icon" onClick={navigateToCart}>
                <i className="ri-shopping-bag-line"></i>
                <span className="badge">{totalQuantity}</span>
              </span>

              <Tippy
                interactive
                offset={[-30, -10]}
                visible={visible}
                onClickOutside={hide}
                render={(attrs) => (
                  <div
                    className="profile__actions"
                    ref={profileActionRef}
                    tabIndex="-1"
                    {...attrs}
                  >
                    {currentUser ? (
                      <div className="d-flex justify-content-center flex-column">
                        <span className="logOut" onClick={logout}>
                          <i className="ri-logout-box-r-line"></i> Cerrar Sesion
                        </span>
                        <Link to="/dashboard" onClick={() => setVisible(false)}>
                          <i className="ri-folder-user-line"></i> Panel de Control
                        </Link>
                      </div>
                    ) : (
                      <div className="d-flex justify-content-center flex-column">
                        <Link to="/signup" onClick={() => setVisible(false)}>
                          <i className="ri-user-add-line"></i> Registro
                        </Link>
                        <Link to="/login" onClick={() => setVisible(false)}>
                          <i className="ri-login-box-line"></i> Inicia Sesion
                        </Link>
                        <Link to="/dashboard" onClick={() => setVisible(false)}>
                          <i className="ri-folder-user-line"></i> Panel de Control
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              >
                <span className="profile" onClick={visible ? hide : show}>
                  <motion.img
                    whileTap={{ scale: 1.2 }}
                    src={currentUser ? currentUser.photoURL : userIcon}
                    alt=""
                  />
                </span>
              </Tippy>

              <div className="mobile__menu">
                <span onClick={menuToggle}>
                  <i className="ri-menu-line"></i>
                </span>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import HomeCartView from "components/HomeCartView/HomeCartView";
import MobileMenu from "../MobileMenu";
import device from "../../modules/mediaQuery";
import MediaQuery from "react-responsive";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import Auth from "modules/Auth";


const NavBar = () => {
  const [modalShow, setModalShow] = useState(false);
  const [activeclass, setActiveClass] = useState(false);
  const cartItems = useSelector(state => state.cart.cartItems)

  const categories = useSelector(state => state.gShare.categories)

  const totalCartItems = useSelector(state => state.cart.totalItems)

  const showHideModal = () => {
    setModalShow(!modalShow);
  };

  const handleMenuClicked = () => {
    setActiveClass(!activeclass);
  };

  return (
    <div className="main_nav_container">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-right">
            <div className="logo_container">
              <Link to="/">
                Shop<span> Độc</span>
              </Link>
            </div>
            <nav className="navbar">
              <ul className="navbar_menu">
                <li>
                  <Link to="/">Trang chủ</Link>
                </li>



                <li className="mega-drop-down">
                  <a href="#">
                    Danh mục <i className="fa fa-angle-down"></i>
                  </a>

                  <div className="mega-menu">
                    <div className="mega-menu-wrap">
                      {/* {categories &&
                        categories.map((item, index) => {
                          return (
                            <div className="mega-menu-content" key={item.category_Id}>
                              <h5>{item.category_Name}</h5>
                              <ul className="stander">
                                {item.categories.split(",").map((i, idx) => {
                                  return (
                                    <li key={idx}>
                                      <a
                                        href={`/fashion-cube/shops/${item.departmentName}/${i}`}
                                      >
                                        {i}
                                      </a>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          );
                        })} */}
                      <div className="mega-menu-content">
                        <h5></h5>
                        <ul className="stander">
                          {categories && categories.map((cate, index) => {
                            return (
                              <li key={index}>
                                <a href={`/trang-chu/danh-muc/${cate.category_Id}`}>
                                  {cate.category_Name}
                                </a>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
                {Auth && Auth.IsValidated() && (
                  <li>
                    <Link to="/trang-chu/lich-su-mua-hang">Lịch sử đặt hàng</Link>
                  </li>
                )}


                {/* <li>
                  <a href="contact.html">Liên hệ</a>
                </li> */}
              </ul>
              <ul className="navbar_user">
                {/* <li>
                  <a href="#">
                    <i className="fa fa-search" aria-hidden="true"></i>
                  </a>
                </li> */}
                <li>
                  <a href={`/trang-chu/tai-khoan/${(Auth.getUserDetails() && Auth.getUserDetails().user_Id) ?? 0}`}>
                    <i className="fa fa-user" aria-hidden="true"></i>
                  </a>
                </li>
                <li className="checkout">
                  <button className="transparent-button" onClick={() => showHideModal()}>
                    <FontAwesomeIcon icon={faShoppingCart} />

                    <span id="checkout_items" className="checkout_items">
                      {totalCartItems}
                    </span>

                  </button>
                </li>
              </ul>
              <div
                className="hamburger_container"
                onClick={() => handleMenuClicked()}
              >
                <i className="fa fa-bars" aria-hidden="true"></i>
              </div>
            </nav>
          </div>
        </div>
      </div>
      <MediaQuery query={device.max.tabletL}>
        <MobileMenu
          activeClass={activeclass}
          onClose={() => handleMenuClicked()}
        />
      </MediaQuery>
      {modalShow ? (
        <HomeCartView
          cartitems={cartItems}
          show={modalShow}
          onHide={() => showHideModal()}
        />
      ) : null}
    </div>
  );
};

export default NavBar;

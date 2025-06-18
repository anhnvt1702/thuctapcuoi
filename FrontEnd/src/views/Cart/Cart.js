import React from "react";
import Heading from "../../components/Heading";
import CartItem from "./CartItem";
import { Button } from "react-bootstrap";
import CalculateTax from "../../utils/CalculateTax";
import EmptyCart from "../../assets/images/empty_cart.png";
import { useSelector } from "react-redux";

function Cart(props) {
  const { totalPrice, items } = props.cart;
  const { postCart } = props;
  const cartItems = useSelector(state => state.cart.cartItems)
  const totalCartItems= useSelector(state => state.cart.totalItems)

  return (
    <div className="shopping--cart" data-aos="fade-up">
      <div className="container">
        <div className="shopping--cart--container">
          <div className="row ">
            <Heading title="Giỏ hàng của bạn" data-aos="fade-up" />
          </div>
          <div style={{ height: 30 }}></div>
          <CartItem
            items={items || {}}
            handleClick={(pid, increase, decrease) =>
              postCart(pid, increase, decrease)
            }
          />
          {items !== undefined && items !== null ? (
            <div
              className="d-flex flex-column justify-content-end align-items-end"
              style={{ paddingRight: 50 }}
            >
              <p>
                SubTotal :{" "}
                <span style={{ color: "#FE4C50" }}>₹{totalPrice}</span>
              </p>
              <p>
                Shipping : <span style={{ color: "#FE4C50" }}>Free</span>
              </p>

              <p>
                Taxes :{" "}
                <span style={{ color: "#FE4C50" }}>
                  ₹ {CalculateTax(totalPrice).taxes}
                </span>
              </p>

              <h3 style={{ textAlign: "center" }}>
                Total:{" "}
                <span style={{ color: "#FE4C50" }}>
                  ₹ {CalculateTax(totalPrice).total}
                </span>
              </h3>
              <hr />

              <Button variant="danger" size="sm" style={{ marginTop: 30 }}>
                Confirm Checkout
              </Button>
            </div>
          ) : (
            <div style={{ textAlign: "center" }}>
              <img
                src={EmptyCart}
                alt=""
                style={{ maxHeight: 400, maxWidth: 400 }}
                className="img-fluid"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;

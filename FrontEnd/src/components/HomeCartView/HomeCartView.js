import React from "react";
import { Modal } from "react-bootstrap";
import "./style.css";
import jumpTo from "../../modules/Navigation";
import { useDispatch } from "react-redux";
import { removeFromCart } from "redux/actions/cartAction";

function HomeCartView(props) {

  const { cartitems } = props;
  const dispatch = useDispatch();

  const totalPrice = cartitems?.reduce((total, item) => total + item.price * item.quantity, 0);

  const goToChechout = () => {
    jumpTo("/trang-chu/check-out");
  };

  const removeCartItem = (product) =>{
    dispatch(removeFromCart(product))
  }

  return (
    <Modal {...props} className="right">
      <Modal.Header closeButton>
        <Modal.Title>Giỏ hàng của bạn</Modal.Title>
        {/* {cartitems !== undefined && cartitems !== null ? (
          <span className="checkout--btn" onClick={() => goToChechout()}>
            checkout{" "}
          </span>
        ) : null} */}
      </Modal.Header>
      <Modal.Body className="modal-body-content">

        {/* <div className="empty--basket">
          <h4>Please login to view cart</h4>
          <img src={EmptyCart} className="img-fluid" alt="" />
        </div> */}

        {cartitems !== undefined &&
          cartitems !== null && Array.isArray(cartitems) &&
          cartitems.map((product, index) => {
            return (
              <div key={product.productId} className="basket--item">
                <div className="basket--item--img">
                  <img src={product.img1path} alt={product.img1} />
                </div>
                <div className="basket--item--details">
                  <div className="basket--item--title">
                    {product.productName}
                  </div>
                  <div className="basket--item--quantity">
                    Số lượng: <span>{product.quantity}</span>
                  </div>
                  <div className="basket--item--price">
                    {" "}
                    Giá: <span>{product.price} VNĐ</span>
                  </div>
                </div>

                <a onClick={() => removeCartItem(product)} style={{marginLeft:"auto", cursor:"pointer"}}>X</a>
              </div>
            );
          })}
        {cartitems !== undefined && cartitems !== null && (
          <div className="total--price-container">
            <h3 style={{ textAlign: "center" }}>
              Tổng tiền: <span style={{ color: "#FE4C50" }}>{totalPrice} VNĐ</span>{" "}
            </h3>
            <button
              className="btn btn-wide log-btn"
              style={{ marginTop: 20 }}
              onClick={() => goToChechout()}
            >
              THANH TOÁN
            </button>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default HomeCartView;

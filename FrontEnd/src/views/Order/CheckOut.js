import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";
import ConfirmationDialog from "utils/ConfirmDialog";
import React, { useState, useEffect } from "react";
import {
  commonData,
  Order_Status_Enum,
  SettleMethodEnum as SettleTypeEnum,
} from "utils/commonData";
import {
  showToast,
  SUCCESS,
  ERROR,
  WARNING,
} from "components/Common/CustomToast";
import validator from "validator";
import { useRef } from "react";
import { addOrderNotMember } from "api/orderApi";
import { MD5 } from "crypto-js";
import { v4 as uuidv4 } from "uuid";
import jumpTo from "modules/Navigation";
import { getErrorByCode } from "redux/actions/errorMsgAction";
import Auth from "modules/Auth";
import { clearCart } from "../../redux/actions/cartAction";
import { useDispatch } from "react-redux";

const initOrder = {
  order_Id: 0,
  customer_Id: 0,
  // order_Date: null,
  total_Order_Value: 0,
  order_Status: Order_Status_Enum.DANG_XU_LY,
  customer_Name: "",
  address: "",
  city: "",
  district: "",
  province: "",
  settle_Type: 0,
  phone: "",
  method:"",
  track_Id: MD5(uuidv4().toString()).toString(),
};

function CheckOut() {
  const FIXED_SETTLE_TYPES = [
    { cdVal: 1, content: "Thanh toán khi nhận hàng (COD)" },
    { cdVal: 2, content: "Ví điện tử MoMo" },
    { cdVal: 3, content: "ViettelPay" },
    { cdVal: 4, content: "VNPay - Chuyển khoản ngân hàng" },
  ];
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalCartItems = useSelector((state) => state.cart.totalItems);
  const totalPrice =
    cartItems &&
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const [order, setOrder] = useState(initOrder);

  const [openConfirm, setopenConfirm] = useState(false);
  const [msgConfirm, setMsgConfirm] = useState("");
  const [typeConfirm, setTypeConfirm] = useState("");

  const inputRefs = {
    customer_Name: useRef(null),
    address: useRef(null),
    city: useRef(null),
    district: useRef(null),
    phone: useRef(null),
    province: useRef(null),
  };

  useEffect(() => {
    const orderDetails = cartItems.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      price: item.price,
      productName: item.productName,
      img1path: item.img1path,
    }));

    setOrder({
      ...order,
      orderDetails: orderDetails,
      total_Order_Value: totalPrice,
    });
  }, [cartItems]);

  const validate = async () => {
    if (!cartItems || cartItems.length == 0) {
      showToast("Giỏ hàng của bạn đang trống", ERROR);
      return false;
    }

    if (!order.customer_Name || order.customer_Name.trim() === "") {
      showToast("Họ tên không được để trống", ERROR);
      inputRefs.customer_Name.current.focus();
      return false;
    }

    if (!order.address || order.address.trim() === "") {
      showToast("Địa chỉ nhận hàng không được để trống", ERROR);
      inputRefs.address.current.focus();
      return false;
    }

    const check = validator.isMobilePhone(order.phone, "vi-VN");

    if (!check) {
      showToast("Số điện thoại không hợp lệ", ERROR);
      inputRefs.phone.current.focus();
      return check;
    }

    if (!order.city || order.city.trim() === "") {
      showToast("Thành phố không được để trống", ERROR);
      inputRefs.city.current.focus();
      return false;
    }

    if (!order.district || order.district.trim() === "") {
      showToast("Tỉnh không được để trống", ERROR);
      inputRefs.district.current.focus();
      return false;
    }

    if (!order.province || order.province.trim() === "") {
      showToast("Huyện/Xã không được để trống", ERROR);
      inputRefs.province.current.focus();
      return false;
    }

    if (!order.settle_Type || order.settle_Type == 0) {
      showToast("Phương thức thanh toán không được để trống", ERROR);
      return false;
    }

    return true;
  };

  const handleSave = async () => {
    let _validate = await validate();
    if (!_validate) return;

    openConfirmDialog("Bạn có chắc chắn muốn đặt hàng?", "ADD_ORDER");
  };

  const openConfirmDialog = (msg, type) => {
    setopenConfirm(true);
    setMsgConfirm(msg);
    setTypeConfirm(type);
  };

  const handleAcceptConfirm = () => {
    setopenConfirm(false);
    dispatch(clearCart());
    if (typeConfirm === "ADD_ORDER") {
      var order_new = {
        ...order,
        customer_Id: (Auth && Auth.getUserId()) || 0,
      };

      addOrderNotMember(order_new)
        .then((data) => {
          if (data && data.success && data.success > 0) {
            showToast("Đặt hàng thành công", SUCCESS);
            jumpTo("/trang-chu/lich-su-mua-hang" );
          } else {
            var errMsg =
              getErrorByCode(data.success) || "Có lỗi xảy ra khi đặt hàng";
            showToast(errMsg, ERROR);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else if (typeConfirm === "EXIT_FORM") {
    }

    setTypeConfirm("");
  };

  function onInputChange(e, property) {
    setOrder({
      ...order,
      [property]: e.target.value,
    });
  }

  return (
    <>
      <div className="maincontainer">
        <div className="container">
          <div className="py-5 text-center">
            <h2>THANH TOÁN SẢN PHẨM</h2>
          </div>

          <div className="row">
            <div className="col-md-5 order-md-2 mb-4">
              <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-muted">Thông tin giỏ hàng</span>
                <span className="badge badge-secondary badge-pill">
                  {totalCartItems}
                </span>
              </h4>
              <ul className="list-group mb-3">
                {cartItems !== undefined &&
                  cartItems !== null &&
                  Array.isArray(cartItems) &&
                  cartItems.map((product, index) => {
                    return (
                      <div key={product.productId} className="row no-gutters">
                        <div className="col-md-4">
                          <img
                            src={product.img1path}
                            alt={product.img1}
                            style={{ width: "100%", height: "69px" }}
                          />
                        </div>
                        <div className="col-md-8">
                          <li className="list-group-item d-flex justify-content-between lh-condensed">
                            <div>
                              <h6 className="my-0">{`${product.productName} (x ${product.quantity})`}</h6>
                              <small className="text-muted">Brief </small>
                            </div>
                            <span className="text-muted">
                              {product.price} VNĐ
                            </span>
                          </li>
                        </div>
                      </div>
                    );
                  })}

               
                <li className="list-group-item d-flex justify-content-between">
                  <span>Tổng tiền: </span>
                  <strong>{totalPrice} VNĐ</strong>
                </li>
              </ul>

         
            </div>
            <div className="col-md-7 order-md-1">
              <h4 className="mb-3">Thông tin khách hàng</h4>
              <form className="needs-validation" noValidate>
                <div className="mb-3">
                  <label htmlFor="customerName">Họ tên</label>
                  <input
                    type="text"
                    ref={inputRefs.customer_Name}
                    className="form-control"
                    id="customerName"
                    placeholder=""
                    onChange={(e) => onInputChange(e, "customer_Name")}
                  />
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="address">Địa chỉ nhận hàng</label>
                    <input
                      type="text"
                      ref={inputRefs.address}
                      className="form-control"
                      id="address"
                      placeholder=""
                      required
                      onChange={(e) => onInputChange(e, "address")}
                    />
                    <div className="invalid-feedback">
                      Please enter your shipping address.
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="address">Số điện thoại</label>
                    <input
                      type="text"
                      ref={inputRefs.phone}
                      className="form-control"
                      id="address"
                      placeholder=""
                      required
                      onChange={(e) => onInputChange(e, "phone")}
                    />
                    <div className="invalid-feedback">
                      Please enter your shipping address.
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-5 mb-3">
                    <label htmlFor="country">Thành phố</label>
                    
                    <input
                      type="text"
                      ref={inputRefs.city}
                      className="form-control"
                      id="country"
                      placeholder=""
                      required
                      onChange={(e) => onInputChange(e, "city")}
                    />

                    <div className="invalid-feedback">
                      Please select a valid country.
                    </div>
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="state">Huyện</label>
                 
                    <input
                      type="text"
                      ref={inputRefs.district}
                      className="form-control"
                      id="zip"
                      placeholder=""
                      required
                      onChange={(e) => onInputChange(e, "district")}
                    />

                    <div className="invalid-feedback">
                      Please provide a valid state.
                    </div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <label htmlFor="zip">Xã</label>
                    <input
                      type="text"
                      ref={inputRefs.province}
                      className="form-control"
                      id="zip"
                      placeholder=""
                      required
                      onChange={(e) => onInputChange(e, "province")}
                    />
                    <div className="invalid-feedback">Zip code required.</div>
                  </div>
                </div>
                
                <hr className="mb-4" />

                <h4 className="mb-3">Phương thức thanh toán</h4>
                <div className="d-block my-3">
                  {FIXED_SETTLE_TYPES.map((type) => (
                    <div
                      key={type.cdVal}
                      className="custom-control custom-radio"
                    >
                      <input
                        id={`paymentMethod-${type.cdVal}`}
                        name="paymentMethod"
                        value={type.cdVal}
                        type="radio"
                        className="custom-control-input"
                        onChange={(e) => onInputChange(e, "settle_Type")}
                      />
                      <label
                        className="custom-control-label"
                        htmlFor={`paymentMethod-${type.cdVal}`}
                      >
                        {type.content}
                      </label>

                      {type.cdVal === 4 && (
                        <p
                          className="mt-2 ml-4 text-muted"
                          style={{ fontSize: "14px" }}
                        >
                          Bạn có thể chuyển khoản qua VNPay hoặc gửi email xác
                          nhận về địa chỉ <strong>nguyenphuphong@gmail.com</strong> với
                          nội dung: Thanh toán đơn hàng: [Mã đơn]
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                <hr className="mb-4" />
                <button
                  className="btn btn-primary btn-lg btn-block"
                  type="button"
                  onClick={handleSave}
                >
                  Thanh toán
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <ConfirmationDialog
        messageConfirm={msgConfirm}
        openConfirm={openConfirm}
        onConfirm={handleAcceptConfirm}
        onCancelConfirm={() => {
          setopenConfirm(false);
          setTypeConfirm("");
        }}
      />
    </>
  );
}

export default CheckOut;

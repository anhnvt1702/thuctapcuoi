import React, { useState, useEffect } from "react";
import Auth from "../../modules/Auth";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { productInfo } from "objectInfo/orderInfo";
import { getProductById } from "api/productApi";
import "font-awesome/css/font-awesome.min.css";
import { showToast, SUCCESS, ERROR } from "components/Common/CustomToast";
import { useDispatch } from "react-redux";
import { addToCart, postCart } from "redux/actions/cartAction";
import { Button, Form } from "react-bootstrap";
import { addReview, getReviewByProductId } from "api/reviewApi";
import { reviewInfo } from "objectInfo/reviewInfo";
import ConfirmationDialog from "utils/ConfirmDialog";
import { Rating } from "@mui/material";
import { getErrorByCode } from "redux/actions/errorMsgAction";

function ProductDetail() {
  const horizontalLineStyle = {
    height: "1px",
    backgroundColor: "#000", // Change the color as needed
    margin: "20px 0", // Adjust spacing as needed
  };

  const { productId } = useParams();
  const [product, setProduct] = useState({ ...productInfo, quantity: 1 });
  const dispatch = useDispatch();
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState("");
  const [dataReview, setDataReview] = useState(reviewInfo);

  const [openConfirm, setopenConfirm] = useState(false);
  const [msgConfirm, setMsgConfirm] = useState("");
  const [typeConfirm, setTypeConfirm] = useState("");
  const [starRate, setStarRate] = useState(0);

  const [state, setState] = useState({
    color: "",
    size: "",
    pic: "",
    selectedSize: "",
    id: "",
    quantity: 1,
    modalShow: false,
    login: true,
  });

  useEffect(() => {
    getProductById(productId ? productId : 0)
      .then((data) => {
        setProduct({ ...data, quantity: 1 });
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    getReviews();
  }, []);

  const getReviews = () => {
    //lấy list review
    getReviewByProductId(productId ? productId : 0)
      .then((data) => {
        setReviews(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const onAddClicked = () => {
    setProduct({ ...product, quantity: product.quantity + 1 });
  };

  const onRemoveClicked = () => {
    if (product.quantity > 1) {
      setProduct({ ...product, quantity: product.quantity - 1 });
    }
  };

  const addToBag = () => {
    if (product.quantity <= 0) {
      showToast("Số lượng sản phẩm không hợp lệ", ERROR);
      return;
    }

   
    dispatch(addToCart(product));
    showToast("Thêm vào giỏ hàng thành công", SUCCESS);
   
  };

  const productInCart = () => {
    let available = false;
    return available;
  };

  const submitReview = async () => {
    try {
      openConfirmDialog("Bạn đồng ý gửi đánh giá", "SEND_REVIEW");
    } catch (error) {
      console.error(error);
    }
  };

  const openConfirmDialog = (msg, type) => {
    setopenConfirm(true);
    setMsgConfirm(msg);
    setTypeConfirm(type);
  };

  const handleAcceptConfirm = () => {
    setopenConfirm(false);
    if (typeConfirm === "SEND_REVIEW") {
      var dataReview_new = {
        ...dataReview,
        customer_Id: (Auth && Auth.getUserId()) || 0,
      };

      addReview(dataReview_new)
        .then((data) => {
          if (data && data.success && data.success > 0) {
            showToast("Cảm ơn đã để lại đánh giá", SUCCESS);
            getReviews();
          } else {
            var errMsg =
              getErrorByCode(data.success) || "Có lỗi xảy ra khi đánh giá";
            showToast(errMsg, ERROR);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          showToast("Có lỗi xảy ra khi đánh giá", ERROR);
        });
    } else if (typeConfirm === "EXIT_FORM") {
    }

    setTypeConfirm("");
  };

  function onInputChange(e, property) {
    setDataReview({
      ...dataReview,
      productId: isNaN(parseInt(productId)) ? 0 : parseInt(productId),
      [property]: e.target.value,
    });
  }

  return (
    <>
      <div className="container single_product_container">
        {product && (
          <div>
            <div className="row">
              <div className="col">
                <div className="breadcrumbs d-flex flex-row align-items-center">
                  <ul>
                    <li>
                      <a href="#">
                        <i className="fa fa-angle-right" aria-hidden="true"></i>
                        {product?.category?.department?.departmentName}
                      </a>
                    </li>
                    <li className="active">
                      <a href="#">
                        <i className="fa fa-angle-right" aria-hidden="true"></i>
                        {product?.category?.categoryName}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-7">
                <div
                  className="single_product_image"
                  style={{ textAlign: "center" }}
                >
                  <img
                    src={product?.img1path}
                    alt={product?.productName}
                    style={{
                      width: "400px",
                      height: "400px",
                      objectFit: "cover",
                      borderRadius: "10px",
                      boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
                    }}
                  />
                </div>
              </div>

              <div className="col-lg-5">
                <div className="product_details">
                  <div className="product_details_title">
                    <h2>{product.productName}</h2>
                    <p>{product.description}</p>
                  </div>
                  <div className="free_delivery d-flex flex-row align-items-center justify-content-center">
                    <span>
                      <span className="fa fa-truck"></span>
                    </span>
                    <span>Miễn phí vận chuyển</span>
                  </div>
                  <div className="original_price">
                    {" "}
                    {(parseFloat(product.price) + 30).toFixed(2) + " VNĐ"}
                  </div>
                  <div className="product_price">{product.price + " VNĐ"}</div>
                  <ul className="star_rating">
                    <li>
                      <i className="fa fa-star" aria-hidden="true"></i>
                    </li>
                    <li>
                      <i className="fa fa-star" aria-hidden="true"></i>
                    </li>
                    <li>
                      <i className="fa fa-star" aria-hidden="true"></i>
                    </li>
                    <li>
                      <i className="fa fa-star" aria-hidden="true"></i>
                    </li>
                    <li>
                      <i className="fa fa-star-o" aria-hidden="true"></i>
                    </li>
                  </ul>
                  <div className="product_color">
                    {/* <span>Màu sắc</span>
                    <ul>
                      <li style={{ background: "#e54e5d" }}></li>
                      <li style={{ background: "#252525" }}></li>
                      <li style={{ background: "#60b3f3" }}></li>
                    </ul> */}
                    <span>Số lượng sản phẩm còn lại: </span>
                    <span className="product_price">
                      {`${product.stockQuantity}`}
                    </span>
                    <span> sản phẩm </span>
                  </div>
                  <div className="quantity d-flex flex-column flex-sm-row align-items-sm-center">
                    <span>Số lượng:</span>
                    <div className="quantity_selector">
                      <span
                        className={
                          product.quantity > 1 ? "minus" : "minus disabled"
                        }
                        onClick={onRemoveClicked}
                      >
                        <i className="fa fa-minus" aria-hidden="true"></i>
                      </span>
                      <span id="quantity_value">
                        {product && product.quantity}
                      </span>
                      <span className="plus" onClick={onAddClicked}>
                        <span
                          className="fa fa-plus"
                          onClick={onAddClicked}
                        ></span>
                      </span>
                    </div>
                    <div
                      className="red_button product-add_to_cart_button"
                      onClick={addToBag}
                    >
                      <a href="#">Thêm vào giỏ hàng</a>
                    </div>
                    {/* <div className="product_favorite d-flex flex-column align-items-center justify-content-center">
                    <i className="far fa-heart"></i>
                  </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <label className="comment-box-label">ĐÁNH GIÁ SẢN PHẨM</label>

        <div className="row">
          <div
            className="col-12 border p-3 "
            style={{ height: "200px", overflowY: "auto", borderRadius: "10px" }}
          >
            {reviews &&
              Array.isArray(reviews) &&
              reviews.map((rv, index) => {
                return (
                  <div key={rv.review_Id}>
                    {index != 0 && <hr className="my-4" />}
                    <div className="row">
                      <div className="col-1">
                        <p className="font-italic">{rv.customer_Name}</p>
                      </div>
                      <div className="col-11">
                        <div>
                          <Rating
                            name="simple-controlled"
                            value={rv.rating}
                            precision={1}
                            readOnly={true}
                          />
                        </div>
                        <div>{rv.review_Content}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>

          {Auth.IsValidated() && (
            <div className="col-12 mt-3 p-0">
              <Rating
                name="simple-controlled"
                value={dataReview.rating}
                precision={1}
                onChange={(event, newValue) => {
                  setDataReview({ ...dataReview, rating: newValue });
                }}
              />
              <Form>
                <Form.Group controlId="exampleTextarea">
                  <Form.Control
                    as="textarea"
                    rows={1}
                    placeholder="Để lại bình luận của bạn ở đây"
                    onChange={(e) => onInputChange(e, "review_Content")}
                  />
                </Form.Group>
              </Form>

              <Button
                variant="primary"
                style={{ float: "right" }}
                onClick={submitReview}
              >
                Gửi bình luận
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="container"></div>
      <ConfirmationDialog
        messageConfirm={msgConfirm}
        openConfirm={openConfirm}
        onConfirm={handleAcceptConfirm}
        onCancelConfirm={() => {
          setopenConfirm(false);
          setTypeConfirm("");
        }}
      ></ConfirmationDialog>
    </>
  );
}

export default ProductDetail;

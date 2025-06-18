

import React from "react";
import jumpTo from "../../modules/Navigation";


function SingleProduct(props) {
  const { productItem } = props;
  console.log(productItem);
  
  return (
    <div className="product-item men">
      <div
        className="product discount product_filter"
        onClick={() =>
          jumpTo(`/trang-chu/san-pham/${productItem.productId
}`)
        }
      >
        <div className="product_image">
          <img src={productItem.img1path} alt={productItem.productName} className="img-fluid" />
        </div>
        <div className="favorite favorite_left">
          <i className="far fa-heart"></i>
        </div>
        <div className="product_bubble product_bubble_right product_bubble_red d-flex flex-column align-items-center">
          <span>-$20</span>
        </div>
        <div className="product_info">
          <h6 className="product_name">
            <div>{productItem.productName}</div>
          </h6>
          <div className="product_price">
             {productItem.price} VNĐ
            <span>  {(parseFloat(productItem.price) + 30)} VNĐ</span>
          </div>
        </div>
      </div>
      <div
        className="red_button add_to_cart_button"
        onClick={() => props.addToBag(productItem.productId
)}
      >
        <div style={{ color: "#ffffff" }}>Thêm vào giỏ hàng</div>
      </div>
    </div>
  );
}

export default SingleProduct;

// categoryApi.js
import API from "../myAxios/API";

export function getReviewByProductId(p_product_id) {
  return API({
    method: "GET",
    url: `/review/get-by-product-id`,
    params:{
      p_product_id:p_product_id,
    }
  }).then((res) => {
    return res.data;
  }).catch((error) => {
    return error;
  });
};


export function addReview(data) {
  return API({
    method: "POST",
    url: `api/user-side/review/insert`,
    data:data,
  }).then((res) => {
    return res.data;
  }).catch((error) => {
    return error;
  });
};
// categoryApi.js
import API from "../myAxios/API";

export function getProductsByCategoryApi(params) {
  return API({
    method: "GET",
    url: `/product/get-by-category?${new URLSearchParams(params)}`,
  }).then((res) => {
    return res.data;
  }).catch((error) => {
    return error;
  });
};


export function searchProductApi(keySearch, p_user_name, page,rowPerPage,orderBy) {

  const params = {
    keySearch:keySearch,
    p_user_name:p_user_name,
    page:page,
    rowPerPage:rowPerPage,
    orderBy:orderBy,
  }

  return API({
    method: "GET",
    url: `/api/user-side/product/searchV2?${new URLSearchParams(params)}`,
  }).then((res) => {
    return res.data;
  }).catch((error) => {
    return error;
  });
};


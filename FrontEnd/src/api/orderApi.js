// categoryApi.js
import API from "../myAxios/API";

export function addOrderNotMember(data) {
  return API({
    method: "POST",
    url: `/order/add-not-member`,
    data: data,
    // data:{
    //     "order_Id":0,
    //     "customer_Id":0,
    //     "order_Date":new Date(), //lỗi do ngày = '' khi truyền xuống service
    //     "total_Order_Value":0,
    //     "order_Status":"",
    //     "customer_Name":"Trung Do",
    //     "address":"HN",
    //     "city":"HN",
    //     "district":"HN",
    //     "province":"HN",
    //     "settle_Type":0,
    //     "phone":"0967878989"
    // },
  })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
}

export function getOrderByTrackingId(p_user_name, p_tracking_id) {
  const params = {
    p_user_name: p_user_name,
    p_tracking_id: p_tracking_id,
  };

  return API({
    method: "GET",
    url: `/order/get-tracking?${new URLSearchParams(params)}`,
  })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
}

export function getOrdersByUser(p_user_id, p_keySearch) {
  const params = {
    p_user_id: p_user_id,
    keySearch: p_keySearch,
  };
  console.log(`getOrdersByUser=${JSON.stringify(params)}`);

  return API({
    method: "GET",
    url: `/order/get-by-user?${new URLSearchParams(params)}`,
  })
    .then((res) => res.data)
    .catch((error) => {
      console.error(error);
      return error;
    });
}


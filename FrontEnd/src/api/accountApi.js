import API from "../myAxios/API";
import queryString from 'query-string';

export function GetUserById(p_user_name, p_user_id) {

  const params = {
    p_user_name: p_user_name,
    p_user_id: p_user_id
  }

  return API({
    method: "GET",
    url: `/user/get-by-id?${queryString.stringify(params)}`,
  }).then((res) => {
    return res.data;
  }).catch((error) => {
    return error;
  });
};


export function AddUserCustomer(data) {

  var bodyData = { ...data }

  return API({
    method: "POST",
    url: `/user/signin`,
    data: bodyData,
  }).then((res) => {
    return res.data;
  }).catch((error) => {
    return error;
  });
};

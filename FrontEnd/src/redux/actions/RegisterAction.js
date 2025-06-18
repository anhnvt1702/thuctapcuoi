import { register } from "../../ServerRequest";

export const userRegister = (
  username,
  full_Name,
  email,
  password,
  phone
) => dispatch => {
  dispatch({
    type: POST_REGISTER_BEGIN
  });

  return register(username,full_Name, email, password,phone)
    .then(res => {
      dispatch({
        type: POST_REGISTER_SUCCESS,
        payload: res
      });

      return res;
    })
    .catch(error => {
      dispatch({
        type: POST_REGISTER_FAIL,
        payload: { error }
      });

      throw error;
    });
};

export const POST_REGISTER_BEGIN = "POST_REGISTER_BEGIN";
export const POST_REGISTER_SUCCESS = "POST_REGISTER_SUCCESS";
export const POST_REGISTER_FAIL = "POST_REGISTER_FAIL";

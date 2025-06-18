import { login } from "../../ServerRequest";

export const userLogin = (username, password) => dispatch => {
  dispatch({
    type: LOGIN_BEGIN
  });
  return login(username, password)
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res
      });

      return res;
    })
    .catch(error => {
      dispatch({
        type: LOGIN_FAIL,
        payload: { error }
      });

      throw error;
    });
};

export const insertToken = () => dispatch => {
  let token;
  if (localStorage.getItem("current_user")) {
    token = JSON.parse(localStorage.getItem("current_user"));
    dispatch({
      type: INSERT_TOKEN_SUCCESS,
      payload: token
    });
  } else {
    dispatch({
      type: INSERT_TOKEN_FAIL
    });
  }
};

export const LOGIN_BEGIN = "LOGIN_BEGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const INSERT_TOKEN_SUCCESS = "INSERT_TOKEN_SUCCESS";
export const INSERT_TOKEN_FAIL = "INSERT_TOKEN_FAIL";

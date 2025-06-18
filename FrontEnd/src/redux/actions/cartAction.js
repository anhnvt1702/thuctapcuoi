import API from "../../myAxios/API";
import Auth from "../../modules/Auth";

export const getCartByUserId = () => dispatch => {
  let userId = Auth.getUserId();
  dispatch({
    type: GET_CART_BY_USERID_BEGIN
  });
  return API({
    method: "GET",
    url: `users/${userId}/cart`
  })
    .then(res => {
      dispatch({
        type: GET_CART_BY_USERID_SUCCESS,
        payload: res
      });
      return res;
    })
    .catch(error => {
      dispatch({
        type: GET_CART_BY_USERID_FAIL,
        payload: { error }
      });
      return error;
    });
};

export const postCart = (productId, increase, decrease) => dispatch => {
  let userId = Auth.getUserId();
  dispatch({
    type: POST_CART_BEGIN
  });
  return API({
    method: "POST",
    url: `users/${userId}/cart`,
    data: {
      userId,
      productId,
      increase,
      decrease
    }
  })
    .then(res => {
      dispatch({
        type: POST_CART_SUCCESS,
        payload: res
      });
      return res;
    })
    .catch(error => {
      dispatch({
        type: POST_CART_FAIL,
        payload: { error }
      });
      return error;
    });
};

export const addToCart = (product) => {
  console.log('addtocart')
  
  return (dispatch) => {
    dispatch({
      type: POST_CART_BEGIN
    });
    dispatch({
      type: ADD_TO_CART,
      payload: {
        ...product
      }
    });
  }
};


export const removeFromCart = (product) => {
  console.log(`removeFromCart`);
  console.log(product);
  
  
  return (dispatch) => {
    dispatch({
      type: REMOVE_FROM_CART,
      payload: {
        ...product
      }
    });
  }
};

export const restoreCartFromLocalStorage = () => {
  const savedCart = localStorage.getItem('cart');
  const cartData = savedCart ? JSON.parse(savedCart) : null;
  return {
    type: 'RESTORE_CART_LOCALSTORAGE',
    payload: cartData,
  };
};
export const clearCart = () => {
  localStorage.removeItem('cart'); // Nếu bạn dùng localStorage để lưu cart
  return {
    type: CLEAR_CART
  };
};


export const POST_CART_BEGIN = "POST_CART_BEGIN";
export const POST_CART_SUCCESS = "POST_CART_SUCCESS";
export const POST_CART_FAIL = "POST_CART_FAIL";

export const GET_CART_BY_USERID_BEGIN = "GET_CART_BY_USERID_BEGIN";
export const GET_CART_BY_USERID_SUCCESS = "GET_CART_BY_USERID_SUCCESS";
export const GET_CART_BY_USERID_FAIL = "GET_CART_BY_USERID_FAIL";
export const ADD_TO_CART = "ADD_TO_CART";
export const RESTORE_CART_LOCALSTORAGE = "RESTORE_CART_LOCALSTORAGE"; 
export const REMOVE_FROM_CART = "REMOVE_FROM_CART"; 
export const CLEAR_CART = "CLEAR_CART";
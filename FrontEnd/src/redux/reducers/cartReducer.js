import {
  POST_CART_BEGIN,
  POST_CART_SUCCESS,
  POST_CART_FAIL,
  GET_CART_BY_USERID_BEGIN,
  GET_CART_BY_USERID_SUCCESS,
  GET_CART_BY_USERID_FAIL,
  ADD_TO_CART,
  RESTORE_CART_LOCALSTORAGE,
  REMOVE_FROM_CART,
  CLEAR_CART,
 
} from "../actions/cartAction";

const initialState = {
  cartItems: [],
  loading: false,
  error: {},
  totalItems: 0,
  totalPrice: 0
};
const calculateTotalPrice = (cartItems) => {
  return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
};
export default (state = initialState, action) => {
  switch (action.type) {
    case POST_CART_BEGIN:
      return {
        ...state,
        loading: true,
        error: {},
      };
    case POST_CART_SUCCESS:
      return {
        ...state,
        cartItems: action.payload.data.cart,
        loading: false,
        totalItems: action.payload.data.cart?.length || 0,
      };
    case POST_CART_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error.response.data,
      };
    case GET_CART_BY_USERID_BEGIN:
      return {
        ...state,
        loading: true,
        error: {},
      };
    case GET_CART_BY_USERID_SUCCESS:
      return {
        ...state,
        cartItems: action.payload.data.cart,
        loading: false,
        totalItems: action.payload.data.cart?.length || 0,
      };
    case GET_CART_BY_USERID_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error.response.data,
      };
    case REMOVE_FROM_CART:
      console.log(`REMOVE_FROM_CART=${JSON.stringify()}`);
      var id = action.payload.productId;
      console.log(`id=${JSON.stringify(id)}`);
      const DataAferRemove =
        state && state.cartItems && Array.isArray(state.cartItems)
          ? state.cartItems.filter(
              (item) => item.productId != action.payload.productId
            )
          : null;
      console.log(`DataAferRemove=${JSON.stringify(DataAferRemove.length)}`);
      return {
        ...state,
        cartItems: DataAferRemove,
        totalItems: DataAferRemove?.length || 0, // Tính tổng số sản phẩm
      };
    case ADD_TO_CART: {
      console.log("Thêm sản phẩm:", action.payload);
      const existingItem = state.cartItems.find(
        (item) => item.productId === action.payload.productId
      );
      const _qtty = action.payload.quantity || 1;

      let updatedCart;

      if (existingItem) {
        updatedCart = state.cartItems.map((item) =>
          item.productId === action.payload.productId
            ? { ...item, quantity: item.quantity + _qtty }
            : item
        );
      } else {
        updatedCart = [
          ...state.cartItems,
          { ...action.payload, quantity: _qtty },
        ];
      }

      return {
        ...state,
        cartItems: updatedCart,
        totalItems: updatedCart.length,
        totalPrice: calculateTotalPrice(updatedCart),
      };
    }
    case CLEAR_CART:
  return {
    ...state,
    cartItems: [],
    totalItems: 0,
    totalPrice: 0
  };
    case RESTORE_CART_LOCALSTORAGE:
      if (action.payload) {
        return action.payload;
      }
      return state;
    default:
      return state;
  }
};

import { combineReducers } from "redux";
import login from "./LoginReducer";
import register from "./RegisterReducer";
import department from "./DepartmentReducer";
import product from "./productReducer";
import variant from "./variantsReducer";
import cart from "./cartReducer";
import AllcodeReducer from "./AllcodeReducer"
import errorMessageReducer from "./errorMessageReducer"
import shareReducer from "./shareReducer";
// import checkout from './checkoutReducer'
// import filter from './filterReducer'

const rootReducer = combineReducers({
  department,
  login,
  register,
  product,
  variant,
  cart,
  AllcodeReducer,
  errorMessageReducer,
  gShare: shareReducer,
});
export default rootReducer;
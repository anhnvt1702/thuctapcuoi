import {
  getAllProducts,
  applyFilters,
  getProductsByCategory
} from "../../redux/actions/productAction";
import { connect } from "react-redux";
import Category from "./Category";
import { postCart } from "../../redux/actions/cartAction";

import { withRouter } from "react-router-dom";

const mapStoreToProps = state => ({
  products: state.product.products,
  loading: state.product.loading
});
const mapDispatchToProps = dispatch => ({
  getProductsByCategory: categoryId => dispatch(getAllProducts(categoryId)),
  applyFilters: filter_string => dispatch(applyFilters(filter_string)),
  postCart: productId => dispatch(postCart(productId))
});

export default connect(mapStoreToProps, mapDispatchToProps)(withRouter(Category));

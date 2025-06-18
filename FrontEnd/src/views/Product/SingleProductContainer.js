

import { connect } from "react-redux";
import ProductDetail from "./ProductDetail";
import { getProduct } from "../../redux/actions/productAction";
import { getVariantsByProductId } from "../../redux/actions/variantsAction";
import { postCart } from "../../redux/actions/cartAction";

const mapStoreToProps = (state) => ({
  product: state.product.product,
  variants: state.variant.variants,
});
const mapDispatchToProps = {
  getProduct,
  getVariantsByProductId,
  postCart,
};

export default connect(mapStoreToProps, mapDispatchToProps)(ProductDetail);

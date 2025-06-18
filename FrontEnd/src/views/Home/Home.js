import React, { Component } from "react";
import { login } from "../../ServerRequest";
import API from "../../myAxios/API";
import Auth from "../../modules/Auth";
import HomeBanner from "../../components/HomeBanner";
import CategoryBanner from "../../components/CategoryBanner/CategoryBanner";
import NewArrivals from "../../components/Products/NewArrivals";
import BestSeller from "../../components/Products/BestSeller";
import Benefit from "../../components/Benefit";
import Advertisement from "../../components/Advertisement";
import PropTypes from "prop-types";
import jumpTo from "../../modules/Navigation";
import LoginRegister from "../../components/LoginRegisterModal";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      modalShow: false,
      login: 1
    };
    this.addToBag = this.addToBag.bind(this);
  }

  componentDidMount() {
    if (!this.props.products) {
      // this.props.getAllProducts();
    }
  }

  showHideModal = () => {
    this.setState({ modalShow: false });
  };

  loginclicked = () => {
    this.setState({ modalShow: true, login: 1 });
  };
  
  registerclicked = () => {
    this.setState({ modalShow: true, login: 0 });
  };

  addToBag = params => {
    if (
      Auth.getUserDetails() !== undefined &&
      Auth.getUserDetails() !== null &&
      Auth.getToken() !== undefined
    ) {
      let cart = this.props.postCart(params);
      cart.then(res => {
        console.log(res);
      });
    } else {
      this.setState({ modalShow: true });
    }
  };

  render() {
    const { products, departments } = this.props;
    return (
      <div>
        <HomeBanner />
        <CategoryBanner />
        {products ? (
          <NewArrivals
            products={products}
            departments={departments}
            addToBag={this.addToBag}
          />
        ) : null}
        <Benefit />
        <Advertisement />
        {products ? (
          <BestSeller
            products={products}
            departments={departments}
            addToBag={this.addToBag}
          />
        ) : null}
        <LoginRegister
          show={this.state.modalShow}
          login={this.state.login}
          registerclicked={()=>this.registerclicked()}
          loginclicked={()=>this.loginclicked()}
          onHide={() => this.showHideModal()}
        />
      </div>
    );
  }
}

export default Home;

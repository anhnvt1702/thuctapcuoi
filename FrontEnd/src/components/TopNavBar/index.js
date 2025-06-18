import { withRouter } from 'react-router-dom';
import React, { Component } from "react";
import LoginRegister from "../LoginRegisterModal";

import Auth from "../../modules/Auth";

class TopNavBar extends Component {
  constructor(props) {
    super(props);
    this.registerclicked = this.registerclicked.bind(this);
    this.state = {
      modalShow: false,
      login: 1
    };
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

  logout = (e) => {
    e.preventDefault();
    Auth.logout();
    // window.location.reload();
    this.props.history.push('/');
  };

  render() {
    return (
      <div className={`top_nav ${this.props.className}`}>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="top_nav_left">
                Miễn phí ship
              </div>
            </div>
            <div className="col-md-6 text-right">
              <div className="top_nav_right">
                <ul className="top_nav_menu">
                  {/* {console.log(Auth.getUserDetails()) }
                  {console.log(Object.keys(Auth.getUserDetails()).length !== 0)} */}
                  {Auth.getUserDetails() !== undefined &&
                    Auth.getUserDetails() !== null &&
                    Object.keys(Auth.getUserDetails()).length !== 0 ? (
                    <li className="account">
                      <a href="#">
                        {`${Auth.getUserDetails().user_Name}`}
                        <i className="fa fa-angle-down"></i>
                      </a>
                      <ul className="account_selection">
                        <li>
                          <a href="#" onClick={(e) => this.logout(e)}>
                            <i
                              className="fas fa-sign-in-alt"
                              aria-hidden="true"
                            ></i>
                            Thoát
                          </a>
                        </li>
                      </ul>
                    </li>
                  ) : (
                    <li className="account">
                      <a href="#">
                        Tài khoản
                        <i className="fa fa-angle-down"></i>
                      </a>
                      <ul className="account_selection">
                        <li>
                          <a href="#" onClick={() => this.loginclicked()}>
                            <i
                              className="fas fa-sign-in-alt"
                              aria-hidden="true"
                            ></i>
                            Đăng nhập
                          </a>
                        </li>
                        <li>
                          <a href="#" onClick={() => this.registerclicked()}>
                            <i
                              className="fa fa-user-plus"
                              aria-hidden="true"
                            ></i>
                            Đăng ký
                          </a>
                        </li>
                      </ul>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
        {this.state.modalShow ? (
          <LoginRegister
            show={this.state.modalShow}
            login={this.state.login}
            registerclicked={this.registerclicked}
            loginclicked={this.loginclicked}

            onHide={() => this.showHideModal()}
          />
        ) : null}
      </div>
    );
  }
}

export default withRouter(TopNavBar);

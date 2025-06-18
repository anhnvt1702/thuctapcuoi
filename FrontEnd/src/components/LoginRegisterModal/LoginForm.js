import React, { Component } from "react";
import { connect } from "react-redux";
import { userLogin } from "../../redux/actions/LoginAction";
import Validator from "../../utils/Validator";
import { DEFAULT_RULE, NAME_RULE } from "../../utils/Validator/rule";
import PropTypes from "prop-types";
import LoadingButton from "../LoadingButton";
import { showToast } from "../Common/CustomToast";
import { withRouter } from 'react-router-dom';
import { commonData } from "utils/commonData";


class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "", 
      loading: false
    };
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.handleSubmit();
    }
  };


  handleSubmit = () => {
    const { username, password } = this.state;
    if (!Validator(username, NAME_RULE)) {
      showToast('Tên đăng nhập không hợp lệ', 'error');
      return;
    }
    if (!Validator(password, DEFAULT_RULE)) {
      showToast('Mật khẩu không hợp lệ', 'error');
      return;
    }
    this.setState({ loading: true });
    this.props
      .userLogin(username, password)
      .then(res => {
        if (res && res.data) {
          localStorage.setItem("current_user", JSON.stringify(res.data?? ""))
          this.setState({ loading: false });

          showToast('Đăng nhập thành công', commonData.success_type);

          this.props.onhide();
          this.props.history.push('/');
        }
        else {
          this.setState({ loading: false });
          showToast('Tài khoản hoặc mật khẩu không chính xác', 'error');
        }
      })
      .catch(error => {
        console.log(error.response);
        this.setState({ loading: false });
      });
  };

  render() {
    return (
      <div>
        <div className="login-form" >
          <h2>Đăng nhập</h2>
          <div className="form-group ">
            <input
              type="text"
              className="form-control"
              placeholder="Tên đăng nhập "
              id="username"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
              autoComplete="false"
            />
            <i className="fa fa-user"></i>
          </div>
          <div className="form-group log-status">
            <input
              type="password"
              className="form-control"
              placeholder="Mật khẩu"
              id="Passwod"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              autoComplete="false"
            />
            <i className="fa fa-lock"></i>
          </div>
          <span className="alert">Invalid Credentials</span>
          <a
            className="link"
            href="#"
            onClick={this.props.forgotPasswordClicked}
          >
            Quên mật khẩu ?
          </a>
          <LoadingButton
            type="button"
            className="log-btn"
            loading={this.state.loading}
            onClick={() => this.handleSubmit()}
          >
            Đăng nhập
          </LoadingButton>
          <div
            onClick={this.props.registerclicked}
            style={{
              textAlign: "center",
              fontSize: 12,
              color: "#c4c4c4",
              cursor: "pointer"
            }}
          >
            Đăng ký thành viên mới
          </div>
        </div>
      </div>
    );
  }
}

LoginForm.propTypes = {
  forgotPasswordClicked: PropTypes.func,
  registerclicked: PropTypes.func
};

const mapDispatchToProps = {
  userLogin
};
const mapStoreToProps = state => ({
  login_loading: state.login.login_loading,
  login_error: state.login.error
});

export default connect(mapStoreToProps, mapDispatchToProps)(withRouter(LoginForm));

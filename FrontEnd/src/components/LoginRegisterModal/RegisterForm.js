import React, { useState } from "react";
import Validator from "../../utils/Validator";
import { DEFAULT_RULE, EMAIL_RULE, PHONE_RULE } from "../../utils/Validator/rule";
import LoadingButton from "../LoadingButton";
import { userInfo } from "objectInfo/userInfo";
import { showToast } from "components/Common/CustomToast";
import { AddUserCustomer } from "api/accountApi";
import ConfirmationDialog from "utils/ConfirmDialog";
import { commonData } from "utils/commonData";
import { useSelector } from "react-redux";

const RegisterForm = ({ loginclicked }) => {
  const [regData, setRegData] = useState(userInfo);
  const [loading, setLoading] = useState(false);

  const [openConfirm, setopenConfirm] = useState(false);
  const [msgConfirm, setMsgConfirm] = useState("");
  const [typeConfirm, setTypeConfirm] = useState("");
  const error_defs = useSelector(state => state.errorMessageReducer.data)

  const openConfirmDialog = (msg, type) => {
    setopenConfirm(true)
    setMsgConfirm(msg)
    setTypeConfirm(type)
  }

  const handleAcceptConfirm = () => {
    setopenConfirm(false);
    if (typeConfirm === "ADD_USER") {
      console.log(`regData=${JSON.stringify(regData)}`);
      AddUserCustomer(regData)
        .then((res) => {

          setLoading(false);
          if (res.success > 0) {
            showToast('Tạo tài khoản thành công', commonData.success_type);
            loginclicked();
          }
          else {
            console.log(`error_defs=${JSON.stringify(error_defs)}`);
            
            var _err = error_defs ? error_defs.find(msg => msg.error_Code === res.success) : null;
            var _err_msg = _err ? _err.error_Des : "Tạo tài khoản thất bại";
            showToast(_err_msg, commonData.error_type);
            return false;
          }

        })
        .catch((error) => {
          console.log(error.response);
          setLoading(false);
        });
    } else if (typeConfirm === "EXIT_FORM") {

    }

    setTypeConfirm("");
  }


  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegData({ ...regData, [name]: value });
  };

  const handleSubmit = () => {
    const { full_Name, email, password, phone } = regData;
    console.log(`regData=${JSON.stringify(regData)}`);

    if (!Validator(full_Name, DEFAULT_RULE)) {
      showToast('Tên tài khoản không hợp lệ', commonData.error_type);
      return;
    }
    if (!Validator(email, EMAIL_RULE)) {
      showToast('Email không hợp lệ', 'error');
      return;
    }

    if (!Validator(phone, PHONE_RULE)) {
      showToast('Số điện thoại không hợp lệ', 'error');
      return;
    }

    if (!Validator(password, DEFAULT_RULE)) {
      showToast('Password không hợp lệ', 'error');
      return;
    }

    if (regData.password !== regData.repassword) {
      showToast('Nhập lại mật khẩu không hợp lệ', 'error');
      return;
    }

    setLoading(true);
    openConfirmDialog("Bạn có đồng ý đăng ký tài khoản", "ADD_USER");

  };

  return (
    <>
      <div>
        <div className="login-form">
          <h2>Đăng ký</h2>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Tài khoản"
              id="user_Name"
              name="user_Name"
              value={regData.user_Name}
              onChange={handleChange}
              autoComplete="false"
            />
            <i className="fa fa-user"></i>
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Họ tên"
              id="full_Name"
              name="full_Name"
              value={regData.full_Name}
              onChange={handleChange}
              autoComplete="false"
            />
            <i className="fa fa-user"></i>
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Email"
              id="email"
              name="email"
              value={regData.email}
              onChange={handleChange}
              autoComplete="false"
            />
            <i className="fa fa-envelope"></i>
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Số điện thoại"
              id="phone"
              name="phone"
              value={regData.phone}
              onChange={handleChange}
              autoComplete="false"
            />
            <i className="fa fa-envelope"></i>
          </div>
          <div className="form-group log-status">
            <input
              type="password"
              className="form-control"
              placeholder="Mật khẩu"
              id="Passwod"
              name="password"
              value={regData.password}
              onChange={handleChange}
              autoComplete="false"
            />
            <i className="fa fa-lock"></i>
          </div>
          <div className="form-group log-status">
            <input
              type="password"
              className="form-control"
              placeholder="Nhập lại mật khẩu"
              id="RePasswod"
              name="repassword"
              value={regData.repassword}
              onChange={handleChange}
              autoComplete="false"
            />
            <i className="fa fa-lock"></i>
          </div>
          <LoadingButton
            type="button"
            className="log-btn"
            loading={loading}
            onClick={handleSubmit}
          >
            Đăng ký
          </LoadingButton>
          <div
            onClick={loginclicked}
            style={{
              textAlign: "center",
              fontSize: 12,
              color: "#c4c4c4",
              cursor: "pointer",
            }}
          >
            Bạn đã có tài khoản? Hãy đăng nhập ngay
          </div>
        </div>
      </div>

      <ConfirmationDialog
        messageConfirm={msgConfirm}
        openConfirm={openConfirm}
        onConfirm={handleAcceptConfirm}
        onCancelConfirm={() => {
          setopenConfirm(false);
          setTypeConfirm("")
        }}
      />

    </>
  );
};


export default RegisterForm;

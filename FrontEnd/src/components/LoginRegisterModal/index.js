import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import "./style.css";

function LoginRegister(props) {
  const [showlogin] = useState(props.showlogin);

  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      id="loginModal"
      className="modal fade login"
    >
      <Modal.Body>
        <div className="modal--close--button" onClick={props.onHide}>
          <span aria-hidden="true">&times;</span>
        </div>
        {props.login === 1 ? (
          <LoginForm registerclicked={props.registerclicked} onhide={props.onHide} />
        ) : (
          <RegisterForm loginclicked={props.loginclicked} onhide={props.onHide} />
        )}
      </Modal.Body>
    </Modal>
  );
}

export default LoginRegister;

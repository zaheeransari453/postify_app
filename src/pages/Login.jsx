import { useEffect, useRef, useState } from "react";
import CryptoJS from "crypto-js";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { IoMdLogIn } from "react-icons/io";

import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "../features/Auth/LoginForm";

// import NewPasswordDialog from "../components/NewPasswordDialog";

const Login = () => {
  return (
    <div className={`vh-100 ${styles.loginBackground} mt-4 mt-md-0`}>
      <div className="row h-100 ">
        <div
          className={`col-md-6  order-md-1 order-2 d-flex justify-content-center align-items-center px-5 ${styles.leftLogin}`}
        >
          <LoginForm />
        </div>
        <div
          className={`col-md-6  order-md-2 order-1 d-flex flex-column justify-content-center align-items-center gap-3 my-md-0 ${styles.rightLogin}`}
        >
          <IoMdLogIn className="display-1 " />
          <h1 className="text-center fs-1">Login Form</h1>
        </div>
      </div>
    </div>
  );
};

export default Login;

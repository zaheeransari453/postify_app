import { useEffect, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";
import styles from "./ForgetPasswordPopup.module.css";
import { useDispatch, useSelector } from "react-redux";

import { notificationSliceAction } from "../../store/reducers/notificationSlice";
import { sendOtpThunk, verifyOtpThunk } from "../../store/thunks/usersThunks";
import { usersSliceActions } from "../../store/reducers/userSlice";

// import { sendOTPEmail } from "../store/Utilites";

const ForgetPasswordPopup = ({ setShowForgetPasswordDialog }) => {
  const { otpVerified, otpSent, generatedOtp } = useSelector(
    (store) => store.users
  );
  const dispatch = useDispatch();

  const email = useRef();
  const otp = useRef();

  const navigate = useNavigate();
  // const [forgetPasswordNotification, setforgetPasswordNotification] =
  //   useState(""); // State for notification message

  const handleCancelButton = () => {
    setShowForgetPasswordDialog(false);
    dispatch(usersSliceActions.cancelResetPassword());
  };

  const handleSendOtp = async () => {
    dispatch(sendOtpThunk(email.current.value));
  };

  const handleVerifyOtp = async () => {
    dispatch(
      verifyOtpThunk({
        email: email.current.value,
        otp: otp.current.value,
      })
    );
  };

  return (
    <>
      <div className="overlay">
        <div className="dialog">
          <div className="App container text-center mt-5">
            <div className="modal show d-block" tabIndex="-1" role="dialog">
              <div
                className="modal-dialog modal-dialog-centered"
                role="document"
              >
                <div className="modal-content">
                  <div
                    className={`modal-header border-0 text-white ${styles.forgetDialagBackground}`}
                  >
                    <h5 className="modal-title">Forget Password</h5>
                  </div>
                  <div className={`modal-body  text-white ${styles.dialogBox}`}>
                    <div className=" w-100 mt-2">
                      <input
                        type="email"
                        className=" w-100"
                        placeholder="Email"
                        ref={email}
                      />
                    </div>
                  </div>
                  {!otpSent ? (
                    <>
                      <div
                        className={`modal-footer border-0 ${styles.dialogBox}`}
                        style={{ background: "#030406" }}
                      >
                        <button
                          className="btn btn-secondary"
                          onClick={handleCancelButton}
                        >
                          Cancel
                        </button>
                        <button
                          type="sumbit"
                          className={`Btn ${styles.forgetPasswordBtn}`}
                          onClick={() => handleSendOtp()}
                        >
                          Sent OTP
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        className={`modal-body  text-white ${styles.dialogBox}`}
                      >
                        <div className=" w-100 mb-2">
                          <input
                            type="text"
                            className=" w-100"
                            placeholder="Enter OTP"
                            ref={otp}
                          />
                        </div>
                        <div
                          className={`modal-footer border-0 ${styles.dialogBox}`}
                        >
                          <button
                            className=" btn btn-secondary "
                            onClick={handleCancelButton}
                          >
                            Cancel
                          </button>
                          <button
                            type="sumbit"
                            className={` ${styles.forgetPasswordBtn} Btn`}
                            onClick={() => handleVerifyOtp()}
                          >
                            Verify Otp
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ForgetPasswordPopup;

import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

import styles from "./NewPasswordDialog.module.css";
import { passwordRules, validatePassword } from "../../utils/validation";
import { resetPasswordThunk } from "../../store/thunks/usersThunks";

const NewPasswordDialog = () => {
  const { users, resetPasswordEmail } = useSelector((store) => store.users);
  const dispatch = useDispatch();
  const newPassword = useRef();
  const confirmPassword = useRef();

  const [error, setError] = useState({
    newPasswordError: "",
    confirmPasswordError: "",
  });

  // Handle input change
  const handleOnNewPasswordChange = (event) => {
    setError({ ...error, newPasswordError: "" });
  };
  const handleOnConfirmPasswordChange = (event) => {
    setError({ ...error, confirmPasswordError: "" });
  };

  const validateConfrimPassword = () => {
    if (newPassword.current.value !== confirmPassword.current.value) {
      return false;
    }
    return true;
  };

  const handleOnSetPasswordButton = (event) => {
    event.preventDefault();

    let isValid = true;
    const newError = { newPasswordError: "", confirmPasswordError: "" };

    if (!validatePassword(newPassword.current.value)) {
      newError.newPasswordError = `Password Must be ${passwordRules.minLength} to ${passwordRules.maxLength} characters. Must contain at least one uppercase letter, one lowercase letter, one number, one special character.`;
      isValid = false;
    }

    if (!newPassword.current.value) {
      newError.newPasswordError = "Enter New Password.";
      isValid = false;
    }
    if (validatePassword(newPassword.current.value)) {
      if (!validateConfrimPassword(confirmPassword.current.value)) {
        newError.confirmPasswordError =
          "Confirm Password and New Password Should be Same";
        isValid = false;
      }
    }
    if (!confirmPassword.current.value) {
      newError.confirmPasswordError = "Confirm Your Password";
      isValid = false;
    }

    setError(newError);

    if (isValid) {
      setError({ newPasswordError: "", confirmPasswordError: "" });
      // const currentPassword = newPassword.current.value;

      dispatch(
        resetPasswordThunk({
          password: newPassword.current.value,
          email: resetPasswordEmail,
        })
      );
      newPassword.current.value = "";
      confirmPassword.current.value = "";
    }
  };

  // const handleOnCancelButton = () => {
  //   dispatch(usersSliceActions.cancelResetPassword());
  // };
  // Show Password Icon Handling
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="overlay">
      <div className="dialog">
        <div className="App container text-center mt-5">
          <div className="modal show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div
                  className={`modal-header border-0 text-white ${styles.newPasswordDialogBackground}`}
                >
                  <h5 className="modal-title">Set Your Password</h5>
                </div>
                <div className={`modal-body  text-white ${styles.dialogBox}`}>
                  <form>
                    <div className=" d-flex flex-column align-items-start">
                      <div
                        className="w-100  mt-2"
                        style={{
                          position: "relative",
                          display: "inline-block",
                        }}
                      >
                        <input
                          id="setPassword"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter New Password"
                          className=" w-100"
                          ref={newPassword}
                          onChange={handleOnNewPasswordChange}
                          style={{
                            paddingRight: "2rem",
                            width: "100%",
                            boxSizing: "border-box",
                          }}
                        />
                        <span
                          onClick={togglePasswordVisibility}
                          className="fs-5"
                          style={{
                            position: "absolute",
                            right: "10px",
                            top: "50%",
                            transform: "translateY(-60%)",
                            cursor: "pointer",
                          }}
                        >
                          {showPassword ? (
                            <IoEyeOutline />
                          ) : (
                            <IoEyeOffOutline />
                          )}
                        </span>
                      </div>

                      {error.newPasswordError && (
                        <small className="text-white">
                          {error.newPasswordError}
                        </small>
                      )}
                    </div>
                    <div className=" d-flex flex-column align-items-start mt-4">
                      <input
                        type="password"
                        id="confirmPassword"
                        className="w-100 "
                        placeholder="Confirm new password"
                        ref={confirmPassword}
                        onChange={(e) => {
                          handleOnConfirmPasswordChange(e);
                        }}
                      />
                      {error.confirmPasswordError && (
                        <small className="text-white">
                          {error.confirmPasswordError}
                        </small>
                      )}
                    </div>
                  </form>
                </div>
                <div
                  className={`modal-footer border-0 ${styles.dialogBox}`}
                  style={{ background: " #030406" }}
                >
                  <button
                    className="dialogButton btn btn-secondary"
                    onClick={() =>
                      dispatch(usersSliceActions.cancelResetPassword())
                    }
                  >
                    Cancel
                  </button>
                  <button
                    className={`Btn ${styles.setPassword}`}
                    onClick={handleOnSetPasswordButton}
                  >
                    Set Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPasswordDialog;

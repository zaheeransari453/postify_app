import { usersSliceActions } from "../reducers/userSlice";
import { notificationSliceAction } from "../reducers/notificationSlice";
import { handleDecrypt, handleEncrypt } from "../../services/Encryption";
// import { handleDecrypt, handleEncrypt } from "../../Utils/Encryption";

export const addUserThunk =
  ({ newEmail, newName, newUserName, newPassword }) =>
  (dispatch, getState) => {
    // const newEmail = action.payload.newEmail;
    // const newName = action.payload.newName;
    // const newPassword = action.payload.newPassword;
    const { users } = getState();

    const ids = users.users.map((user) => user.id);
    if (ids.length === 0) {
      ids.push(10);
    }
    const newId = Math.max(...ids) + 1;

    // Encrypt the password
    const encrypt = handleEncrypt(newPassword);

    // Add the new user
    const newUser = {
      id: newId,
      email: newEmail,
      name: newName,
      username: newUserName,
      password: encrypt,
      maskedPassword: "*".repeat(newPassword.length),
      phone: "0300-0000000",
    };

    dispatch(usersSliceActions.addUser({ newUser: newUser }));
    dispatch(
      notificationSliceAction.showNotification({
        message: "Registered successfully!",
      })
    );
    // state.users = [...state.users, newUser]; // Update the state
    // saveUsersToLocalStorage(state.users);
  };
export const loginUserThunk =
  ({ email, password }) =>
  (dispatch, getState) => {
    const { users } = getState();

    const adminEmail = "admin@gmail.com";
    const adminPassword = "Admin@123";

    if (email === adminEmail && password === adminPassword) {
      dispatch(
        notificationSliceAction.showNotification({ message: "Admin Loged in!" })
      );
      dispatch(usersSliceActions.loginUser({ email, password }));
      return;
    }

    const user = users.users.find(
      (user) =>
        user.email === email && handleDecrypt(user.password) === password
    );

    if (user) {
      dispatch(
        notificationSliceAction.showNotification({ message: "User Loged in!" })
      );
      dispatch(usersSliceActions.loginUser({ email, password }));
    } else {
      dispatch(
        notificationSliceAction.showNotification({
          message: "User not Registered!",
        })
      );
    }
    return;
  };

export const logoutUserThunk = () => (dispatch, getState) => {
  dispatch(usersSliceActions.logoutUser());
  dispatch(notificationSliceAction.showNotification({ message: "Loged out!" }));
};
export const sendOtpThunk = (email) => (dispatch, getState) => {
  const { users } = getState(); // Access the current state

  // Check if email is valid
  if (!email) {
    dispatch(
      notificationSliceAction.showNotification({
        message: "Email is Required.",
      })
    );
    return;
  }

  const userExists = users.users.find((user) => user.email === email);
  if (userExists) {
    dispatch(usersSliceActions.sendOtp(email));
    dispatch(
      notificationSliceAction.showNotification({
        message: `OTP sent to Email!`,
      })
    );
  } else {
    dispatch(
      notificationSliceAction.showNotification({
        message: "Email not Found.",
      })
    );
  }
};

export const verifyOtpThunk =
  ({ email, otp }) =>
  (dispatch, getState) => {
    console.log(email, otp);
    const { users } = getState();
    const recordExists = users.users.some((user) => user.email === email);

    if (recordExists) {
      console.log(otp);

      if (otp === users.generatedOtp) {
        dispatch(usersSliceActions.verifyOtp({ email: email, otp: otp }));
        dispatch(
          notificationSliceAction.showNotification({ message: "OTP Verified!" })
        );
      } else {
        dispatch(
          notificationSliceAction.showNotification({
            message: "Invalid OTP. Please try again!",
          })
        );
      }
    } else {
      dispatch(
        notificationSliceAction.showNotification({ message: "Wrong Email!" })
      );
    }
  };

export const resetPasswordThunk =
  ({ password, email }) =>
  (dispatch, getState) => {
    dispatch(usersSliceActions.resetPassword({ password, email }));
    dispatch(
      notificationSliceAction.showNotification({ message: "Password Updated!" })
    );
  };

import { createSlice } from "@reduxjs/toolkit";
import { handleDecrypt, handleEncrypt } from "../../services/Encryption";
// import { handleDecrypt, handleEncrypt } from "../../Utils/Encryption";

const DEFAULT_PROFILE_AVATAR =
  "https://365webresources.com/wp-content/uploads/2016/09/FREE-PROFILE-AVATARS.png";

const initialState = {
  users: [],
  loading: null,
  error: null,
  role: null,
  currentUser: null,
  otpSent: false,
  generatedOtp: null,
  otpVerified: false,
  resetPasswordEmail: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    fetchUsersStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchUsersSuccess(state, action) {
      state.loading = false;
      state.users = action.payload;
    },
    fetchUsersFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    addUser(state, action) {
      const { newUser } = action.payload;

      const userWithDefaultAvatar = {
        ...newUser,
        profilePhoto: DEFAULT_PROFILE_AVATAR,
      };

      state.users = [userWithDefaultAvatar, ...state.users];
      // saveUsersToLocalStorage(state.users); // Persist to localStorage
    },

    loginUser(state, action) {
      const { email, password } = action.payload;

      const adminEmail = "admin@gmail.com";
      const adminPassword = "Admin@123";

      // Check for admin login
      if (email === adminEmail && password === adminPassword) {
        state.role = "admin";
        state.currentUser = { email, role: "admin" };
        return;
      }

      const user = state.users.find(
        (user) =>
          user.email === email && handleDecrypt(user.password) === password
      );

      if (user) {
        state.role = "user";
        state.currentUser = {
          id: user.id,
          email: user.email,
          name: user.name,
          username: user.username,
          password: user.password,
          role: "user",
          profilePhoto: user.profilePhoto || DEFAULT_PROFILE_AVATAR,
        };

        // Save `userInfo` in localStorage
        // localStorage.setItem("userInfo", JSON.stringify(state.currentUser));
      }
    },

    logoutUser(state) {
      state.role = null;
      state.currentUser = null;
    },

    deleteUser(state, action) {
      if (
        state.currentUser.id === action.payload &&
        state.currentUser.role === "user"
      ) {
        state.currentUser = null;
      }
      state.users = state.users.filter((user) => user.id !== action.payload);

      // saveUsersToLocalStorage(state.users);
    },

    updateUser(state, action) {
      state.users = state.users.map((user) =>
        user.id === action.payload.id
          ? {
              ...user,
              email: action.payload.email,
              password: action.payload.password,
            }
          : user
      );
      // saveUsersToLocalStorage(state.users);
    },

    updateProfilePhoto(state, action) {
      const { userId, newPhoto } = action.payload;

      state.users = state.users.map((user) =>
        user.id === userId ? { ...user, profilePhoto: newPhoto } : user
      );
      state.currentUser = { ...state.currentUser, profilePhoto: newPhoto };

      // saveUsersToLocalStorage(state.users);
    },

    markUser(state, action) {
      state.users = state.users.map((user) =>
        user.id === action.payload
          ? user.status === "marked"
            ? { ...user, status: "default" }
            : { ...user, status: "marked" }
          : user
      );
      // saveUsersToLocalStorage(state.users);
    },

    unMarkUser(state, action) {
      state.users = state.users.map((user) =>
        user.id === action.payload
          ? user.status === "unmarked"
            ? { ...user, status: "default" }
            : user.status === "marked"
            ? { ...user, status: "unmarked" }
            : { ...user, status: "unmarked" }
          : user
      );
      // saveUsersToLocalStorage(state.users);
    },

    sendOtp(state, action) {
      const randomOtp = Math.floor(100000 + Math.random() * 900000).toString();
      state.generatedOtp = randomOtp;
      state.otpSent = true;
      alert(randomOtp);
    },

    verifyOtp(state, action) {
      state.resetPasswordEmail = action.payload.email;
      state.otpVerified = true;
    },

    cancelResetPassword(state) {
      state.otpSent = false;
      state.generatedOtp = null;
      state.otpVerified = false;
      state.resetPasswordEmail = null;
    },

    resetPassword(state, action) {
      state.users = state.users.map((user) =>
        user.email === action.payload.email
          ? {
              ...user,
              password: handleEncrypt(action.payload.password),
              maskedPassword: "*".repeat(action.payload.password.length),
            }
          : user
      );
      state.otpSent = false;
      state.otpVerified = false;
      state.generatedOtp = null;
      state.resetPasswordEmail = null;
      // saveUsersToLocalStorage(state.users);
    },
  },
});

export const usersSliceActions = usersSlice.actions;
export default usersSlice;

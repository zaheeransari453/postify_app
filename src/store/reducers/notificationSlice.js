import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: { message: null },
  reducers: {
    showNotification(state, action) {
      console.log(action.payload.message);
      state.message = action.payload.message;
    },

    clearNotification(state) {
      state.message = null;
    },
  },
});

export const notificationSliceAction = notificationSlice.actions;
export default notificationSlice;

import { createSlice } from "@reduxjs/toolkit";

export const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    hasNewNotification: false,
    colors: {}, // Initialize as an empty object to store colors by ID
  },
  reducers: {
    setNotificationFlag: (state) => {
      state.hasNewNotification = true;
    },
    clearNotificationFlag: (state) => {
      state.hasNewNotification = false;
    },
    setNotificationColor: (state, action) => {
      const { id, color } = action.payload;
      state.colors[id] = color; // Store color based on notification ID
    },
  },
});

export const { setNotificationFlag, clearNotificationFlag, setNotificationColor } = notificationSlice.actions;

export const selectNotificationFlag = (state) => state.notification.hasNewNotification;
export const selectNotificationColor = (id) => (state) => state.notification.colors[id] ; // Default color

export default notificationSlice.reducer;

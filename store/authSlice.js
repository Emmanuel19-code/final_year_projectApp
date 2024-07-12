import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "user",
  initialState: {
    loggedIn: true,
    info: null,
    role:"Admin"
  },
  reducers: {
    Logged: (state, action) => {
      state.loggedIn = true;
      state.info = action.payload;
    },
    LoggedOut: (state) => {
      state.loggedIn = false;
    },
    SetUser: (state, action) => {
      state.info = action.payload;
    },
  },
});

export const { Logged, LoggedOut, SetUser } = authSlice.actions;
export const selectloggedIn = (state) => state.user.loggedIn;
export const selectInfo = (state) => state.user.info;
export const selectRole = (state) => state.user.role
export default authSlice.reducer;
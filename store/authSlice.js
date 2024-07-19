import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "user",
  initialState: {
    loggedIn: true,
    info: null,
    role:"user",
    auth_token:null,
  },
  reducers: {
    Logged: (state, action) => {
      console.log(action);
      state.loggedIn = true;
      state.role = action.payload&&action.payload
    },
    LoggedOut: (state) => {
      state.loggedIn = false;
      state.info = null
    },
    SetUser: (state, action) => {
      console.log(action);
      state.info = action.payload;
    },
    Verification:(state,action)=>{    
        state.auth_token = action.payload
    }
  },
});

export const { Logged, LoggedOut, SetUser,Verification } = authSlice.actions;
export const selectloggedIn = (state) => state.user.loggedIn;
export const selectInfo = (state) => state.user.info;
export const selectRole = (state) => state.user.role
export const selectAuthToken = (state) => state.user.auth_token
export default authSlice.reducer;
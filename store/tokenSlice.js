import { createSlice } from "@reduxjs/toolkit";


export const tokenSlice = createSlice({
    name:"token",
    initialState:{
        refreshToken:null,
        accessToken:null
    },
    reducers:{
        saveToken : (state,action)=>{
            state.refreshToken = action.payload.refreshToken;
            state.accessToken = action.payload.accessToken;
        },
        deleteToken : (state) =>{
            state.refreshToken = null
            state.accessToken = null
        }
    }
})


export const {saveToken,deleteToken} = tokenSlice.actions
export const selectAccesstoken = (state) => state.token.accessToken;
export const SelectRefreshToken = (state) => state.token.refreshToken
export default tokenSlice.reducer
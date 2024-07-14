import React, { createContext, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectAccesstoken, SelectRefreshToken } from "../store/tokenSlice";

export const AllPostRequest = createContext();

const USER_BASE_URL ="https://final-year-backend-35ph.onrender.com/api/v1/user";
const CONSULTANT_BASE_URL = "https://final-year-backend-35ph.onrender.com/api/v1/consultant";
const consultant_token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJoZWFsdGh3b3JrZXJJZCI6IkhXMTIzNDU4Iiwicm9sZSI6ImhlYWx0aHdvcmtlciIsImlhdCI6MTcyMDg2NTMxMiwiZXhwIjoxNzIwOTUxNzEyfQ.NZF8URD9R4qbaSPgw1PQhdsU-6PSR0Fbx5tkw5WX0EI";
  const AllPostProvider = ({ children }) => {
  const [error_message, setError_message] = useState("");
  const [successMessage,setSucessMessage] = useState("")
  const accessToken = useSelector(selectAccesstoken);
  const refreshToken = useSelector(SelectRefreshToken)

  //registering users
  const UserSignUp = async (name, email, password, phone) => {
    let data = {
      name: name,
      email: email,
      password: password,
      phone: phone,
    };
    try {
      const response = await axios.post(`${USER_BASE_URL}/register`, data);
      console.log(response);
      if (response) {
        return response;
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        setError_message(error.response.data.msg);
      }
    }
  };

  //users sign In into their account
  const UserSignIn = async (email, password) => {
    let data = {
      email: email,
      password: password,
    };
    try {
      const response = await axios.post(`${USER_BASE_URL}/login`, data,  
      );
      return response
    } catch (error) {
      console.log(error);
      if (error.code === "ECONNABORTED") {
        setError_message("The request took too long. Please try again.");
      } else if (!error.response) {
        setError_message("A network error occurred");
      } else {
        setError_message(error.response.data.msg);
      }
    }
  };

  //user's verify their account
  const VerifyUser = async (data) => {
    try {
      const response = await axios.post(`${USER_BASE_URL}`, data, {
        timeout: 10000, // Set timeout to 10 seconds
        timeoutErrorMessage: "The request took too long. Please try again.",
      });
      return response;
    } catch (error) {
      if (error.code === "ECONNABORTED") {
        // Handle timeout error
        setError_message(
          error.message || "The request took too long. Please try again."
        );
      } else if (!error.response) {
        // Handle network error
        setError_message(
          "A network error occurred. Please check your internet connection and try again."
        );
      } else {
        // Handle other errors
        setError_message(
          error.response.data.msg || "An error occurred. Please try again."
        );
      }
    }
  };

  //This is for consultant creating an account 
  const ConsultantSignUp = async (name,email,password,healthWorkerId,phone,) => {
    data = {
      name:name,
      email:email,
      password:password,
      healthWorkerId:healthWorkerId,
      phone:phone,
    };
    try {
      const response = await axios.post(
        `${CONSULTANT_BASE_URL}/registerhealthworker`,data
      );
      console.log("this is ",response);
      return response;
    } catch (error) {
      if (error.response) {
        setError_message(error.response.data.msg);
      }
    }
  };

  //Doctor's Sign In into their account
  const ConsultantSignIn = async()=>{
    try {
      const response = await axios.post(`${CONSULTANT_BASE_URL}/login`)
      return response
    } catch (error) {
       if (!error.response) {
         setError_message("A Network Error Occured");
       }else{
        setError_message(error.response.data.msg);
       }
    }
  }

  //search for a doctor
  const SearchConsultant = async (search) =>{
     const data ={
       search:search
     }
    try {
      const response = await axios.post(
        `${CONSULTANT_BASE_URL}/searchworker`,data
      );
      return response.data
    } catch (error) {
       if (error.response) {
         setError_message(error.response.data.msg);
       }
    }
  }

  //user send message
  const UserSendMessage = async (data) =>{
    try {
      const response = await axios.post(`${USER_BASE_URL}/send_message`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response
    } catch (error) {
      console.log(error);
    } 
  }

  //consultant send message
  const ConsultantSendMessage = async (data) =>{
    try {
      const response = await axios.post(`${CONSULTANT_BASE_URL}/send_message`,data,{
        headers:{
          Authorization:`Bearer ${consultant_token}`
        }
      })
      return response
    } catch (error) {
      console.log(error);
    }
  }

  //User Update their profile picture
  const UserUpdateProfile = async(data)=>{
    try {
      const response = await axios.post(
        `${USER_BASE_URL}/accountdetailsupdate`,data,{
          headers:{
            Authorization:`Bearer ${accessToken}`
          }
        }
      );
      //console.log(response.data.data);
      return response
    } catch (error) {
      if(!error.response){
        setError_message("A network error occured")
      }else{
        setError_message(error.response.data.msg)
      }
    }
  }

  //consultant update their profile picture
  const ConsultantUpdateProfile = async(data)=>{
    try {
      const response = await axios.post(
        `${CONSULTANT_BASE_URL}/healthworkerupdate_details`,
        data,
        {
          headers: {
            Authorization: `Bearer ${consultant_token}`,
          },
        }
      );
      console.log(response);
      return response
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <AllPostRequest.Provider
      value={{
        UserSignUp,
        error_message,
        setError_message,
        UserSignIn,
        VerifyUser,
        ConsultantSignUp,
        ConsultantSignIn,
        setSucessMessage,
        successMessage,
        SearchConsultant,
        UserSendMessage,
        ConsultantSendMessage,
        UserUpdateProfile,
        ConsultantUpdateProfile
      }}
    >
      {children}
    </AllPostRequest.Provider>
  );
};

export default AllPostProvider;

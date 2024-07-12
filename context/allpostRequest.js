import React, { createContext, useState } from "react";
import axios from "axios";

export const AllPostRequest = createContext();

const USER_BASE_URL ="https://final-year-backend-35ph.onrender.com/api/v1/user";
const CONSULTANT_BASE_URL = "https://final-year-backend-35ph.onrender.com/api/v1/consultant";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVJZCI6ImM0NjRmMWQ0IiwibmFtZSI6IkVtbWFudWVsIEFkYW5lIEJvc2VhIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MjA3MjQ4MTAsImV4cCI6MTcyMDgxMTIxMH0.fgMunsqKMYRKP2_C44pb0xBUJGpXfWPyF457Lljn57A";
const consultant_token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJoZWFsdGh3b3JrZXJJZCI6IkhXMTIzNDU4Iiwicm9sZSI6ImhlYWx0aHdvcmtlciIsImlhdCI6MTcyMDc4MTY1NiwiZXhwIjoxNzIwODY4MDU2fQ.3Ld-PNYHxEhHXB4amVbpt8tfVJwgtiGbD2Q_p0RAG9E";
  const AllPostProvider = ({ children }) => {
  const [error_message, setError_message] = useState("");
  const [sucess_message,setSucess_message] = useState("")
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
  const UserSignIn = async (email, password) => {
    let data = {
      email: email,
      password: password,
    };
    try {
      const response = await axios.post(`${USER_BASE_URL}/login`, data, {
        timeout: 10000, // Set timeout to 10 seconds
      });
      setSucess_message(response.data.message);
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
  //
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
  const ConsultantSignIn = async()=>{
    try {
      const response = await axios.post(`${CONSULTANT_BASE_URL}/login`)
      return response
    } catch (error) {
       if (error.response) {
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

  const UserSendMessage = async (data) =>{
    try {
      const response = await axios.post(`${USER_BASE_URL}/send_message`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response
    } catch (error) {
      console.log(error);
    } 
  }
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

  const UserUpdateProfile = async(data)=>{
    try {
      const response = await axios.post(
        `${USER_BASE_URL}/accountdetailsupdate`,data,{
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error)
    }
  }
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
        setSucess_message,
        sucess_message,
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

import React, { createContext, useState } from "react";
import axios from "axios";

export const AllPostRequest = createContext();

const USER_BASE_URL ="https://final-year-backend-35ph.onrender.com/api/v1/user";
const CONSULTANT_BASE_URL = "https://final-year-backend-35ph.onrender.com/api/v1/consultant";

const AllPostProvider = ({ children }) => {
  const [error_message, setError_message] = useState("");
  const UserSignUp = async (name, email, password, phone) => {
    let data = {
      name: name,
      email: email,
      password: password,
      phone: phone,
    };
    try {
      const response = await axios.post(`${USER_BASE_URL}/register`, data);
      if (response) {
        return response;
      }
    } catch (error) {
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
      const response = await axios.post(`${USER_BASE_URL}/register`, data);
      console.log(response);
    } catch (error) {
      if (error.response) {
        setError_message(error.response.data.msg);
      }
    }
  };
  //
  const VerifyUser = async () => {
    try {
      const response = await axios.post(`${USER_BASE_URL}`, data);
      return response;
    } catch (error) {
      if (error.response) {
        setError_message(error.response.data.msg);
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
  return (
    <AllPostRequest.Provider
      value={{
        UserSignUp,
        error_message,
        setError_message,
        UserSignIn,
        VerifyUser,
        ConsultantSignUp,
        ConsultantSignIn
      }}
    >
      {children}
    </AllPostRequest.Provider>
  );
};

export default AllPostProvider;

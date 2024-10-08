import React, { createContext, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectAccesstoken, SelectRefreshToken } from "../store/tokenSlice";
import { selectAuthToken } from "../store/authSlice";

export const AllPostRequest = createContext();

const USER_BASE_URL =
  "https://final-year-backend-35ph.onrender.com/api/v1/user";
const CONSULTANT_BASE_URL =
  "https://final-year-backend-35ph.onrender.com/api/v1/consultant";
const APPOINTMENT_BASE_URL ="https://final-year-backend-35ph.onrender.com/api/v1/appointment"


const AllPostProvider = ({ children }) => {
  const [error_message, setError_message] = useState("");
  const [successMessage, setSucessMessage] = useState("");
  const accessToken = useSelector(selectAccesstoken);
  const refreshToken = useSelector(SelectRefreshToken);
  const auth_Token = useSelector(selectAuthToken);
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
      return response;
    } catch (error) {
      console.log(error);
      if (!error.response) {
        setError_message("A network error occured");
      } else {
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
      const response = await axios.post(`${USER_BASE_URL}/login`, data);
      return response;
    } catch (error) {
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
      const response = await axios.post(
        `${USER_BASE_URL}/verifying_account`,
        data,
        {
          headers: {
            Authorization: `Bearer ${auth_Token}`,
          },
        }
      );
      return response;
    } catch (error) {
      if (error.code === "ECONNABORTED") {
        setError_message(
          error.message || "The request took too long. Please try again."
        );
      } else if (!error.response) {
        setError_message(
          "A network error occurred. Please check your internet connection and try again."
        );
      } else {
        setError_message(
          error.response.data.msg || "An error occurred. Please try again."
        );
      }
    }
  };

  //This is for consultant creating an account
  const ConsultantSignUp = async (
    name,
    email,
    password,
    healthWorkerId,
    phone
  ) => {
    data = {
      name: name,
      email: email,
      password: password,
      healthworkerId: healthWorkerId,
      phone: phone,
    };
    try {
      const response = await axios.post(
        `${CONSULTANT_BASE_URL}/registerhealthworker`,
        data
      );
      return response;
    } catch (error) {
      if (error.response) {
        setError_message(error.response.data.msg);
      }
    }
  };

  //Doctor's Sign In into their account
  const ConsultantSignIn = async (email, password, healthworkerId) => {
    try {
      let data = {
        email,
        password,
        healthworkerId,
      };
      const response = await axios.post(`${CONSULTANT_BASE_URL}/login`, data);
      return response;
    } catch (error) {
      console.log(error.response.data);
      if (!error.response) {
        setError_message("A Network Error Occured");
      } else {
        setError_message(error.response.data.msg);
      }
    }
  };

  //search for a doctor
  const SearchConsultant = async (search) => {
    const data = {
      search: search,
    };
    try {
      const response = await axios.post(
        `${CONSULTANT_BASE_URL}/searchworker`,
        data
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        setError_message(error.response.data.msg);
      }
    }
  };

  //user send message
  const UserSendMessage = async (data) => {
    try {
      const response = await axios.post(`${USER_BASE_URL}/send_message`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  //consultant send message
  const ConsultantSendMessage = async (data) => {
    try {
      const response = await axios.post(
        `${CONSULTANT_BASE_URL}/send_message`,
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.log(error.response.data);
    }
  };

  //User Update their profile picture
  const UserUpdateProfile = async (data) => {
    try {
      const response = await axios.post(
        `${USER_BASE_URL}/accountdetailsupdate`,
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      //console.log(response.data.data);
      return response;
    } catch (error) {
      if (!error.response) {
        setError_message("A network error occured");
      } else {
        setError_message(error.response.data.msg);
      }
    }
  };

  //consultant update their profile picture
  const ConsultantUpdateProfile = async (data) => {
    try {
      const response = await axios.put(
        `${CONSULTANT_BASE_URL}/healthworkerupdate_details`,
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.log(error.response);
    }
  };

  //consultant Starting A conversation with client
  const ConsultantStartConversation = async (data) => {
    try {
      const response = await axios.post(
        `${CONSULTANT_BASE_URL}/create_conversation`,
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response;
    } catch (error) {
     if (error.code === "ECONNABORTED") {
       setError_message("The request took too long. Please try again.");
     } else if (!error.response) {
       setError_message("A network error occurred");
     } else {
       setError_message(error.response.data.msg);
     }
    }
  };

  // MAKING PAYMENTS
  const CreatePaymentIntent = async (data) => {
    try {
      const response = await axios.post(
        `https://final-year-backend-35ph.onrender.com/api/v1/payment/make_payments`,
        data
      );
      return response.data
    } catch (error) {
       console.log(error.response)
    }
  };

  //creating an appointment
  const BookAppointment = async (data) =>{
    try {
      const response = await axios.post(
        `${APPOINTMENT_BASE_URL}/create-appointment`,
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response
    } catch (error) {
      console.log(error.response); 
    }
  }
 
  //cancel appointment
  const CancelAppointment = async (data) =>{
    try {
      const response = await axios.post(
        `${APPOINTMENT_BASE_URL}/cancel_appointment`,
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response
    } catch (error) {
      console.log(error.response);
    }
  }

  //sending meetingId
  const SendMeetingId = async (data,appointmentId) =>{
    try{
      const response = await axios.post(
        `${APPOINTMENT_BASE_URL}/start_meeting/${appointmentId}`,data,{
           headers:{
             Authorization: `Bearer ${accessToken}`
           }
        }
      );
      return response.data
    }catch(error){
        if(!error.response){
           setError_message("A network error occured")
        }else{
          setError_message(error.response.data.msg)
        }
    }
  }

  const VerifyConsultant =async(data) =>{
      try {
        const response = await axios.post(
          `${CONSULTANT_BASE_URL}/verify`,
          data,
          {
            headers: {
              Authorization: `Bearer ${auth_Token}`,
            },
          }
        );
        return response;
      } catch (error) {
        console.log(error.response);
        
        if (error.code === "ECONNABORTED") {
          setError_message(
            error.message || "The request took too long. Please try again."
          );
        } else if (!error.response) {
          setError_message(
            "A network error occurred. Please check your internet connection and try again."
          );
        } else {
          setError_message(
            error.response.data.msg || "An error occurred. Please try again."
          );
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
        ConsultantSignIn,
        setSucessMessage,
        successMessage,
        SearchConsultant,
        UserSendMessage,
        ConsultantSendMessage,
        UserUpdateProfile,
        ConsultantUpdateProfile,
        ConsultantStartConversation,
        CreatePaymentIntent,
        BookAppointment,
        CancelAppointment,
        SendMeetingId,
        VerifyConsultant
      }}
    >
      {children}
    </AllPostRequest.Provider>
  );
};

export default AllPostProvider;

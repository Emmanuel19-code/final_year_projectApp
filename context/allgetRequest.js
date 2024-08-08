import React, { createContext, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectAccesstoken, SelectRefreshToken } from "../store/tokenSlice";

export const AllGetRequest = createContext();

const MESSAGE_URL = `https://final-year-backend-35ph.onrender.com/api/v1/message/getmessages`;
const USER_BASE_URL =
  "https://final-year-backend-35ph.onrender.com/api/v1/user";
const CONSULTANT_BASE_URL =
  "https://final-year-backend-35ph.onrender.com/api/v1/consultant";
const NOTIFICATINO_URL =
  "https://final-year-backend-35ph.onrender.com/api/v1/notifcations";

const AllGetProvider = ({ children }) => {
  const [error_message, setError_message] = useState("");
  const [p_error_message, setP_error_message] = useState("");
  const accessToken = useSelector(selectAccesstoken);
  const refreshToken = useSelector(SelectRefreshToken);

  const getAllConsutlant = async (search) => {
    const data = {
      search: search,
    };
    try {
      const response = await axios.post(
        `${CONSULTANT_BASE_URL}/healthworker`,
        data
      );
      return response;
    } catch (error) {
      if (error.response) {
        setError_message(error.response.data.msg);
      }
    }
  };

  const getMyAppointments = async () => {
    try {
      const response = await axios.get(`${USER_BASE_URL}/all_appointments`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data.data;
    } catch (error) {
      if (!error.response) {
        setP_error_message("A network error occured");
      } else {
        setP_error_message(error.response.data.msg);
      }
    }
  };
  const InvolvedConversations = async()=>{
      try {
        const response = await axios.get(`${USER_BASE_URL}/get_conversation`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        return response.data.data
      } catch (error) {
         if (!error.response) {
           setP_error_message("A network error occured");
         } else {
           setP_error_message(error.response.data.msg);
         }
      }
  }

  const ConsultantConversations = async () =>{
     try {
       const response = await axios.get(
         `${CONSULTANT_BASE_URL}/get_conversation`,
         {
           headers: {
             Authorization: `Bearer ${accessToken}`,
           },
         }
       );
       return response.data.data;
     } catch (error) {
       if (!error.response) {
         setP_error_message("A network error occured");
       } else {
         setP_error_message(error.response.data.msg);
       }
     }
  }

  const GetMessagesInConversations = async(conversationId)=>{
    try {
      const response = await axios.get(`${MESSAGE_URL}/${conversationId}`)
      return response.data.messages
    } catch (error) {
      if (!error.response) {
        setP_error_message("A network error occured");
      } else {
        setP_error_message(error.response.data.msg);
      }
    }
  }

  //getting user details
  const GetUserInfo = async () =>{
     try {
      const response = await axios.get(`${USER_BASE_URL}/profile`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data.data
     } catch (error) {
       console.log(error);
     }
  }

  //getting consultant details
  const GetConsultantInfo = async () =>{
    try {
      const response = await axios.get(
        `${CONSULTANT_BASE_URL}/consultant_profile`,{
          headers:{
            Authorization:`Bearer ${accessToken}`
          }
        }
      );
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  }

  //GEtting the appointments for a doctor
  const GetMyReceivedAppointments = async () =>{
     try{
      const response = await axios.get(
        `${CONSULTANT_BASE_URL}/my_received_appointmetns`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response
     }
     catch(error){
         console.log(error.response.data);
     }
  }

  const GetAllAppointment = async () =>{
     try{
        const response = await axios.get(`${CONSULTANT_BASE_URL}/all_appointments`,{
          headers:{
            Authorization:`Bearer ${accessToken}`
          }
        })
        return response
     }catch(error){
        console.log(error);
     }
  }

  const GetNotification = async()=>{
    try {
      const response = await axios.get(
        `${NOTIFICATINO_URL}/all_notifications`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response
    } catch (error) {
      console.log("error",error.response)
    }
  }
  return (
    <AllGetRequest.Provider
      value={{
        getMyAppointments,
        getAllConsutlant,
        error_message,
        setError_message,
        p_error_message,
        setP_error_message,
        InvolvedConversations,
        ConsultantConversations,
        GetMessagesInConversations,
        GetUserInfo,
        GetConsultantInfo,
        GetAllAppointment,
        GetMyReceivedAppointments,
        GetNotification
      }}
    >
      {children}
    </AllGetRequest.Provider>
  );
};

export default AllGetProvider;

import React, { createContext, useState } from "react";
import axios from "axios";

export const AllGetRequest = createContext();

const MESSAGE_URL = `https://final-year-backend-35ph.onrender.com/api/v1/message/getmessages`;
const USER_BASE_URL =
  "https://final-year-backend-35ph.onrender.com/api/v1/user";
const CONSULTANT_BASE_URL =
  "https://final-year-backend-35ph.onrender.com/api/v1/consultant";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVJZCI6ImM0NjRmMWQ0IiwibmFtZSI6IkVtbWFudWVsIEFkYW5lIEJvc2VhIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MjA3MjU1MjUsImV4cCI6MTcyMDgxMTkyNX0.1oYq_5Us_PypsDBqCcddZSakGidTiziZUYqXzwyHbow";
const consultant_token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJoZWFsdGh3b3JrZXJJZCI6IkhXMTIzNDU2Iiwicm9sZSI6ImhlYWx0aHdvcmtlciIsImlhdCI6MTcyMDczNzM3MCwiZXhwIjoxNzIwODIzNzcwfQ.RFiI5WK9Y7DEi1KM0GpK1cniFyjF0-W68dz6MD_gND0";
const AllGetProvider = ({ children }) => {
  const [error_message, setError_message] = useState("");
  const [p_error_message, setP_error_message] = useState("");
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
          Authorization: `Bearer ${token}`,
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
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data.data
      } catch (error) {
         console.log(error);
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
             Authorization: `Bearer ${consultant_token}`,
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
      //console.log(response.data.messages);
      return response.data.messages
    } catch (error) {
      //console.log(error);
      if (!error.response) {
        setP_error_message("A network error occured");
      } else {
        setP_error_message(error.response.data.msg);
      }
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
        GetMessagesInConversations
      }}
    >
      {children}
    </AllGetRequest.Provider>
  );
};

export default AllGetProvider;

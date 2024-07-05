import React, { createContext, useState } from 'react'
import axios from 'axios'

export const AllGetRequest = createContext()

const USER_BASE_URL =
  "https://final-year-backend-35ph.onrender.com/api/v1/user";
const CONSULTANT_BASE_URL =
  "https://final-year-backend-35ph.onrender.com/api/v1/consultant";

const AllGetProvider = ({children}) => {
  const [error_message,setError_message] = useState("")
    const getAllConsutlant = async(search) =>{
        const data ={
            search:search
        }
        try {
            const response = await axios.post(`${CONSULTANT_BASE_URL}/healthworker`,data)
            return response
        } catch (error) {
             if (error.response) {
               setError_message(error.response.data.msg);
             }
        }
    }
  return (
   <AllGetRequest.Provider value={{ 
     getAllConsutlant,
     error_message
    }}>
     {children}
   </AllGetRequest.Provider>
  )
}

export default AllGetProvider
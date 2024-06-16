import axios from 'axios';
import React,{createContext, useState} from 'react'


export const HealthContext = createContext();

const URL = "https://final-year-backend-35ph.onrender.com"

const HealthworkerProvider = ({children}) => {
    const [isLoading,setIsLoading] = useState(false)
    const [search,setSearch] = useState("")
    const getAllworkers = async() =>{
        try {
          setIsLoading(true);
          const response = await axios.get(`${URL}/healthworker`);
          if (response) {
            setIsLoading(false);
          }
        } catch (error) {
          console.log(error);
        }
       
    }
  return (
    <HealthContext.Provider value={{ 
         getAllworkers,
         isLoading,
         search,
         setSearch
     }}>
         {children}
    </HealthContext.Provider>
  )
}

export default HealthworkerProvider
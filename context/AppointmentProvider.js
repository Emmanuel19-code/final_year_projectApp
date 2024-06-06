import { createContext } from "react";

export const AppointmentContext = createContext();

const AppointmentProvider = ({ children }) => {

      const bookappointment = () =>{
          
      }
      const cancelappointment = () =>{

      }
      
  return (
      <AppointmentContext.Provider value={{ 
         bookappointment,
         cancelappointment
       }}>
        {children}
    </AppointmentContext.Provider>
    )
};


export default AppointmentProvider
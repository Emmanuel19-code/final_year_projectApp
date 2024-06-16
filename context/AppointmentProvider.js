import { createContext, useState } from "react";

export const AppointmentContext = createContext();

const AppointmentProvider = ({ children }) => {
      const [time,setTime] = useState("")
      const [date,setDate] = useState("")

      const bookappointment = () =>{
          
      }
      const cancelappointment = () =>{

      }
      const appointmentReschedule = () =>{

      }
  return (
      <AppointmentContext.Provider value={{ 
         bookappointment,
         cancelappointment,
         appointmentReschedule
       }}>
        {children}
    </AppointmentContext.Provider>
    )
};


export default AppointmentProvider
import axios from "axios";
import { createContext, useState } from "react";

export const AuthApiContext = createContext();

const AuthProvider = ({ children }) => {
  const apiurl = "https://final-year-backend-35ph.onrender.com/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name,setName] = useState("")
  const [hospitalname,setHospitalname] = useState("")
  const [consultantId,setConsultantId] = useState("")
  const [isConsultant, setIsConsultant] = useState(false);
  const RegisterAccount = () => {};
  const loginAccount = async () => {
    await axios.post(apiurl);
  };
  const consultantcreate = async() =>{
    const data ={
       name:name, 
       email:email, 
       password:password, 
       healthWorkerId:consultantId, 
       oragnizationName :hospitalname
    }
    try {
          const response = await axios.post(
            `${apiurl}/consultant/registerhealthworker`,
            data
          );
          console.log(response);
    } catch (error) {
      console.log(error)
    }

  }
  const usercreate =async () =>{
    const data = {
      name: name,
      email: email,
      password: password,
    };
    try {
      const response = await axios.post(
        `${apiurl}/user/register`,
        data
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  const forgotpassword = async () => {};
  const profile = async () =>{}
  const userlogin =async () =>{
    const response = await axios.post(`${apiurl}/user/login`)
  }
  const consultantlogin = async()=>{
    
  }
  return (
    <AuthApiContext.Provider
      value={{
        loginAccount,
        email,
        setEmail,
        password,
        setPassword,
        RegisterAccount,
        name,
        setName,
        profile,
        consultantId,
        setConsultantId,
        isConsultant,
        setIsConsultant,
        consultantcreate,
        setHospitalname,
        usercreate,
        userlogin
      }}
    >
      {children}
    </AuthApiContext.Provider>
  );
};

export default AuthProvider;

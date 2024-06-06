import axios from "axios";
import { createContext, useState } from "react";

export const AuthApiContext = createContext();

const AuthProvider = ({ children }) => {
  const apiurl = "https://final-year-backend-35ph.onrender.com/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const RegisterAccount = () => {};
  const loginAccount = async () => {
    await axios(apiurl);
  };
  const forgotpassword = async () => {};
  return (
    <AuthApiContext.Provider
      value={{
        loginAccount,
        email,
        setEmail,
        password,
        setPassword,
        RegisterAccount,
      }}
    >
      {children}
    </AuthApiContext.Provider>
  );
};

export default AuthProvider;

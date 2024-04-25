
import { createContext, useContext, useState,useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(localStorage.getItem("jwtToken")?true:false);

 useEffect(() => {
  if(localStorage.getItem("jwtToken")){
    setAuthenticated(true);
  }
 }, [authenticated])


 

  const login = () => {
    // Implement your authentication logic here
    setAuthenticated(true);
  };

  const logout = () => {
    // Implement your logout logic here
    setAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ authenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
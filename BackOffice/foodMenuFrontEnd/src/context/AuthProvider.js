import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    // Retrieve auth from local storage if available
    const storedAuth = localStorage.getItem("auth");
    return storedAuth ? JSON.parse(storedAuth) : {};
  });

  // Save auth to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(auth));
  }, [auth]);
  console.log("Auth", auth);
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext
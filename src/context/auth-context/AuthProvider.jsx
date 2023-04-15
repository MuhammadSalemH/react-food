import React, { useEffect, useState } from "react";
import AuthContext from "./auth-context";

const AuthProvider = (props) => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("isLogin")) {
      setIsLogin(true);
    }
  }, []);

  const loginHandler = (email, password) => {
    setIsLogin(true);
    localStorage.setItem("isLogin", "true");
  };

  const logoutHandler = () => {
    setIsLogin(false);
    localStorage.removeItem("isLogin");
  };

  return (
    <AuthContext.Provider
      value={{
        isLogin: isLogin,
        onLogin: loginHandler,
        onLogout: logoutHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

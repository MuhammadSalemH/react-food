import React from "react";

const AuthContext = React.createContext({
  isLogin: false,
  onLogin: (email, password) => {},
  onLogout: () => {},
});

export default AuthContext;

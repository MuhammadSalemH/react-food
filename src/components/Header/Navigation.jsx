import React, { useContext } from "react";

import classes from "./Navigation.module.css";

import AuthContext from "../../context/auth-context/auth-context";

import CartButton from "./CartButton";
import Button from "./../UI/Button";

const Navigation = () => {
  const AuthCtx = useContext(AuthContext);
  return (
    <nav className={classes.nav}>
      <ul>
        {AuthCtx.isLogin && (
          <li>
            <CartButton />
          </li>
        )}
        {AuthCtx.isLogin && (
          <li>
            <Button className={classes.button} onClick={AuthCtx.onLogout}>
              Logout
            </Button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;

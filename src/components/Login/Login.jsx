import { useContext } from "react";

import classes from "./Login.module.css";

import AuthContext from "../../context/auth-context/auth-context";

import useInput from "./../../hooks/use-input";

import Button from "../UI/Button";
import Input from "../UI/Input";

const Login = (props) => {
  const AuthCtx = useContext(AuthContext);
  const {
    enteredValue: enteredEmail,
    inputIsValid: emailIsValid,
    inputInvalid: emailInvalid,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    resetInput: emailInputReset,
  } = useInput((email) => {
    return email.trim().includes("@");
  });

  const {
    enteredValue: enteredPassword,
    inputIsValid: passwordIsValid,
    inputInvalid: passwordInvalid,
    inputChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    resetInput: passwordInputReset,
  } = useInput((pw) => {
    return pw.trim().length >= 6;
  });

  const LoginHandler = (event) => {
    event.preventDefault();
    if (!emailIsValid || !passwordIsValid) {
      return;
    }
    AuthCtx.onLogin(enteredEmail, enteredPassword);
    emailInputReset();
    passwordInputReset();
  };

  const emailClasses = emailInvalid
    ? `${classes.controls} ${classes.invalid}`
    : `${classes.controls}`;

  const passwordClasses = passwordInvalid
    ? `${classes.controls} ${classes.invalid}`
    : `${classes.controls}`;

  return (
    <form onSubmit={LoginHandler} className={classes.form}>
      <Input
        className={emailClasses}
        label="E-mail"
        input={{
          type: "text",
          id: "email",
          onChange: emailChangeHandler,
          onBlur: emailBlurHandler,
          value: enteredEmail,
          invalid: emailInvalid,
          message: "Enter a valid E-mail",
        }}
      />
      <Input
        className={passwordClasses}
        label="Password"
        input={{
          type: "password",
          id: "password",
          onChange: passwordChangeHandler,
          onBlur: passwordBlurHandler,
          value: enteredPassword,
          invalid: passwordInvalid,
          message: "Password must be at least 6 charachter",
        }}
      />
      <div className={classes.actions}>
        <Button className={classes.btn}>Login</Button>
      </div>
    </form>
  );
};

export default Login;

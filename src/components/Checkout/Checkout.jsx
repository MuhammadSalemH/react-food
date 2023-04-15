import { useState, useContext } from "react";

import classes from "./Checkout.module.css";

import useInput from "../../hooks/use-input";

import CartContext from "../../context/cart-context/cart-context";

import Input from "../UI/Input";
import Button from "../UI/Button";

const Checkout = (props) => {
  const [isOrderDone, setIsOrderDone] = useState(false);
  const cartCtx = useContext(CartContext);
  const {
    enteredValue: enteredMobile,
    inputIsValid: mobileIsValid,
    inputInvalid: mobileInvalid,
    inputChangeHandler: mobileChangeHandler,
    inputBlurHandler: mobileBlurHandler,
    resetInput: mobileInputReset,
  } = useInput((mobile) => {
    return mobile.trim().length === 11 && typeof mobile === "string";
  });

  const {
    enteredValue: enteredAddress,
    inputIsValid: addressIsValid,
    inputInvalid: addressInvalid,
    inputChangeHandler: addressChangeHandler,
    inputBlurHandler: addressBlurHandler,
    resetInput: addressInputReset,
  } = useInput((address) => {
    return address.trim().length > 0;
  });

  const proccedToCheckout = (ev) => {
    ev.preventDefault();
    if (!addressIsValid || !mobileIsValid) return;

    mobileInputReset();
    addressInputReset();

    setIsOrderDone(true);

    cartCtx.orderIsDone();
  };

  const mobileClasses = mobileInvalid
    ? `${classes.controls} ${classes.invalid}`
    : `${classes.controls}`;

  const addressClasses = addressInvalid
    ? `${classes.controls} ${classes.invalid}`
    : `${classes.controls}`;

  return (
    <>
      {!isOrderDone && (
        <form className={classes.form} onSubmit={proccedToCheckout}>
          <Input
            className={mobileClasses}
            label="Mobile"
            input={{
              type: "text",
              id: "mobile",
              onChange: mobileChangeHandler,
              onBlur: mobileBlurHandler,
              value: enteredMobile,
              invalid: mobileInvalid,
              message: "Enter a valid Mobile",
            }}
          />
          <Input
            className={addressClasses}
            label="Address"
            input={{
              type: "text",
              id: "address",
              onChange: addressChangeHandler,
              onBlur: addressBlurHandler,
              value: enteredAddress,
              invalid: addressInvalid,
              message: "Required Input",
            }}
          />
          <div className={classes.actions}>
            <Button onClick={props.onCancel} className={classes.cancel}>
              Cancel
            </Button>
            <Button>Procced</Button>
          </div>
        </form>
      )}
      {isOrderDone && (
        <p className={classes.success}>Your order will arrive in minutes.</p>
      )}
    </>
  );
};

export default Checkout;

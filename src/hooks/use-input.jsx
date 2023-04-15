import { useState } from "react";

const useInput = (validateInput) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [inputTouched, setInputTouched] = useState(false);

  const inputIsValid = validateInput(enteredValue);

  const inputChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const inputBlurHandler = () => {
    setInputTouched(true);
  };

  const inputInvalid = !inputIsValid && inputTouched;

  const resetInput = () => {
    setEnteredValue("");
    setInputTouched(false);
  };

  return {
    enteredValue,
    inputIsValid,
    inputInvalid,
    inputChangeHandler,
    inputBlurHandler,
    resetInput,
  };
};

export default useInput;

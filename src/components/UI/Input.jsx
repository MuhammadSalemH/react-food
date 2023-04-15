import React from "react";

const Input = React.forwardRef((props, ref) => {
  return (
    <div className={props.className}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input {...props.input} ref={ref} />
      {props.input.invalid && <p>{props.input.message}</p>}
    </div>
  );
});

export default Input;

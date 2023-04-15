import ReactDOM from "react-dom";

import classes from "./Modal.module.css";

const Overlay = (props) => {
  return <div className={classes.overlay} onClick={props.onConfirm} />;
};

const ModalWindow = (props) => {
  return (
    <div className={`${classes.modal} ${props.className}`}>
      {props.children}
    </div>
  );
};

const root = document.getElementById("cart-root");

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(<Overlay onConfirm={props.onConfirm} />, root)}
      {ReactDOM.createPortal(
        <ModalWindow className={props.className}>{props.children}</ModalWindow>,
        root
      )}
    </>
  );
};

export default Modal;

import React, { useContext, useState } from "react";

import classes from "./Cart.module.css";

import CartContext from "./../../context/cart-context/cart-context";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import Button from "../UI/Button";
import Checkout from "../Checkout/Checkout";

const Cart = () => {
  const cartCtx = useContext(CartContext);
  const [isChecked, setIsChecked] = useState(false);

  const hasItem = cartCtx.items.length > 0;

  const amount = `$${cartCtx.totalAmount.toFixed(2)}`;

  const addToCart = (item) => {
    cartCtx.addItemToCart({ ...item, amount: 1 });
  };

  const removeFromCart = (id) => {
    cartCtx.removeItemFromCart(id);
  };

  const clearItem = (id) => {
    cartCtx.clearItem(id);
  };

  const showCheckoutForm = () => {
    setIsChecked(true);
  };

  const cancelCheckoutForm = () => {
    setIsChecked(false);
  };

  const toggleCartHandler = () => {
    cartCtx.onToggle();
  };

  const cartItems = (
    <ul className={classes.list}>
      {cartCtx.items.map((item, indx) => (
        <CartItem
          item={item}
          key={indx}
          onAdd={addToCart.bind(null, item)}
          onRemove={removeFromCart.bind(null, item.id)}
          onClear={clearItem.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  let content = (
    <>
      {cartItems}
      <div
        className={`${classes.total} ${hasItem ? classes["total-border"] : ""}`}
      >
        <span>Total Amount</span>
        <span>{amount}</span>
      </div>
      <div className={classes.action}>
        <Button className={classes.close} onClick={toggleCartHandler}>
          close
        </Button>
        {hasItem && <Button onClick={showCheckoutForm}>order</Button>}
      </div>
    </>
  );

  if (isChecked) {
    content = (
      <div>
        <Checkout onCancel={cancelCheckoutForm} />
      </div>
    );
  }

  return (
    <>
      <Modal className={classes["cart-modal"]} onConfirm={cartCtx.onToggle}>
        {content}
      </Modal>
    </>
  );
};

export default Cart;

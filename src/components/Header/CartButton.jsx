import { useContext, useEffect, useState } from "react";
import classes from "./CartButton.module.css";
import CartContext from "../../context/cart-context/cart-context";
import CartIcon from "../cart/CartIcon";

const CartButton = () => {
  const cartCtx = useContext(CartContext);
  const { items } = cartCtx;
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const itemsInCart = items.reduce((acc, item) => {
    return acc + item.amount;
  }, 0);

  const buttonClasses = `${classes["cart-button"]} ${
    btnIsHighlighted ? classes.bump : ""
  }`;

  useEffect(() => {
    if (items.length === 0) return;
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  const toggleCartHandler = () => {
    // cartCtx.showCartHandler();
    // console.log(cartCtx);
    console.log(cartCtx.onShowCart);
    console.log(cartCtx.showCart);
    cartCtx.onShowCart();
  };

  return (
    <button className={buttonClasses} onClick={toggleCartHandler}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span className={classes.cart}>Your cart</span>
      <span className={classes.badge}>{itemsInCart}</span>
    </button>
  );
};

export default CartButton;

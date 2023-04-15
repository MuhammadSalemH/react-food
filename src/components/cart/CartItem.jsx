import classes from "./Cart.module.css";
import Button from "../UI/Button";

const CartItem = (props) => {
  const { name, amount, price } = props.item;

  return (
    <li className={classes["cart-item"]}>
      <div className={classes.order}>
        <span>{name}</span>
        <div className={classes.price}>
          <span>${price}</span>
          <span>x{amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <Button className={classes.trash} onClick={props.onClear}>
          x
        </Button>
        <Button onClick={props.onRemove}>-</Button>
        <Button onClick={props.onAdd}>+</Button>
      </div>
    </li>
  );
};

export default CartItem;

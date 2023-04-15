import { useContext } from "react";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from "../../../context/cart-context/cart-context";

const MealItem = ({ meal }) => {
  let { id, name, descreption, price } = meal;
  const cartCtx = useContext(CartContext);

  const addItemHandler = (amount) => {
    const order = {
      id,
      name,
      amount,
      price,
    };
    cartCtx.addItemToCart(order);
  };

  const customPrice = price;

  return (
    <li className={classes["meal-item"]}>
      <div className={classes.descreption}>
        <span>{name}</span>
        <span>{descreption}</span>
        <span>${customPrice}</span>
      </div>
      <MealItemForm onAddItem={addItemHandler} />
    </li>
  );
};

export default MealItem;

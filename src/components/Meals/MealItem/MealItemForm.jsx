import { useRef } from "react";
import Button from "../../UI/Button";
import Input from "../../UI/Input";
import classes from "./MealItem.module.css";

const MealItemForm = (props) => {
  const inputRef = useRef();

  const addItemToCart = (event) => {
    event.preventDefault();
    const amountInput = +inputRef.current.value;
    props.onAddItem(amountInput);
  };

  const inputID = `amount_${props.id}`;

  return (
    <form className={classes.form} onSubmit={addItemToCart}>
      <Input
        className={classes.control}
        label="Amount"
        ref={inputRef}
        input={{
          type: "number",
          id: inputID,
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <Button className={classes.button}>+Add</Button>
    </form>
  );
};

export default MealItemForm;

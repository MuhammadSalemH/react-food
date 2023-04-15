import { useReducer, useState } from "react";
import CartContext from "./cart-context";

// Initiate cart values
const initialCartValues = {
  items: [],
  totalAmount: 0,
};

// Cart reducer function
const cartReducer = (state, action) => {
  // 1- In add an item
  if (action.type === "ADD") {
    let updatedTotalAmount =
      state.totalAmount + action.item.amount * action.item.price;

    const itemIndex = state.items.findIndex((ele) => ele.id === action.item.id);
    const itemIsExisit = state.items[itemIndex];

    let updatedItem, updatedItemsList;
    // Search in the list is an item exist or not
    if (itemIsExisit) {
      // When item is exist
      updatedItem = {
        ...itemIsExisit,
        amount: itemIsExisit.amount + action.item.amount,
      };

      updatedItemsList = [...state.items];
      updatedItemsList[itemIndex] = updatedItem;
    } else {
      // When the item isn't exit
      updatedItemsList = state.items.concat(action.item);
    }

    return { items: updatedItemsList, totalAmount: updatedTotalAmount };
  }

  // 2- In remove an item
  if (action.type === "REMOVE") {
    const itemIndex = state.items.findIndex((ele) => ele.id === action.id);
    const itemInList = state.items[itemIndex];
    let updatedTotalAmount = state.totalAmount - itemInList.price;

    if (updatedTotalAmount < 1) updatedTotalAmount = 0;
    let updatedItemsList;

    if (itemInList.amount === 1) {
      updatedItemsList = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = { ...itemInList, amount: itemInList.amount - 1 };
      updatedItemsList = [...state.items];
      updatedItemsList[itemIndex] = updatedItem;
    }

    return { items: updatedItemsList, totalAmount: updatedTotalAmount };
  }

  // 3- In remove an item
  if (action.type === "CLEAR") {
    console.log(state.totalAmount);
    const itemIndex = state.items.findIndex((ele) => ele.id === action.id);
    const itemInList = state.items[itemIndex];
    const updatedItemsList = state.items.filter(
      (item) => item.id !== action.id
    );

    let updatedTotalAmount;

    if (state.totalAmount > 1) {
      updatedTotalAmount =
        state.totalAmount - itemInList.amount * itemInList.price;
      if (updatedTotalAmount === 0) {
        updatedTotalAmount = updatedTotalAmount * -1;
      }
    }

    return { items: updatedItemsList, totalAmount: updatedTotalAmount };
  }

  // 4- In order is done
  if (action.type === "DONE") {
    return initialCartValues;
  }

  return initialCartValues;
};

const CartProvider = (props) => {
  const [showCart, setShowCart] = useState(false);

  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    initialCartValues
  );

  const addItemToCartHandler = (item) =>
    dispatchCartAction({ type: "ADD", item: item });

  const removeItemFromCartHandler = (id) =>
    dispatchCartAction({ type: "REMOVE", id: id });

  const clearItemHandler = (id) =>
    dispatchCartAction({ type: "CLEAR", id: id });

  const orderIsDoneHandler = () => dispatchCartAction({ type: "DONE" });

  const showCartHandler = () => {
    setShowCart(true);
  };

  const toggleCartHandler = () => {
    setShowCart(false);
  };

  const cartContextValues = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItemToCart: addItemToCartHandler,
    removeItemFromCart: removeItemFromCartHandler,
    clearItem: clearItemHandler,
    orderIsDone: orderIsDoneHandler,

    showCart: showCart,
    onShowCart: showCartHandler,
    onToggle: toggleCartHandler,
  };

  return (
    <CartContext.Provider value={cartContextValues}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;

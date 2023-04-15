import React from "react";

const CartContext = React.createContext({
  showCart: false,
  onShowCart: () => {},
  onToggle: () => {},

  items: [],
  totalAmount: 0,
  addItemToCart: (item) => {},
  removeItemFromCart: (id) => {},
  orderIsDone: () => {},
  clearItem: () => {},
  orderIsDone: () => {},
});

export default CartContext;

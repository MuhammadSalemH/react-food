import { useContext } from "react";

import AuthContext from "./context/auth-context/auth-context";

import MainHeader from "./components/Header/MainHeader";
import Login from "./components/Login/Login";
import Meals from "./components/Meals/Meals";
import Cart from "./components/cart/Cart";
import CartContext from "./context/cart-context/cart-context";

const App = () => {
  const authCtx = useContext(AuthContext);
  const cartCtx = useContext(CartContext);

  return (
    <>
      <MainHeader />
      {!authCtx.isLogin && <Login />}
      {authCtx.isLogin && <Meals />}
      {authCtx.isLogin && cartCtx.showCart && <Cart />}
    </>
  );
};

export default App;

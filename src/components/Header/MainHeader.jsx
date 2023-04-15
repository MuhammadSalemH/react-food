import classes from "./MainHeader.module.css";

import food from "../../assets/food.jpg";

import Navigation from "./Navigation";

const MainHeader = () => {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Fast<span className={classes.logo}>Food</span>
        </h1>
        <Navigation />
      </header>
      <div className={classes["intro-image"]}>
        <img src={food} alt="Food" />
      </div>
    </>
  );
};

export default MainHeader;

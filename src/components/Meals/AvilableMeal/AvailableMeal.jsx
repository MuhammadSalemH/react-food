import { useEffect, useState } from "react";

import classes from "./AvailableMeal.module.css";

import useHttp from "./../../../hooks/use-http";

import Card from "../../UI/Card";
import Spinner from "../../UI/Spinner";
import MealItem from "../MealItem/MealItem";

const AvailableMeal = () => {
  const [meals, setMeals] = useState([]);

  const { sendRequest: getMeals, isLoading, hasError } = useHttp();

  useEffect(() => {
    const applyData = (data) => {
      let loadedMeals = [];
      for (const item in data) {
        const meal = { id: item, ...data[item] };
        loadedMeals.push(meal);
      }
      setMeals(loadedMeals);
    };

    getMeals(
      {
        url: "https://food-app-80913-default-rtdb.firebaseio.com/meals.json",
      },
      applyData
    );
  }, [getMeals]);

  let content;

  if (isLoading) content = <Spinner />;
  if (hasError) content = <h2 className={classes.error}>{hasError}</h2>;
  if (!isLoading && !hasError)
    content = (
      <ul>
        {meals.map((meal, indx) => (
          <MealItem meal={meal} key={indx} />
        ))}
      </ul>
    );
  return <Card className={classes["available-meal"]}>{content}</Card>;
};

export default AvailableMeal;

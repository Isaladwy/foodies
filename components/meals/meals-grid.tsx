import React from 'react';
import classes from './meals-grid.module.css';
import MealItem from './meal-item';

export default function MealsGrid({
  meals,
}: {
  meals: {
    id: string;
  }[];
}) {
  return (
    <ul className={classes.meals}>
      {meals.map((meal) => (
        <li key={meal.id}>
          <MealItem {...meal} />
        </li>
      ))}
    </ul>
  );
}

"use client";
import {useState, useEffect, use} from 'react';

type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

async function fetchMealIdeas(ingredient: string) {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
    );
    const data = await response.json();
    return data.meals || [];  
  } catch (error) {
    console.error("Error fetching meal ideas:", error);
    return [];  
  }
}

export default function MealIdea({ingredient}: {ingredient: string}) {

    const [meals, setMeals] = useState<Meal[]>([]);

    async function loadMealIdea() {
        const fetchedMeals = await fetchMealIdeas(ingredient);
        setMeals(fetchedMeals); 
    }
    useEffect(() => {
        if (ingredient) {
      loadMealIdea();
    }
  }, [ingredient]);
  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center tracking-wide">
        Meal Idea for {ingredient}
      </h2>
      <ul>
        {meals.map((meal) => (
          <li key={meal.idMeal}>
            <img src={meal.strMealThumb} alt={meal.strMeal} width={100} />
            <p>{meal.strMeal}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
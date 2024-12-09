import { useEffect, useState } from "react";
import "./fooddetails.modules.css";

export default function FoodDetails({ foodId }) {
  const [food, setFood] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const URL = `https://api.spoonacular.com/recipes/${foodId}/information`;
  const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;
  useEffect(() => {
    async function fetchfood() {
      const res = await fetch(`${URL}?apiKey=${API_KEY}`);
      const data = await res.json();
      console.log(data);
      setFood(data);
      setIsLoading(false);
    }
    fetchfood();
  }, [foodId]);
  return (
    <div>
      <div className="recipeCard">
        <h1 className="recipeName">{food.title}</h1>
        <img className="recipeImage" src={food.image} alt="Food Image" />
        <div className="recipeDetails">
          <span>
            <strong>Preparation Time: {food.readyInMinutes} Minutes</strong>
          </span>
          <strong>Serves {food.servings}</strong>
          <span>{food.vegetarian ? "Vegetarian" : "Non-Vegetarian"}</span>
        </div>

        <div className="recipeInstructions">
          <h2>Instructions</h2>
          <ol>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              food.analyzedInstructions[0].steps.map((step) => (
                <li>{step.step}</li>
              ))
            )}
          </ol>
        </div>
      </div>
    </div>
  );
}

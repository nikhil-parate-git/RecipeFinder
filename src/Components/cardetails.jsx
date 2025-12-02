import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./RecipeDetail.css";
import { FaBookOpen, FaYoutube } from "react-icons/fa";
import { GiCookingPot } from "react-icons/gi";

const RecipeDetail = () => {
  const { id } = useParams();

  const [allvalues, setvalues] = useState({
    recipe: null,
    loading: true,
    error: "",
  });

  const [quote, setQuote] = useState("");

  const quotes = [
    "Good food is the foundation of genuine happiness. 🍲",
    "Cooking is love made visible. ❤️",
    "One cannot think well, love well, sleep well, if one has not dined well. 🌸",
    "Happiness is homemade. 🏡",
    "A recipe has no soul, you must bring soul to the recipe. ✨",
    "Life is uncertain. Eat dessert first! 🍰",
    "Food tastes better when you eat it with your family. 👨‍👩‍👧‍👦",
    "The secret ingredient is always love. 💖",
  ];

  const FoodDetails = async () => {
    const api = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    try {
      setvalues({ ...allvalues, loading: true });
      let response = await fetch(api);
      let data = await response.json();
      if (response.ok && data.meals) {
        setvalues({
          ...allvalues,
          recipe: data.meals[0],
          loading: false,
          error: "",
        });
      } else {
        setvalues({
          ...allvalues,
          recipe: null,
          loading: false,
          error: "Recipe not found!!",
        });
      }
    } catch (error) {
      setvalues({
        ...allvalues,
        recipe: null,
        loading: false,
        error: error.message,
      });
    }
  };

  useEffect(() => {
    FoodDetails();
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  }, [id]);

  const { recipe, loading, error } = allvalues;

  if (loading) {
    return (
      <div className="container text-center my-5">
        <h3>Loading...</h3>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container text-center my-5">
        <h3 className="text-danger">{error}</h3>
        <Link to="/" className="btn btn-warning mt-3">
          Back to Home
        </Link>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="container text-center my-5">
        <h3>No recipe found</h3>
        <Link to="/" className="btn btn-warning mt-3">
          Back to Home
        </Link>
      </div>
    );
  }

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push(`${ingredient} - ${measure}`);
    }
  }

  const instructionsSteps = recipe.strInstructions
    .split(/[\r\n]+/)
    .filter((step) => step.trim() !== "");

  return (
    <div className="recipe-detail bg-dark text-light">
      <div className="container">
        <div className="quote-box text-center mb-4 p-3 text-light">
          <h5 className="mb-0">{quote}</h5>
        </div>
        <Link to="/" className="btn btn-warning mb-3 mt-2">
          Back to Home
        </Link>
      
        <div className="row">
          {/* Image and YouTube */}
          <div className="col-md-6 mb-4">
            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              className="img-fluid rounded shadow"
            />

            {recipe.strYoutube && (
              <div className="mt-3">
                <div className="d-flex align-items-center mb-2">
                  <FaYoutube
                    className="text-danger"
                    style={{ fontSize: "35px" }}
                  />
                  <h5 className="ml-2 mt-1"> Watch on YouTube</h5>
                </div>
                <div className="ratio ratio-16x9">
                  <iframe
                    src={`https://www.youtube.com/embed/${
                      recipe.strYoutube.split("v=")[1]
                    }`}
                    title="YouTube video"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}
          </div>

          {/* Recipe Details */}
          <div className="col-md-6">
            <div className="d-flex align-items-center mb-2">
              <GiCookingPot
                className="text-warning mr-2"
                style={{ fontSize: "38px" }}
              />
              <h2 className="mb-0">{recipe.strMeal}</h2>
            </div>
            <p>
              <strong>Category:</strong> {recipe.strCategory} |{" "}
              <strong>Area:</strong> {recipe.strArea}
            </p>

            <h4>Ingredients</h4>
            <ul>
              {ingredients.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>

            <div className="d-flex align-items-center mb-2 mt-3">
              <FaBookOpen
                className="mr-2"
                style={{ fontSize: "38px", color: "darkcyan" }}
              />
              <h4 className="mb-0">Instructions</h4>
            </div>
            <ol>
              {instructionsSteps.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;

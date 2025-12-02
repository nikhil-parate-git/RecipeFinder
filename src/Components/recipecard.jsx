import React, { useState } from "react";
import "./RecipeCard.css";
import { FaSpinner } from "react-icons/fa";
import { Link } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  const [allvalues, setvalues] = useState({
    loading: true,
  });

  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex">

      <Link className="text-decoration-none text-dark" to={`/RecipeDetail/${recipe.idMeal}`}>

      <div className="recipe-card card m-2 flex-fill">
        {allvalues.loading && (
          <div className="loading-container d-flex justify-content-center align-items-center">
            <FaSpinner className="loading-icon spin" />
          </div>
        )}

        <img
          src={recipe.strMealThumb}
          className={`card-img-top img-fluid recipe-img ${
            allvalues.loading ? "d-none" : ""
          }`}
          onLoad={() => setvalues({ ...allvalues, loading: false })} 
        />

        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{recipe.strMeal}</h5>
          <p className="card-text mb-2">
            <strong>Category:</strong> {recipe.strCategory} <br />
            <strong>Area:</strong> {recipe.strArea}
          </p>
          <p className="card-text instructions flex-grow-1">
            {recipe.strInstructions.slice(0, 80)}...
          </p>
        </div>
      </div>
        </Link>
    </div>
  );
};

export default RecipeCard;

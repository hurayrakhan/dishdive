import { useParams, useNavigate } from "react-router";
import {  useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { Typewriter } from 'react-simple-typewriter'
import Swal from "sweetalert2";

export default function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  

  useEffect(() => {
    fetch(`https://assignment-10-server-lime-beta.vercel.app/recipes/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setRecipe(data);
        setLikes(data.likes || 0);
      })
      .catch(() => setRecipe(null));
  }, [id, likes]);



  const handleLike = (id) => {
    setLiked(true);
    
    setLikes(likes + 1);
    

    fetch(`https://assignment-10-server-lime-beta.vercel.app/recipes/details/${id}`, {
      method: "PATCH"
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
    })
  };

  if (!recipe) {
    return (
      <div className="text-center py-20 text-gray-600 text-lg">
        Loading recipe details...
      </div>
    );
  }

  const ingredients = Array.isArray(recipe.ingredients)
    ? recipe.ingredients
    : recipe.ingredients?.split(",") || [];

  const instructions = Array.isArray(recipe.instructions)
    ? recipe.instructions
    : recipe.instructions?.split(".") || [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-white hover:text-green-400 text-2xl"
      >
        ← Back
      </button>

      {/* Recipe Card */}
      <div className="relative bg-white shadow-md hover:shadow-2xl transition-shadow rounded-xl overflow-hidden flex flex-col lg:flex-row group">
      
        {/* Like Button - Top Right of Card */}
        <button
          onClick={() => {
            handleLike(id)
          }}
          className={`absolute top-4 right-4 z-10 p-3 rounded-full shadow-lg transition-all duration-300 
            ${liked ? "bg-red-500 text-white" : "bg-white text-red-500 hover:bg-red-100"}`}
          title="Like this recipe"
        >
          <FaHeart />
        </button>

        {/* Image Section */}
        <div className="lg:w-1/2 overflow-hidden">
          <img
            src={
              recipe.image ||
              "https://via.placeholder.com/600x400?text=No+Image"
            }
            alt={recipe.title}
            className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Content Section */}
        <div className="lg:w-1/2 p-6 bg-gray-50">
        <div className="bg-blue-400 px-4 pt-0 pb-1 rounded-4xl max-w-xs text-center mb-4">
          <p className=""><span className="font-bold text-amber-300">{recipe.likeCount} </span>  people interested in this recipe!</p>
        </div>
        
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-gray-800 mb-1">
              {recipe.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                {recipe.cuisine || "Unknown Cuisine"}
              </span>
              <span>⏱️ {recipe.prepTime || "N/A"}</span>
              <span>👍 {recipe.likeCount} {recipe.likeCount === 1 ? "Like" : "Likes"}</span>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              🧂 Ingredients
            </h2>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {ingredients.length > 0 ? (
                ingredients.map((item, idx) => (
                  <li key={idx}>{item.trim()}</li>
                ))
              ) : (
                <li>No ingredients listed.</li>
              )}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              👨‍🍳 Instructions
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              {instructions.length > 0 ? (
                instructions.map((step, idx) =>
                  step.trim() ? <li key={idx}>{step.trim()}</li> : null
                )
              ) : (
                <li>No instructions provided.</li>
              )}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

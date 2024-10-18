import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../utils/recipeSlice';
import { FaHeart, FaRegHeart } from 'react-icons/fa'; // Importing heart icons

const RecipeCard = ({ recipe }) => {
    const favoritesList = useSelector((state) => state.recipes.favorites);
    const dispatch = useDispatch();

    // If recipe is undefined, return null (won't render anything)
    if (!recipe) {
        return null;
    }

    const isFavorite = favoritesList.some(fav => fav.idMeal === recipe.idMeal);

    const handleFavorite = () => {
        dispatch(addFavorite(recipe));
    };

    const removeFromFavorite = () => {
        dispatch(removeFavorite(recipe));
    };

    return (
        <div className="border p-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
            <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-full h-48 object-cover rounded" />
            <h2 className="font-bold text-lg mt-2">{recipe.strMeal}</h2>
            <p className="text-gray-600">{recipe.strCategory}</p>

            <div className="flex items-center justify-between mt-2">
                {isFavorite ? (
                    <button onClick={removeFromFavorite} className="flex items-center bg-red-500 text-white rounded px-2 py-1">
                        <FaHeart className="mr-1" />
                        Remove From Favorites
                    </button>
                ) : (
                    <button onClick={handleFavorite} className="flex items-center bg-blue-500 text-white rounded px-2 py-1">
                        <FaRegHeart className="mr-1" />
                        Add to Favorites
                    </button>
                )}
                <a
                    href={`https://www.themealdb.com/meal/${recipe.idMeal}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                >
                    View Recipe
                </a>
            </div>
        </div>
    );
};

export default RecipeCard;

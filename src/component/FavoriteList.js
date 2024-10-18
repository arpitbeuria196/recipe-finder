import React from 'react';
import { useSelector } from 'react-redux';
import RecipeCard from './RecipeCard';
import { FaHeart } from 'react-icons/fa'; // Importing heart icon for favorites

const FavoriteList = () => {
    const favorites = useSelector((state) => state.recipes.favorites);

    return (
        <div className="mt-8 p-4 bg-gray-100 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-center mb-4 text-gray-800 flex items-center justify-center">
                <FaHeart className="mr-2 text-red-500" />
                Your Favorite Recipes
            </h1>
            
            {favorites.length === 0 ? (
                <p className="text-center text-gray-500">No favorites yet. Start adding some delicious recipes!</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favorites.map((favorite, index) => (
                        <RecipeCard
                            key={index}
                            recipe={favorite}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default FavoriteList;

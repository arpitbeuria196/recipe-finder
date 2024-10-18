import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCustomRecipe } from '../utils/recipeSlice';

const CustomRecipe = () => {
    const dispatch = useDispatch();

    const [customRecipes, setCustomRecipes] = useState({
        strMeal: '',
        strCategory: '',
        strMealThumb: '',
        strInstructions: '',
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setCustomRecipes({ ...customRecipes, [e.target.name]: e.target.value });
    };

    const validateURL = (url) => {
        const pattern = new RegExp('https?://.*\\.(jpg|jpeg|png|gif)$'); // Basic URL pattern for image
        return pattern.test(url);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate image URL
        if (!validateURL(customRecipes.strMealThumb)) {
            setMessage('Please enter a valid image URL.');
            return;
        }

        dispatch(addCustomRecipe(customRecipes));
        setMessage('Recipe submitted successfully!');
        setCustomRecipes({ strMeal: '', strCategory: '', strMealThumb: '', strInstructions: '' });
    };

    return (
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 mt-8">
            <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">Add Your Custom Recipe</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="strMeal"
                    placeholder="Recipe Name"
                    value={customRecipes.strMeal}
                    onChange={handleChange}
                    className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:border-blue-500"
                    required
                />
                <input
                    type="text"
                    name="strCategory"
                    value={customRecipes.strCategory}
                    placeholder="Category"
                    onChange={handleChange}
                    className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:border-blue-500"
                    required
                />
                <input
                    type="text"
                    name="strMealThumb"
                    value={customRecipes.strMealThumb}
                    onChange={handleChange}
                    placeholder="Image URL (e.g., https://example.com/image.jpg)"
                    className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:border-blue-500"
                    required
                />
                <textarea
                    name="strInstructions"
                    value={customRecipes.strInstructions}
                    onChange={handleChange}
                    placeholder="Instructions"
                    className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:border-blue-500 h-24"
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-200"
                >
                    Submit Recipe
                </button>
            </form>
            {message && <p className="mt-4 text-center text-green-500">{message}</p>}
        </div>
    );
};

export default CustomRecipe;

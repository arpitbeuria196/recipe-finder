import React, { useRef, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setRecipes, recentSearchHistory, removeRecentSearchHistory } from '../utils/recipeSlice';
import RecipeCard from './RecipeCard';
import FavoriteList from './FavoriteList';
import CustomRecipe from './CustomRecipe';
import CustomRecipeList from './CustomRecipeList';
import { FaSearch, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const RecipeSearch = () => {
    const dispatch = useDispatch();
    const searchRef = useRef('');
    const [query, setQuery] = useState('');
    const recipes = useSelector((state) => state.recipes.recipes);
    const recipesHistory = useSelector((state) => state.recipes.searchHistory);
    const [currentPage, setCurrentPage] = useState(1);
    const [shimmer, setShimmer] = useState(false);

    const fetchData = async (search) => {
        if (!search) return; // Prevent fetch if query is empty
        setShimmer(true);

        try {
            const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
            dispatch(setRecipes(response.data.meals || [])); // Handle case if no meals found
        } catch (error) {
            console.error('Error fetching recipes:', error.response?.data || error.message);
        } finally {
            setShimmer(false);
        }
    };

    const ITEMS_PER_PAGE = 9;
    const totalPages = Math.ceil(recipes.length / ITEMS_PER_PAGE);
    const paginatedRecipes = recipes.slice((currentPage - 1) * ITEMS_PER_PAGE, ITEMS_PER_PAGE * currentPage);

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            const search = searchRef.current.value;
            setQuery(search);
            fetchData(search);
            dispatch(recentSearchHistory(search));
        }
    };

    const handleRecentSearch = (item) => {
        searchRef.current.value = item;
        fetchData(item);
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
            <div className="mb-6">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search for Recipes..."
                        ref={searchRef}
                        onKeyDown={handleSearch}
                        className="border border-gray-300 p-3 w-full rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                    />
                    <FaSearch className="absolute top-3 right-3 text-gray-500" />
                </div>
            </div>

            {shimmer ? (
                <div className="text-center mt-4">
                    <span className="text-lg font-semibold">Loading recipes...</span>
                </div>
            ) : (
                <>
                    <h3 className="mt-4 font-semibold text-xl">Search History:</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
                        {recipesHistory.map((item, index) => (
                            <div
                                key={index}
                                className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition duration-200"
                                onClick={() => handleRecentSearch(item)}
                            >
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-800 font-medium">{item}</span>
                                    <button
                                        className="text-red-500 hover:text-red-700 focus:outline-none"
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent triggering the search
                                            dispatch(removeRecentSearchHistory(item));
                                        }}
                                    >
                                        <FaTimes />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <FavoriteList />
                    <CustomRecipe />
                    <CustomRecipeList />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                        {paginatedRecipes?.map((recipe) => (
                            <RecipeCard key={recipe.idMeal} recipe={recipe} />
                        ))}
                    </div>

                    <div className="flex justify-between items-center mt-6">
                        <button
                            onClick={handlePrevious}
                            className={`bg-blue-500 text-white rounded-full px-4 py-2 transition duration-200 hover:bg-blue-600 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={currentPage === 1}
                        >
                            <FaChevronLeft />
                        </button>
                        <span className="text-gray-600 font-medium">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={handleNext}
                            className={`bg-blue-500 text-white rounded-full px-4 py-2 transition duration-200 hover:bg-blue-600 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={currentPage === totalPages}
                        >
                            <FaChevronRight />
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default RecipeSearch;

import { createSlice } from "@reduxjs/toolkit";


const recipeSlice = createSlice({
    name: "recipes",
    initialState:{
        recipes: [],
    favorites: [],
    customRecipes: [],
    searchHistory:[]
    },
    reducers: 
    {
        setRecipes: (state, action) =>{
            state.recipes = action.payload
        },
        addFavorite: (state, action) => 
        {
            state.favorites.push(action.payload);

        },
        removeFavorite: (state, action) => 
        {
            state.favorites = state.favorites.filter((recipe)=> recipe.id!=action.payload.id)
        },
        addCustomRecipe: (state, action) => 
        {
            state.customRecipes.push(action.payload);
        },
        recentSearchHistory: (state,action) =>
        {
            if(!state.searchHistory.includes(action.payload))
            {
                state.searchHistory.push(action.payload);
            }
        },
        removeRecentSearchHistory: (state,action) =>
        {
            state.searchHistory = state.searchHistory.filter((history)=> history.id!=action.payload.id)
        }
    }
})

export const { setRecipes, addFavorite, removeFavorite, addCustomRecipe,recentSearchHistory,removeRecentSearchHistory } = recipeSlice.actions;

export default recipeSlice.reducer;
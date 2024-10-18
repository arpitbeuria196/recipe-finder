import { configureStore } from "@reduxjs/toolkit";
import  useReducer  from "./userSlice";
import recipesReducer from "./recipeSlice"

export const appStore = configureStore({
    reducer: 
    {
        user: useReducer,
        recipes: recipesReducer
    }
})
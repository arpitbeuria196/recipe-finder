import React from 'react'
import RecipeCard from './RecipeCard';
import { useSelector } from 'react-redux';

const CustomRecipeList = () => 
{
    const foodSelector = useSelector((state)=> state.recipes.favorites);

  return (
    <div>
      {
        foodSelector.map((food)=>(
           <RecipeCard/> 
        ))
      }
    </div>
  )
}

export default CustomRecipeList

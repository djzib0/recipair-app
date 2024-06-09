import { useEffect, useState } from "react";
// components import
import TopNavbar from "../components/topNavbar/TopNavbar";
import ShopListRecipeItem from "../components/shopListRecipeItem/ShopListRecipeItem";
// custom hooks import
import useDatabase from "../customHooks/useDatabase";
// react hook and zod imports
import { SubmitHandler, useForm} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// icons import
import { BiArrowBack } from "react-icons/bi"
// type imports
import { Recipe } from "../types/types";

  // array with object for topnavbar
  const topNavbarItems = [
    {
      id: 1,
      icon: <BiArrowBack />,
      linkTo: '/shoplist'
    }
  ]

export default function AddShopListForm() {

  // utilize useDatabase custom hook
  const {
    getRecipesData,
    fetchedData
  } = useDatabase();


  const [recipesData, setRecipesData] = useState<Recipe[]>([]);

  useEffect(() => {
    // fetching recipes data from DB
    getRecipesData();
  }, [])

  // set recipes data with the fetched data
  useEffect(() => {
    setRecipesData(fetchedData)
  }, [fetchedData])

  // create an array of recipes
  const recipes: Recipe[] = [];
  // create an array from object (firebase fetched data is an object)
  for (let [id, recipe] of Object.entries(recipesData)) {
    let recipeObj = recipe;
    Object.assign(recipeObj, {id: id})
    recipes.push(recipeObj)
  }
  const recipesArr = recipes && recipes.map((item, index) => {
    return (
      <div>item</div>
    )
  })

  return (
    <div>
      <TopNavbar 
        title="Add shop list"
        menuItems={topNavbarItems}
      />
      Here will be form for a new shop list
      {recipesArr}
    </div>
  )
}

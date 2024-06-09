// react router imports
import { Link } from "react-router-dom";
// components import
import TopNavbar from "../components/topNavbar/TopNavbar";
import RecipeListItem from "../components/recipeListItem/RecipeListItem";
// icons import
import { RiAddCircleFill } from "react-icons/ri";
// custom hooks imports
import useDatabase from '../customHooks/useDatabase'
import { useEffect, useState } from "react";
import { Recipe } from "../types/types";

export default function Recipes() {

  // utilize custom hook
  const {fetchedData, getRecipesData} = useDatabase();

  const [recipesData, setRecipesData] = useState([]);

  useEffect(() => {
    // fetching recipes data from DB
    getRecipesData();
  }, [])

  // set recipes data with the fetched data
  useEffect(() => {
    setRecipesData(fetchedData)
  }, [fetchedData])

  const topNavbarItems = [
    {
      id: 1,
      icon: <RiAddCircleFill />,
      linkTo: 'recipes/add'
    }
  ]

  // create an array of recipes
  const recipes: Recipe[] = [];
  for (let [id, recipe] of Object.entries(fetchedData)) {
    let recipeObj = recipe;
    Object.assign(recipeObj, {id: id})
    recipes.push(recipeObj)
  }
  const recipesArr = recipesData && recipes.map((item) => {
    return (
      <Link to={`/recipe/${item.id}`} key={item.id}>
        <RecipeListItem
          imgUrl={item.imgUrl}
          title={item.title}
          description={item.description}
          stepsNumber={item.steps?.length}
        />
      </Link>
    )
  })


  return (
    <div>
      <TopNavbar title="recipes" menuItems={topNavbarItems}/>
      <main className="content__container">
        {recipesArr}
      </main>
    </div>
  )
}

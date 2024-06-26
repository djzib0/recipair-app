// react router imports
import { Link } from "react-router-dom";
// components import
import TopNavbar from "../components/topNavbar/TopNavbar";
import RecipeListItem from "../components/recipeListItem/RecipeListItem";
// react form hook and zod imports
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
// icons import
import { RiAddCircleFill } from "react-icons/ri";
// custom hooks imports
import useDatabase from '../customHooks/useDatabase'
import { useEffect, useState } from "react";
import { Recipe } from "../types/types";

const schema = z.object({
  filterSearch: z.string()
});

type FormFields = z.infer<typeof schema>

export default function Recipes() {

  // destructuring useForm
  const {
    register,
  } = useForm<FormFields>(
    {defaultValues: {
      filterSearch: "",
    },
    resolver: zodResolver(schema)}
  )


  // utilize custom hook
  const {fetchedData, getRecipesData} = useDatabase();

  // state variables
  const [recipesData, setRecipesData] = useState([]);
  const [filterSearch, setFilterSearch] = useState<string>("");

  useEffect(() => {
    // fetching recipes data from DB
    getRecipesData();
  }, [])

  // set recipes data with the fetched data
  useEffect(() => {
    setRecipesData(fetchedData)
  }, [fetchedData, filterSearch])

  const topNavbarItems = [
    {
      id: 1,
      icon: <RiAddCircleFill />,
      linkTo: 'recipes/add'
    }
  ]

  const handleFilterChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFilterSearch(e.currentTarget.value)
  }

  // create an array of recipes
  const recipes: Recipe[] = [];
  for (let [id, recipe] of Object.entries(fetchedData)) {
    let recipeObj = recipe;
    Object.assign(recipeObj, {id: id})
    recipes.push(recipeObj)
  }

  const filteredRecipesArr = recipesData && recipes.filter((item) => {
    return item.title.toLowerCase().includes(filterSearch.toLowerCase());
  })

  const recipesArr = filteredRecipesArr && filteredRecipesArr.map((item) => {
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
      <form>
        <label htmlFor="recipeTitle">
          Filter:
        </label>
        <input {...register("filterSearch", {onChange: handleFilterChange})}
          type="text"
          id="recipeTitle"
          />
      </form>
        {recipesArr}
      </main>
    </div>
  )
}

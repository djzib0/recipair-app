// components import
import TopNavbar from "../components/topNavbar/TopNavbar"
// icons import
import { BiArrowBack } from "react-icons/bi"
// react router imports
import { useParams } from "react-router-dom"
// custom hooks import
import useDatabase from "../customHooks/useDatabase"
import { useEffect, useState } from "react"
// types import
import { Recipe } from "../types/types"

type RecipeDetailsProps = {
  id: string;
}

// array with object for topnavbar
const topNavbarItems = [
  {
    id: 1,
    icon: <BiArrowBack />,
    linkTo: '/'
  }
]


export default function RecipeDetails() {

  // utilize useParams
  const params = useParams();
  const { id } = params;


  // utilize useDatabase
  const { getRecipeData, fetchedData } = useDatabase();

  // state variables
  const [recipeData, setRecipeData] = useState<Recipe[]>();


  useEffect(() => {
    getRecipeData(id)
  }, [])

  useEffect(() => {
    setRecipeData(fetchedData)
  }, [fetchedData])

  console.log(recipeData)  

  return (
    <main>
      <TopNavbar title="Details" menuItems={topNavbarItems} />
    </main>
  )
}

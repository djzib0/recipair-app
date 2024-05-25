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
// styles import
import './RecipeDetails.css'

type RecipeDetailsProps = {
  id: string;
  title: string;
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
  const { getRecipeData, recipeFetchedData } = useDatabase();

  // state variables
  const [recipeData, setRecipeData] = useState<Recipe>();
  

  useEffect(() => {
    getRecipeData(id)
  }, [])

  useEffect(() => {
    setRecipeData(recipeFetchedData)
  }, [recipeFetchedData])

  console.log(recipeData, " recipe data")  

  return (
    <main>
      <TopNavbar title="Details" menuItems={topNavbarItems} />
      <div className="content__container">
        <div className="recipe-details__container">
          <header className="recipe__title">
            {recipeData?.title}
          </header>
          <img src={recipeData?.imgUrl}
            className="recipe-details-image__container"
          />
        </div>
      </div>
    </main>
  )
}

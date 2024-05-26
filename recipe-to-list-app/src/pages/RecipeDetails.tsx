// components import
import TopNavbar from "../components/topNavbar/TopNavbar";
import RecipeIngredientContainer from "../components/recipeIngredientContainer/RecipeIngredientContainer";
import RecipeStepContainer from "../components/recipeStepContainer/RecipeStepContainer";
import RecipeTitleFormModal from "../components/recipeTitleFormModal/RecipeTitleFormModal";
// icons import
import { BiArrowBack } from "react-icons/bi"
// react router imports
import { useParams } from "react-router-dom"
// custom hooks import
import useModal from "../customHooks/useModal";
import useDatabase from "../customHooks/useDatabase";
import { useEffect, useState } from "react";
// types import
import { Recipe, CookingStep, Ingredient} from "../types/types"
// styles import
import './RecipeDetails.css'
// utils import
import { addPeriodSuffix } from "../utils/firstLetterToUpperCase"

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
  const { getRecipeData, recipeFetchedData, editRecipe} = useDatabase();

  // utilize useModal custom hook
  const { 
    isTitleModalOn,
    toggleTitleModal,
  } = useModal();

  // state variables
  const [recipeData, setRecipeData] = useState<Recipe>({
    title: "",
    description: "",
    imgUrl: "",
    steps: [],
    ingredients: []
  });

  const [isRecipeEdited, setisRecipeEdited] = useState<boolean>(false)
  const [refreshPage, setRefreshPage] = useState<boolean>(true);
  

  useEffect(() => {
    if (!isRecipeEdited) {
      getRecipeData(id)
    } 
  }, [isRecipeEdited, refreshPage])

  useEffect(() => {
    if (recipeFetchedData) {
      setRecipeData(recipeFetchedData)
    }
  }, [recipeFetchedData])

  // functions
  const removeStep = (index: number): void => {
    // define new array for cooking steps 
    const newArr: CookingStep[] | undefined = recipeData?.steps;
    // remove the step by given index
    newArr?.splice(index, 1)
    // set new array as a recipe property - steps
    setRecipeData(prevState => {
      return {
        ...prevState,
        steps: newArr
      }
    })
  }

  const removeIngredient = (index: number): void => {
    // define new array for ingredients
    const newArr: Ingredient[] | undefined = recipeData.ingredients;
    // remoe the ingredient by given index
    newArr?.splice(index, 1)
    // set new array as a recipe property - ingredients
    setRecipeData(prevState => {
      return {
        ...prevState,
        ingredients: newArr
      }
    })
    setisRecipeEdited(true);
    setRefreshPage(prevState => !prevState);
  }

  const changeStepPosition = (index: number, changeUp: boolean) => {
    let newArr: CookingStep[] | undefined = recipeData.steps;
    // switch position with lower index (move up on the displayed list)
    if (newArr && changeUp) {
      // switch position with lower index (move up on the displayed list)
      [newArr[index], newArr[index - 1]] = [newArr[index -1], newArr[index]]
    } else if (newArr && !changeUp) {
      // switch position with higher index (move donw on the displayed list)
      [newArr[index], newArr[index + 1]] = [newArr[index +1], newArr[index]]
    }
    // set new array as a recipe property - steps
    setRecipeData(prevState => {
      return {
        ...prevState,
        steps: newArr
      }
    })
    setisRecipeEdited(true);
    setRefreshPage(prevState => !prevState);
  }

  // 
  const redoChanges = () => {
    setisRecipeEdited(false);
    console.log("redoing...")
    setRefreshPage(prevState => !prevState)
  }

  const toggleChange = (bool: boolean) => {
    setisRecipeEdited(bool)
  }

  const addNewTitle = (newTitle: string) => {
    setRecipeData(prevState => {
      return {
        ...prevState,
        title: newTitle
      }
    })
  }

  // create steps array
  const stepsArr: JSX.Element[] | undefined = recipeData?.steps?.map((item, index) => {
    const maxIndex = recipeData.steps?.length;
    return (
      <div key={index}>
        <RecipeStepContainer
          index={index}
          description={item.description}
          maxIndex={maxIndex}
          removeStep={() => removeStep(index)}
          changeStepPosition={changeStepPosition}
        />
      </div>
    )
  })

  // create ingredients array
  const ingredientsArr: JSX.Element[] | undefined = recipeData?.ingredients?.map((item, index) => {
    return (
      <div key={index}>
        <RecipeIngredientContainer
          index={index}
          name={item.name}
          quantity={item.quantity}
          unit={item.unit}
          removeIngredient={removeIngredient}
        />
      </div>
    )
  })

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

          <section className="recipe-details-description__container">
            {addPeriodSuffix(recipeData?.description)}
          </section>

          <div className="recipe-details-steps__container">
            <h4>Steps</h4>
              {stepsArr}
          </div>

          <div className="recipe-details-ingredients__container">
            <h4>Ingredients</h4>
            {ingredientsArr}
          </div>
          {isRecipeEdited && <button onClick={redoChanges}>Redo</button>}
          {isRecipeEdited && <button onClick={() => editRecipe(recipeData, id)}>Save changes</button>}
          <button onClick={() => toggleTitleModal(true)}>Edit title</button>
        </div>
      </div>

      {isTitleModalOn && 
        <RecipeTitleFormModal
          classTitle={isTitleModalOn ? "sliding-modal--bottom": "sliding-modal--bottom--disabled"}
          addTitle={addNewTitle}
          closeModal={() => toggleTitleModal(false)}
          toggleIsChanged={(bool) => toggleChange(bool)}
          refreshPage={() => setRefreshPage}
          isOn={isTitleModalOn}
          defaultValue={recipeData.title}
        />
      }
    </main>
  )
}

// components import
import TopNavbar from "../components/topNavbar/TopNavbar";
import RecipeIngredientContainer from "../components/recipeIngredientContainer/RecipeIngredientContainer";
import RecipeStepContainer from "../components/recipeStepContainer/RecipeStepContainer";
import RecipeTitleFormModal from "../components/recipeTitleFormModal/RecipeTitleFormModal";
import StepFormModal from "../components/stepFormModal/StepFormModal";
import IngredientFormModal from "../components/ingredientFormModal/IngredientFormModal";
import ImgUrlFormModal from "../components/imgUrlFormModal/ImgUrlFormModal";
// icons import
import { BiArrowBack } from "react-icons/bi"
// react router imports
import { useParams } from "react-router-dom"
// custom hooks import
import useModal from "../customHooks/useModal";
import useDatabase from "../customHooks/useDatabase";
import { useEffect, useState } from "react";
// types import
import { Recipe, CookingStep, Ingredient} from "../types/types";
// styles import
import './RecipeDetails.css';
// utils import
import { addPeriodSuffix } from "../utils/firstLetterToUpperCase";
// images import
import editIcon from '../../images/icons/edit.png';


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
  const {
    getRecipeData, 
    recipeFetchedData, 
    editRecipe,
  } = useDatabase();

  // utilize useModal custom hook
  const { 
    isTitleModalOn,
    toggleTitleModal,
    isEditStepModalOn,
    toggleAddStepModal,
    isAddStepModalOn,
    toggleEditStepModal,
    editedStep,
    editedIndex,
    editedIngredient,
    isIngredientModalOn,
    toggleIngredientModal,
    isImgUrlModalOn,
    toggleImgUrlModalOn
  } = useModal();

  // state variables
  const [recipeData, setRecipeData] = useState<Recipe>({
    title: "",
    description: "",
    imgUrl: "",
    steps: [],
    ingredients: []
  });
  const [steps, setSteps] = useState<CookingStep[] | undefined>([]);
  const [ingredients, setIngredients] = useState<Ingredient[] | undefined>([]);
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
      setSteps(recipeFetchedData.steps ? recipeFetchedData.steps : [])
      setIngredients(recipeFetchedData.ingredients)
    }
  }, [recipeFetchedData])


  // functions
  const addStep = (stepDescription: string) => {
    let newArr : CookingStep[] | undefined = steps ? steps :[] ;
    console.log(newArr, " new Arr")
    newArr = steps && steps.concat(
      {
        description: stepDescription
      }
    )
    setSteps(newArr)
    setRecipeData(prevState => {
      return {
        ...prevState,
        steps: newArr
      }
    })
    toggleAddStepModal(false);
    setisRecipeEdited(true);
    setRefreshPage(prevState => !prevState);
  }

  console.log(steps)

  const editStep = (editedCookingStepIndex: number | undefined, newDescription: string) => {
    const newArr: CookingStep[] | undefined = steps;
    console.log(newArr, " steps")
    if (editedCookingStepIndex != undefined && newArr) {
      let editedItem: CookingStep | undefined = newArr && newArr[editedCookingStepIndex]
      editedItem = {...editedItem, description: newDescription}
      newArr[editedCookingStepIndex] = editedItem;
      setSteps(newArr)
      setisRecipeEdited(true);
    }
  }

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

  const editIngredient = (editedIngredientIndex: number | undefined, newIngredient : Ingredient) => {
    const newArr: Ingredient[] | undefined = ingredients;

    if (editedIngredientIndex != undefined && newArr) {
      let editedItem: Ingredient | undefined = newArr && newArr[editedIngredientIndex]
      editedItem = {...editedItem, 
        name: newIngredient.name,
        quantity: newIngredient.quantity,
        unit: newIngredient.unit,
        ingredientType: newIngredient.ingredientType
      }
      newArr[editedIngredientIndex] = editedItem;
      setIngredients(newArr)
      setisRecipeEdited(true);
    } 
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

  const addImageUrl = (imgUrl: string) => {
    setRecipeData(prevState => {
      return {
        ...prevState,
        imgUrl: imgUrl
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
          toggleModal={() => toggleEditStepModal(true, index, item.description)}
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
          toggleModal={() => toggleIngredientModal(true, index, item)}
        />
      </div>
    )
  })

  return (
    <main>
      <TopNavbar title="Details" menuItems={topNavbarItems} />
      <div className="content__container">
        <div className="recipe-details__container">
          <div className="recipe__title">
            <header>
              {recipeData?.title}
            </header>
            <button 
              onClick={() => toggleTitleModal(true)}
              className='recipe-list-item__btn'
              >
              <img src={editIcon} />
            </button>
          </div>
          <div className="recipe-details-image__container">
            <img 
              src={recipeData?.imgUrl}
              className="recipe__img"
              />
            <button 
              className="edit-image__icon"
              onClick={() => toggleImgUrlModalOn(true)}
            >
              <img 
                src={editIcon}
              />
            </button>
          </div>


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
          {isRecipeEdited && <button onClick={() => (editRecipe(recipeData, id), setisRecipeEdited(false))}>Save changes</button>}
          <button onClick={() => toggleAddStepModal(true)}>open step modal</button>
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
      {isImgUrlModalOn && 
        <ImgUrlFormModal 
          classTitle={isImgUrlModalOn ? "sliding-modal--bottom": "sliding-modal--bottom--disabled"}
          editImgUrl={addImageUrl}
          closeModal={() => toggleImgUrlModalOn(false)}
          isOn={isImgUrlModalOn}
          defaultValue={recipeData.imgUrl}
          toggleIsChanged={(bool) => toggleChange(bool)}
          refreshPage={() => setRefreshPage}
        />
      }
      {isEditStepModalOn && 
        <StepFormModal
          classTitle={isEditStepModalOn ? "sliding-modal--bottom": "sliding-modal--bottom--disabled"}
          editStep={editStep}
          closeModal={() => toggleEditStepModal(false)}
          isOn={isEditStepModalOn}
          defaultValue={editedStep}
          editedIndex={editedIndex}
        />
      }
      {isAddStepModalOn && 
        <StepFormModal
          classTitle={isAddStepModalOn ? "sliding-modal--bottom": "sliding-modal--bottom--disabled"}
          addStep={addStep}
          closeModal={() => toggleAddStepModal(false)}
          isOn={isAddStepModalOn}
          editedIndex={editedIndex}
        />
      }
      {isIngredientModalOn && <IngredientFormModal 
        classTitle={isIngredientModalOn ? "sliding-modal--bottom": "sliding-modal--bottom--disabled"}
        isOn={isIngredientModalOn}
        editIngredient={editIngredient}
        defaultValue={editedIngredient}
        closeModal={() => toggleIngredientModal(false)}
        editedIndex={editedIndex}
      />}
    </main>
  )
}

import { useEffect, useState } from "react";
// react router imports
import { useNavigate } from "react-router-dom";
// components import
import TopNavbar from "../components/topNavbar/TopNavbar";
import InfoModal from "../components/infoModal/InfoModal";
// custom hooks import
import useModal from "../customHooks/useModal";
import useDatabase from "../customHooks/useDatabase"
// react hook and zod imports
import { SubmitHandler, useForm} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// types and enums import
import { CookingStep, Recipe, Ingredient } from "../types/types";
// icons import
import { BiArrowBack } from "react-icons/bi";
import StepFormModal from "../components/stepFormModal/StepFormModal";
import RecipeStepContainer from "../components/recipeStepContainer/RecipeStepContainer";
import IngredientFormModal from "../components/ingredientFormModal/IngredientFormModal";
import RecipeIngredientContainer from "../components/recipeIngredientContainer/RecipeIngredientContainer";
// styles import
import './AddRecipeForm.css'
// images import
import noPhotoImg from '../../images/nophoto.jpg'
import ImgUrlFormModal from "../components/imgUrlFormModal/ImgUrlFormModal";

const schema = z.object({
  title: z.string().min(1, {message: "must contain at least 1 character"}),
  description: z.string().min(1, {message: "must contain at least 1 character"})
})

type FormFields = z.infer<typeof schema>

export default function AddRecipeForm() {

  // utilize react router
  const navigate = useNavigate();


  // destructuring useForm
  const { 
    register,
    handleSubmit,
    formState: {errors},
   } = useForm<FormFields>(
    {resolver: zodResolver(schema)}
   );

  const { addRecipe } = useDatabase();

  // utilize useModal custom hook
  const { 
    isModalMenuOn,
    toggleModalMenu,
    isEditStepModalOn,
    toggleAddStepModal,
    isAddStepModalOn,
    toggleAddIngredientModal,
    isAddIngredientModalOn,
    toggleEditIngredientModal,
    isEditIngredientModalOn,
    isImgUrlModalOn,
    toggleImgUrlModalOn,
    isInfoModalOn,
    toggleInfoModal
  } = useModal();

  // state variables
  const [newRecipe, setNewRecipe] = useState<Recipe>(
    {
      title: "",
      description: "",
      imgUrl: "",
      steps: [],
      ingredients: []
    }
  )
  const [steps, setSteps] = useState<CookingStep[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [refreshPage, setRefreshPage] = useState(true);
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);
  const [errorsData, setErrorsData] = useState(errors);

  useEffect(() => {
    setErrorsData(errors);
    if (Object.keys(errors).length > 0) {
      toggleInfoModal(true);
    } else if (Object.keys(errors).length > 0) {
      toggleInfoModal(false);
    }
  }, [refreshPage, errors] )


  // array with object for topnavbar
  const topNavbarItems = [
    {
      id: 1,
      icon: <BiArrowBack />,
      linkTo: '/'
    }
  ]

  // functions
  const onSubmit: SubmitHandler<FormFields> = (data) => {
    addRecipe({
      title: data.title,
      description: data.description,
      imgUrl: newRecipe.imgUrl,
      steps: newRecipe.steps,
      ingredients: newRecipe.ingredients
    })
    navigate('../')
  }

  const onImageError = (e: any) => {
    e.target.onError = null;
    e.target.src = "../../images/placeholderImg.jpg"
  }

  const addStep = (stepDescription: string) => {
    const newArr: CookingStep[] = steps.concat(
      {
        description: stepDescription
      }
    )
    setSteps(newArr)
    setNewRecipe(prevState => {
      return {
        ...prevState,
        steps: newArr
      }
    })
    toggleAddStepModal(false)
    setRefreshPage(prevState => !prevState)
  }

  const addIngredient = (newIngredient: Ingredient) => {
    const newArr: Ingredient[] = ingredients.concat(newIngredient)
    setIngredients(newArr);
    setNewRecipe(prevState => {
      return {
        ...prevState,
        ingredients: newArr
      }
    })
    toggleEditIngredientModal(false)
    setRefreshPage(prevState => !prevState)
  }

  const addImageUrl = (imgUrl: string) => {
    setNewRecipe(prevState => {
      return {
        ...prevState,
        imgUrl: imgUrl
      }
    })
  }

  const changeStepPosition = (index: number, changeUp: boolean) => {
    let newArr: CookingStep[] | undefined = newRecipe.steps;
    // switch position with lower index (move up on the displayed list)
    if (newArr && changeUp) {
      // switch position with lower index (move up on the displayed list)
      [newArr[index], newArr[index - 1]] = [newArr[index -1], newArr[index]]
    } else if (newArr && !changeUp) {
      // switch position with higher index (move donw on the displayed list)
      [newArr[index], newArr[index + 1]] = [newArr[index +1], newArr[index]]
    }
    // set new array as a recipe property - steps
    setNewRecipe(prevState => {
      return {
        ...prevState,
        steps: newArr
      }
    })
    setRefreshPage(prevState => !prevState)
  }

  const removeStep = (index: number) => {
    // define new array for cooking steps 
    const newArr: CookingStep[] | undefined = newRecipe.steps;
    // remove the step by given index
    newArr?.splice(index, 1)
    // set new array as a recipe property - steps
    setNewRecipe(prevState => {
      return {
        ...prevState,
        steps: newArr
      }
    })
    setRefreshPage(prevState => !prevState)
  }

  const removeIngredient = (index: number): void => {
    // define new array for ingredients
    const newArr: Ingredient[] | undefined = newRecipe.ingredients;
    // remoe the ingredient by given index
    newArr?.splice(index, 1)
    // set new array as a recipe property - ingredients
    setNewRecipe(prevState => {
      return {
        ...prevState,
        ingredients: newArr
      }
    })
    setRefreshPage(prevState => !prevState);
  }

  // create a map of step components 
  const stepsArr: JSX.Element[] | undefined = newRecipe.steps?.map((item, index) => {
    const maxIndex = newRecipe.steps?.length;
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

  // create a map of ingredients components
  const ingredientsArr: JSX.Element[] | undefined = newRecipe.ingredients?.map((item, index) => {
    return (
      <div key={index}>
        <RecipeIngredientContainer
          index={index}
          name={item.name}
          quantity={item.quantity}
          unit={item.unit}
          removeIngredient={removeIngredient}
          ingredientType={item.ingredientType}
        />
      </div>
    )
  })

  return (
    <main>
      <TopNavbar title="Add recipe" menuItems={topNavbarItems}  />
      <div className="content__container">

        <button 
          className="recipe__img__btn"
          onClick={() => toggleImgUrlModalOn(true)}
        >
          {newRecipe.imgUrl.length === 0 ?
          <img src={noPhotoImg} className="recipe__img"/> :
          <img src={newRecipe.imgUrl} 
            className="recipe__img" 
            onError={onImageError} />
          }
          
        </button>

        <form onSubmit={handleSubmit(onSubmit)}>
          <label 
            htmlFor="recipe_title"
            className="modal__form__label"
          >
            {errors.title ? `${errors.title.message}` : "Title"}
          </label>
          <textarea 
            {...register("title")}
            id="recipe_title"
            placeholder="Your title here..."
          />
          <label 
            htmlFor="recipe_description"
            className="modal__form__label"
          >
            {errors.description ? `${errors.description.message}` : "Description"}
          </label>
          <textarea 
            {...register("description")}
            id="recipe_description"
            placeholder="Your description here..."
          />
        
          <button 
            disabled={isEditStepModalOn || isEditIngredientModalOn} 
            type="submit"
            className="confirm__btn"
          >
            ADD RECIPE
          </button>

        </form>

        {stepsArr && stepsArr?.length > 0 && 
          <h4 className="recipe-form__header">
            STEPS
          </h4>}
        {stepsArr}

        {ingredientsArr && ingredientsArr.length > 0 && 
        <h4 className="recipe-form__header">
          INGREDIENTS
        </h4>}
        {ingredientsArr}
      </div>
      
      <div className="cta-btn__container">
        <button 
          className="toggle-modal-menu__btn"
          onClick={() => toggleModalMenu(isModalMenuOn === true ? false : true)}
          >
          +
        </button>
      </div>

      {isModalMenuOn && 
      <div className="modal-menu__container">
        <button 
          onClick={() => toggleAddStepModal(true)}
          className="modal-cta__btn"
        >
          + step
        </button>
        <button 
          onClick={() => toggleAddIngredientModal(true)}
          className="modal-cta__btn"
        >
          + ingredient
        </button>
      </div>}

      <StepFormModal 
        classTitle={isAddStepModalOn ? "sliding-modal--bottom": "sliding-modal--bottom--disabled"}
        addStep={addStep}
        closeModal={() => toggleAddStepModal(false)}
        isOn={isAddStepModalOn}
      />
      <IngredientFormModal
        classTitle={isAddIngredientModalOn ? "sliding-modal--bottom": "sliding-modal--bottom--disabled"}
        addIngredient={addIngredient}
        closeModal={() => toggleAddIngredientModal(false)}
        isOn={isAddIngredientModalOn}
      /> 
      <ImgUrlFormModal 
        classTitle={isImgUrlModalOn ? "sliding-modal--bottom": "sliding-modal--bottom--disabled"}
        addImgUrl={addImageUrl}
        closeModal={() => toggleImgUrlModalOn(false)}
        isOn={isImgUrlModalOn}
      />
      {isInfoModalOn && 
            <InfoModal
            isError={true}
            errors={errors}
            closeModal={() => toggleInfoModal(false)}
          />}
    </main>
  )
}

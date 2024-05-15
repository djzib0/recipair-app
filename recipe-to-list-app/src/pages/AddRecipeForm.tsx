// components import
import TopNavbar from "../components/topNavbar/TopNavbar";
// custom hooks import
import { useState } from "react";
// import useDatabase from "../customHooks/useDatabase"
// react hook and zod imports
import { SubmitHandler, useForm} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// types import
import { CookingStep, Recipe, Ingredient } from "../types/types";
import { Unit } from "../enums/enums";
// icons import
import { BiArrowBack } from "react-icons/bi";
import StepFormModal from "../components/stepFormModal/StepFormModal";

const schema = z.object({
  title: z.string(),
  description: z.string()
})

type FormFields = z.infer<typeof schema>

export default function AddRecipeForm() {

  // destructurize useForm
  const { 
    register,
    handleSubmit,
   } = useForm<FormFields>(
    {resolver: zodResolver(schema)}
   );

  // const { addRecipe } = useDatabase();

  const [newRecipe, setNewRecipe] = useState<Recipe>(
    {
      title: "Pyzy z gnojem",
      description: "Tasty pyzy z gnojem",
      steps: [],
      ingredients: []
    }
  )

  // state variables
  const [steps, setSteps] = useState<CookingStep[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [showCookingStepForm, setShowCookingStepForm] = useState<boolean>(false);

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
    console.log(data)
  }

  const handleClick = () => {
    // addRecipe(newRecipe)
    console.log("the button has been clicked")
    addStep()
  }

  console.log(newRecipe)

  const addStep= () => {
    const newArr: CookingStep[] = steps.concat(
      {
        description: "test"}
    )
    setShowCookingStepForm(true)

    setSteps(newArr)
    setNewRecipe(prevState => {
      return {
        ...prevState,
        steps: steps
      }
    })
  }

  const closeShowCookingStepForm = () => {
    setShowCookingStepForm(false);
    console.log("closing step modal")
  }

  const addIngredient = () => {
    const newArr: Ingredient[] = ingredients.concat(
      {
        name: "carrot",
        quantity: 0.5,
        unit: Unit.Kilogram
      }
    )

    setIngredients(newArr);
    setNewRecipe(prevState => {
      return {
        ...prevState,
        ingredients: ingredients
      }
    })
  }

  return (
    <main>
      <TopNavbar title="Add recipe" menuItems={topNavbarItems}  />
      <div className="content__container">
        <button onClick={addStep}>Add step</button>
        <button onClick={addIngredient}>Add ingredient</button>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="recipe_title">Title</label>
          <textarea 
            {...register("title")}
            id="recipe_title"
          />
          <label htmlFor="recipe_description">Description</label>
          <textarea 
            {...register("description")}
            // type="text"
            id="recipe_description"
          />
          <button 
            disabled={showCookingStepForm} 
            type="submit"
            className="confirm__btn"
          >
            ADD RECIPE
          </button>
        </form>
          
      </div>
      <StepFormModal 
        classTitle={showCookingStepForm ? "sliding-modal--bottom": "sliding-modal--bottom--disabled"}
        handleFunction={handleClick}
        closeModal={closeShowCookingStepForm}
      />
    </main>
  )
}

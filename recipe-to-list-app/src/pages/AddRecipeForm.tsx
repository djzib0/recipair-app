// components import
import TopNavbar from "../components/topNavbar/TopNavbar";
// custom hooks import
import { useState } from "react";
import useDatabase from "../customHooks/useDatabase"
// react hook and zod imports
import { useForm } from "react-hook-form";
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
  const { register } = useForm<FormFields>();

  const { addRecipe } = useDatabase();

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


  const handleClick = () => {
    addRecipe(newRecipe)
  }

  function addStep() {
    // const newArr: CookingStep[] = steps.concat(
    //   {
    //     stepNumber: 1,
    //     description: "test"}
    // )
    setShowCookingStepForm(prevState => !prevState)

    // setSteps(newArr)
    // setNewRecipe(prevState => {
    //   return {
    //     ...prevState,
    //     steps: steps
    //   }
    // })
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
    <div>
      <TopNavbar title="Add recipe" menuItems={topNavbarItems}  />
      AddRecipe
      <button onClick={handleClick}>Press me</button>
      <button onClick={addStep}>Add step</button>
      <button onClick={addIngredient}>Add ingredient</button>
      <StepFormModal classTitle=
        {showCookingStepForm ? "sliding-modal--bottom": "sliding-modal--bottom--disabled"}
         />
    </div>
  )
}

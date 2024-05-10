// custom hooks import
import { useState } from "react";
import useDatabase from "../customHooks/useDatabase"
// types import
import { CookingStep, Recipe, Ingredient } from "../types/types";

export default function AddRecipeForm() {

  const { addRecipe } = useDatabase();

  const [newRecipe, setNewRecipe] = useState<Recipe>(
    {
      title: "Pyzy z gnojem",
      description: "Tasty pyzy z gnojem",
      step: [],
      ingredients: []
    }
  )

  const [steps, setSteps] = useState<CookingStep[]>([{
    stepNumber: 0,
    description: "1"
  }])

  const handleClick = () => {
    addRecipe(newRecipe)
  }

  function addStep() {
    const newArr: CookingStep[] = steps.concat({stepNumber: 1, description: "test"})
    setSteps(newArr)
    setNewRecipe(prevState => {
      return {
        ...prevState,
        step: steps
      }
    })
    }

  return (
    <div>
      AddRecipe
      <button onClick={handleClick}>Press me</button>
      <button onClick={addStep}>Add step</button>
    </div>
  )
}

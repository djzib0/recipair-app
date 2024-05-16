import { useEffect, useState } from "react";
// components import
import TopNavbar from "../components/topNavbar/TopNavbar";
// custom hooks import
import useModal from "../customHooks/useModal";
import useDatabase from "../customHooks/useDatabase"
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

  const { addRecipe } = useDatabase();

  // utilize useForm custom hook
  const { isModalOn, toggleModal} = useModal();

  // state variables
  const [newRecipe, setNewRecipe] = useState<Recipe>(
    {
      title: "",
      description: "",
      steps: [],
      ingredients: []
    }
  )
  const [steps, setSteps] = useState<CookingStep[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [refreshPage, setRefreshPage] = useState(true);

  useEffect(() => {
  }, [refreshPage] )


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
      steps: newRecipe.steps,
      ingredients: newRecipe.ingredients
    })
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
    toggleModal(false)
    setRefreshPage(prevState => !prevState)
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
    // define new variable for cooking steps 
    const newArr: CookingStep[] | undefined = newRecipe.steps
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

  const stepsArr: JSX.Element[] | undefined = newRecipe.steps?.map((item, index) => {
    const maxIndex = newRecipe.steps?.length;
    return (
      <div key={index}>
        {`${index + 1}. ${item.description}`}
        <button type="button" onClick={() => removeStep(index)}>Remove</button>
        {index > 0 && <button onClick={() => changeStepPosition(index, true)}>UP</button>}
        {maxIndex && index < maxIndex  && <button onClick={() => changeStepPosition(index, false)}>DOWN</button>}
      </div>
    )
  })

  return (
    <main>
      <TopNavbar title="Add recipe" menuItems={topNavbarItems}  />
      <div className="content__container">
        <button onClick={() => toggleModal(true)}>Add step</button>
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
            id="recipe_description"
          />
          <button 
            disabled={isModalOn} 
            type="submit"
            className="confirm__btn"
          >
            ADD RECIPE
          </button>
        </form>
        {stepsArr}
      </div>
      <StepFormModal 
        classTitle={isModalOn ? "sliding-modal--bottom": "sliding-modal--bottom--disabled"}
        addStep={addStep}
        closeModal={() => toggleModal(false)}
        isOn={isModalOn}
      />
    </main>
  )
}

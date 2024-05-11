// custom hooks import
import { useState } from "react";
import useDatabase from "../customHooks/useDatabase"
// react hook import
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// types import
import { CookingStep, Recipe, Ingredient } from "../types/types";
import { Unit } from "../enums/enums";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

type FormFields = z.infer<typeof schema>;

// type FormFields = {
//   email: string;
//   password: string;
// }

export default function AddRecipeForm() {

  const { 
    register, 
    handleSubmit,
    setError,
    formState: {errors, isSubmitting} } = useForm<FormFields>(
      {defaultValues: {
        email: "test@email.com"
      },
      resolver: zodResolver(schema)
    });
  
  const { addRecipe } = useDatabase();

  const [newRecipe, setNewRecipe] = useState<Recipe>(
    {
      title: "Pyzy z gnojem",
      description: "Tasty pyzy z gnojem",
      steps: [],
      ingredients: []
    }
  )

  const [steps, setSteps] = useState<CookingStep[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);


  const handleClick = () => {
    addRecipe(newRecipe)
  }

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      throw new Error();
    } catch (error) {
      setError("email", {
        message: "This email is already taken"
      })
    }
    console.log(data)
  }

  function addStep() {
    const newArr: CookingStep[] = steps.concat(
      {
        stepNumber: 1,
        description: "test"}
    )

    setSteps(newArr)
    setNewRecipe(prevState => {
      return {
        ...prevState,
        steps: steps
      }
    })
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
      AddRecipe
      <button onClick={handleClick}>Press me</button>
      <button onClick={addStep}>Add step</button>
      <button onClick={addIngredient}>Add ingredient</button>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("email")} type="text" />
          {errors.email && <p>{errors.email.message}</p>}
        <input {...register("password")} type="text" />
          {errors.password && <p>{errors.password.message}</p>}
        <button disabled={isSubmitting}  type="submit">
          {isSubmitting ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  )
}

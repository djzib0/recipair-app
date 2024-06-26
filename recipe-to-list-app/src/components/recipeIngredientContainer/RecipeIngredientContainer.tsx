import { useEffect, useState } from 'react';
// custom hooks import
import useDatabase from '../../customHooks/useDatabase';
// enums import
import { Unit } from '../../enums/enums';
// types import
import { Recipe } from '../../types/types';
// styles import
import './RecipeIngredientContainer.css'
// icons import
import { PiTrashLight } from 'react-icons/pi';
import { CiEdit } from 'react-icons/ci';
import { FaRegCircle } from "react-icons/fa";
import { FaRegCircleCheck } from "react-icons/fa6";
// import { FaRegCircleQuestion } from "react-icons/fa6";
import { ImInfo } from "react-icons/im";
// utils import
import { firstLetterToUpperCase } from '../../utils/utils';
import ShopListDetailsRecipeTitle from '../shopListDetailsRecipeTitle/ShopListDetailsRecipeTitle';


type RecipeIngredientContainerProps = {
  index: number;
  name: string;
  quantity: number;
  unit: Unit;
  removeIngredient?: (index: number) => void;
  toggleModal?: () => void;
  toggleShowIngredientRecipes?: (arr: (string | undefined)[] | undefined) => void;
  toggleIsPurchased? : () => void;
  isPurchased?: boolean;
  recipeIds?: (string | undefined)[];
}

export default function RecipeIngredientContainer(props: RecipeIngredientContainerProps) {

  // utilizing use database custom hook
  const {
    fetchedData,
    getRecipesData
  } = useDatabase();

  // destructuring props
  const { index, name, quantity, unit, removeIngredient,
    toggleModal, toggleIsPurchased, recipeIds,
    isPurchased } = props;

  // state variables
  const [showIngredientRecipes, setIsShowIngredientRecipes] = useState(false);
  const [recipesData, setRecipesData] = useState<Recipe[]>([])

  useEffect(() => {
    if (showIngredientRecipes) {
      getRecipesData()
    }
  }, [showIngredientRecipes])

  useEffect(() => {
    // create an array of recipes
    const recipes: Recipe[] = [];
    // create an array from object (firebase fetched data is an object)
    for (let [id, recipe] of Object.entries(fetchedData)) {
      let recipeObj = recipe;
      Object.assign(recipeObj, {id: id})
      recipes.push(recipeObj)
    }

    // set recipes as a state variable
    setRecipesData(recipes)
  }, [fetchedData])

  const toggleShowIngredientRecipes = () => {
    setIsShowIngredientRecipes(prevState => !prevState)
  }

  const recipeIdsArr = recipeIds && recipeIds?.map(item => {
    let recipe = recipesData?.find(recipe => recipe.id === item )
    return (
    <ShopListDetailsRecipeTitle 
      title={recipe?.title}
      linkTo={`../recipe/${recipe?.id}`}
      />
  )
  })

  return (
    <div>
      <div className='recipe-ingredient__container'>
        <div className='ingredient-number__container'>
          {index + 1}.
        </div>
        <div className='ingredient-description__container'>
          <div className='ingredient-description'>
            {`${firstLetterToUpperCase(name)}`}
          </div>
          <div className='qty-unit__container'>
            <div>{quantity}</div>
            <div>{unit}</div>
          </div>
        </div>
        <div className='ingredient-cta__container'>
          <div className='ingredient-cta--delete'>
          {toggleModal && <button 
            className='cta__btn--small' 
            type="button"
            onClick={toggleModal}
          >
            <CiEdit />
          </button>}
          {removeIngredient && <button 
            className='cta__btn--small' 
            type="button"
            onClick={() => removeIngredient(index)}
          >
            <PiTrashLight />
          </button>}
          {recipeIds && <button 
            className='cta__btn--small' 
            type="button"
            onClick={() => toggleShowIngredientRecipes()}
          >
            {/* <FaRegCircleQuestion className='icon--light--blue' /> */}
            <ImInfo className='icon--light--blue' />
          </button>}
          {toggleIsPurchased && <button 
            className='cta__btn--small' 
            type="button"
            onClick={toggleIsPurchased}
          >
            {isPurchased ? <FaRegCircleCheck className='icon--green'/> : <FaRegCircle />}
          </button>}
          </div>
        </div>
      </div>
      {showIngredientRecipes && recipeIdsArr}
    </div>
  )
}

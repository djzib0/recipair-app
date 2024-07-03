import { useEffect, useState } from 'react';
// custom hooks import
import useDatabase from '../../customHooks/useDatabase';
// enums import
import { IngredientType, Unit } from '../../enums/enums';
// types import
import { Recipe } from '../../types/types';
// styles import
import './RecipeIngredientContainer.css'
// utils import
import { firstLetterToUpperCase, setTypeIcon } from '../../utils/utils';
// components import
import ShopListDetailsRecipeTitle from '../shopListDetailsRecipeTitle/ShopListDetailsRecipeTitle';
// icons import
import { PiTrashLight } from 'react-icons/pi';
import { CiEdit } from 'react-icons/ci';
import { FaRegCircle } from "react-icons/fa";
import { FaRegCircleCheck } from "react-icons/fa6";
// import { FaRegCircleQuestion } from "react-icons/fa6";
import { ImInfo } from "react-icons/im";
// images import
import milkProducts from '../../../images/icons/milk.png'
import fatsAndOils from '../../../images/icons/fatsandoils.png'
import fruits from '../../../images/icons/fruits.png'
import grainNutsAndBakingProducts from '../../../images/icons/grain.png'
import herbsAndSpices from '../../../images/icons/herbs.png'
import meat from '../../../images/icons/meat.png'
import fish from '../../../images/icons/seafood.png'
import pastaAndRice from '../../../images/icons/pasta.png'
import vegetables from '../../../images/icons/vegetable.png'
import other from '../../../images/icons/stepscolicon.png'


type RecipeIngredientContainerProps = {
  index: number;
  name: string;
  quantity: number;
  unit: Unit;
  ingredientType: IngredientType;
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
    toggleModal, toggleIsPurchased, recipeIds, ingredientType,
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
    <div key={Math.random()}>
      <ShopListDetailsRecipeTitle
        title={recipe?.title}
        linkTo={`../recipe/${recipe?.id}`}
      />
    </div>
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
        <img 
          src={setTypeIcon(ingredientType)}
          className='type-icon'
        />
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

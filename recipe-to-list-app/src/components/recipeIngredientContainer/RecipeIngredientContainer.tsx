import { useState } from 'react';
// enums import
import { Unit } from '../../enums/enums';
// styles import
import './RecipeIngredientContainer.css'
// icons import
import { PiTrashLight } from 'react-icons/pi';
import { CiEdit } from 'react-icons/ci';
import { FaRegCircle } from "react-icons/fa";
import { FaRegCircleCheck } from "react-icons/fa6";
import { FaRegCircleQuestion } from "react-icons/fa6";
// utils import
import { firstLetterToUpperCase } from '../../utils/utils';


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

  // destructuring props
  const { index, name, quantity, unit, removeIngredient,
    toggleModal, toggleIsPurchased, recipeIds,
    isPurchased } = props;

  // state variables
  const [showIngredientRecipes, setIsShowIngredientRecipes] = useState(false)

  const toggleShowIngredientRecipesTest = () => {
    setIsShowIngredientRecipes(prevState => !prevState)
  }

  const recipeIdsArr = recipeIds && recipeIds?.map(item => {
    return <p>{item}</p>
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
            className='cta__btn-small' 
            type="button"
            onClick={toggleModal}
          >
            <CiEdit />
          </button>}
          {removeIngredient && <button 
            className='cta__btn-small' 
            type="button"
            onClick={() => removeIngredient(index)}
          >
            <PiTrashLight />
          </button>}
          {recipeIds && <button 
            className='cta__btn-small' 
            type="button"
            onClick={() => toggleShowIngredientRecipesTest()}
          >
            <FaRegCircleQuestion />
          </button>}
          {toggleIsPurchased && <button 
            className='cta__btn-small' 
            type="button"
            onClick={toggleIsPurchased}
          >
            {isPurchased ? <FaRegCircleCheck/> : <FaRegCircle />}
          </button>}
          </div>
        </div>
      </div>
      {showIngredientRecipes && recipeIdsArr}
    </div>
  )
}

import { useState } from 'react'
import { Ingredient } from '../types/types';

export default function useModal() {

  const [isModalMenuOn, setIsModalMenuOn] = useState(false);
  const [isTitleModalOn, setIsTitleModalOn] = useState(false);
  const [isStepModalOn, setIsStepModalOn] = useState(false);
  const [editedStep, setEditedStep] = useState<string | undefined>("");
  const [editedIndex, setEditedIndex] = useState<number | undefined>();
  const [editedIngredient, setEditedIngredient] = useState<Ingredient | undefined>();
  const [isIngredientModalOn, setIsIngredientModalOn] = useState(false);
  const [isImgUrlModalOn, setIsImgUrlModalOn] = useState(false);

  
  const toggleModalMenu = () => {
    setIsModalMenuOn(prevState => !prevState);
  }

  const toggleTitleModal = (isOn: boolean) => {
    setIsTitleModalOn(isOn)
  }

  const toggleStepModal = (isOn: boolean, index?: number, description?: string | undefined) => {
    setIsStepModalOn(isOn);
    setEditedStep(description);
    setEditedIndex(index);
  }

  const setStepToEdit = (str: string) => {
    setEditedStep(str);
  }

  const toggleIngredientModal = (isOn: boolean, index?: number, ingredient?: Ingredient) => {
    setIsIngredientModalOn(isOn)
    setEditedIngredient(ingredient);
    setEditedIndex(index);
  }

  const toggleImgUrlModalOn = (isOn: boolean) => {
    setIsImgUrlModalOn(isOn)
  }

  return {
    isModalMenuOn,
    toggleModalMenu,
    isTitleModalOn,
    toggleTitleModal,
    isStepModalOn,
    toggleStepModal,
    editedStep,
    setStepToEdit,
    editedIngredient,
    isIngredientModalOn,
    toggleIngredientModal,
    isImgUrlModalOn,
    toggleImgUrlModalOn,
    editedIndex
  }
}

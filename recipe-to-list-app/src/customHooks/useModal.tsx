import { useState } from 'react'
import { Ingredient } from '../types/types';

export default function useModal() {

  const [isModalMenuOn, setIsModalMenuOn] = useState(false);
  const [isAddTitleModalOn, setIsAddTitleModalOn] = useState(false);
  const [isEditTitleModalOn, setIsEditTitleModalOn] = useState(false);
  const [isAddStepModalOn, setIsAddStepModalOn] = useState(false);
  const [isEditStepModalOn, setIsStepModalOn] = useState(false);
  const [editedStep, setEditedStep] = useState<string | undefined>("");
  const [editedIndex, setEditedIndex] = useState<number | undefined>();
  const [editedIngredient, setEditedIngredient] = useState<Ingredient | undefined>();
  const [isAddIngredientModalOn, setIsAddIngredientModalOn] = useState(false);
  const [isEditIngredientModalOn, setIsEditIngredientModalOn] = useState(false);
  const [isImgUrlModalOn, setIsImgUrlModalOn] = useState(false);

  
  const toggleModalMenu = (isOn: boolean) => {
    setIsModalMenuOn(isOn)
  }

  const toggleAddTitleModal = (isOn: boolean) => {
    setIsAddTitleModalOn(isOn)
  }

  const toggleEditTitleModal = (isOn: boolean) => {
    setIsEditTitleModalOn(isOn);
  }

  const toggleAddStepModal = (isOn: boolean) => {
    setIsAddStepModalOn(isOn);
  }

  const toggleEditStepModal = (isOn: boolean, index?: number, description?: string | undefined) => {
    setIsStepModalOn(isOn);
    setEditedStep(description);
    setEditedIndex(index);
  }

  const setStepToEdit = (str: string) => {
    setEditedStep(str);
  }

  const toggleAddIngredientModal = (isOn: boolean) => {
    setIsAddIngredientModalOn(isOn);
  }

  const toggleEditIngredientModal = (isOn: boolean, index?: number, ingredient?: Ingredient) => {
    setIsEditIngredientModalOn(isOn)
    setEditedIngredient(ingredient);
    setEditedIndex(index);
  }

  const toggleImgUrlModalOn = (isOn: boolean) => {
    setIsImgUrlModalOn(isOn)
  }

  return {
    isModalMenuOn,
    toggleModalMenu,
    isAddTitleModalOn,
    toggleAddTitleModal,
    isEditTitleModalOn,
    toggleEditTitleModal,
    isAddStepModalOn,
    toggleAddStepModal,
    isEditStepModalOn,
    toggleEditStepModal,
    editedStep,
    setStepToEdit,
    editedIngredient,
    toggleAddIngredientModal,
    isAddIngredientModalOn,
    toggleEditIngredientModal,
    isEditIngredientModalOn,
    isImgUrlModalOn,
    toggleImgUrlModalOn,
    editedIndex
  }
}

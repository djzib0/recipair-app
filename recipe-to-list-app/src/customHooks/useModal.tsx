import { useState } from 'react'

export default function useModal() {

  const [isModalMenuOn, setIsModalMenuOn] = useState(false);
  const [isTitleModalOn, setIsTitleModalOn] = useState(false);
  const [isStepModalOn, setIsStepModalOn] = useState(false);
  const [editedStep, setEditedStep] = useState<string | undefined>("")
  const [isIngredientModalOn, setIsIngredientModalOn] = useState(false);
  const [isImgUrlModalOn, setIsImgUrlModalOn] = useState(false);

  
  const toggleModalMenu = () => {
    setIsModalMenuOn(prevState => !prevState);
  }

  const toggleTitleModal = (isOn: boolean) => {
    setIsTitleModalOn(isOn)
  }

  const toggleStepModal = (isOn: boolean, description?: string | undefined) => {
    setIsStepModalOn(isOn);
    setEditedStep(description);
  }

  const setStepToEdit = (str: string) => {
    setEditedStep(str);
  }

  const toggleIngredientModal = (isOn: boolean) => {
    setIsIngredientModalOn(isOn)
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
    isIngredientModalOn,
    toggleIngredientModal,
    isImgUrlModalOn,
    toggleImgUrlModalOn
  }
}

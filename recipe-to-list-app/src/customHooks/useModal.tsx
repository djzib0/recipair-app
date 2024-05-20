import { useState } from 'react'

export default function useModal() {

  const [isModalMenuOn, setIsModalMenuOn] = useState(false);
  const [isStepModalOn, setIsStepModalOn] = useState(false);
  const [isIngredientModalOn, setIsIngredientModalOn] = useState(false);
  const [isImgUrlModalOn, setIsImgUrlModalOn] = useState(false);
  
  const toggleModalMenu = () => {
    setIsModalMenuOn(prevState => !prevState);
  }


  const toggleStepModal = (isOn: boolean) => {
    setIsStepModalOn(isOn)
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
    isStepModalOn,
    toggleStepModal,
    isIngredientModalOn,
    toggleIngredientModal,
    isImgUrlModalOn,
    toggleImgUrlModalOn
  }
}

import { useState } from 'react'

export default function useModal() {

  const [isStepModalOn, setIsStepModalOn] = useState(false);
  const [isIngredientModalOn, setIsIngredientModalOn] = useState(false);
  
  const toggleStepModal = (isOn: boolean) => {
    setIsStepModalOn(isOn)
  }

  const toggleIngredientModal = (isOn: boolean) => {
    setIsIngredientModalOn(isOn)
  }


  return {
    isStepModalOn,
    toggleStepModal,
    isIngredientModalOn,
    toggleIngredientModal,
  }
}

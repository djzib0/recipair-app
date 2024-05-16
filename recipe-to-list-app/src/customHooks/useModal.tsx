import { useState } from 'react'

export default function useModal() {

  const [isModalOn, setIsModalOn] = useState(false);
  
  const toggleModal = (isOn: boolean) => {
    setIsModalOn(isOn)
  }

  return {
    isModalOn,
    toggleModal,
  }
}

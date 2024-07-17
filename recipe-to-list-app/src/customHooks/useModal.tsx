import { useState } from 'react'
// types import
import { Ingredient, ShopListItem, Modal} from '../types/types';
// enums import
import { ModalType } from '../enums/enums';

export default function useModal() {

  const initialModalObj: Modal = {
    isActive: false,
    modalType: ModalType.Info,
    messageTitle: "",
    messageText: "",
    errorText: "",
    handleFunction: () => {},
    refreshFunction: () => {},
    closeFunction: () => {}
  }

  const [isModalMenuOn, setIsModalMenuOn] = useState(false);
  const [isEditTitleModalOn, setIsEditTitleModalOn] = useState(false);
  const [isEditDescriptionModalOn, setIsEditDescriptionModalOn] = useState(false);
  const [isAddStepModalOn, setIsAddStepModalOn] = useState(false);
  const [isEditStepModalOn, setIsStepModalOn] = useState(false);
  const [editedStep, setEditedStep] = useState<string | undefined>("");
  const [editedIndex, setEditedIndex] = useState<number | undefined>();
  const [editedIngredient, setEditedIngredient] = useState<Ingredient | undefined>();
  const [isAddIngredientModalOn, setIsAddIngredientModalOn] = useState(false);
  const [isEditIngredientModalOn, setIsEditIngredientModalOn] = useState(false);
  const [isImgUrlModalOn, setIsImgUrlModalOn] = useState(false);
  const [editedShopListItem, setEditedShopListItem] = useState<ShopListItem>({recipeId: "", portionQuantity: 0, isPurchased: false})
  const [isAddToShopListModalOn, setIsAddToShopListModalOn] = useState(false);
  const [isYesNoModalOn, setIsYesNoModalOn] = useState<boolean>(false);
  const [modalData, setModalData] = useState<Modal>(initialModalObj);
  const [isInfoModalOn, setIsInfoModalOn] = useState<boolean>(false);

  const toggleModalMenu = (isOn: boolean) => {
    setIsModalMenuOn(isOn)
  }

  const toggleEditTitleModal = (isOn: boolean) => {
    setIsEditTitleModalOn(isOn);
  }

  const toggleEditDescriptionModal = (isOn: boolean) => {
    setIsEditDescriptionModalOn(isOn)
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
    setIsImgUrlModalOn(isOn);
  }

  const toggleAddToShopListModal = (isOn: boolean, editedItem?: ShopListItem) => {
    if (!isOn) {
      setIsAddToShopListModalOn(isOn);
    }
    if (isOn) {
      setIsAddToShopListModalOn(isOn);
      if (editedItem) {
        setEditedShopListItem(editedItem);
      }
    }
  }

  const toggleYesNoModal = (isOn: boolean) => {
    setIsYesNoModalOn(isOn)
  }

  const toggleInfoModal = (isOn: boolean) => {
    setIsInfoModalOn(isOn);
  }

  return {
    isModalMenuOn,
    toggleModalMenu,
    isEditTitleModalOn,
    toggleEditTitleModal,
    isEditDescriptionModalOn,
    toggleEditDescriptionModal,
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
    isAddToShopListModalOn,
    toggleAddToShopListModal,
    editedShopListItem,
    editedIndex,
    isYesNoModalOn,
    toggleYesNoModal,
    modalData,
    setModalData,
    isInfoModalOn,
    toggleInfoModal
  }
}

// types import
import { Recipe, ShopListItem } from '../../types/types';
// styles import
import './ShopListItemModal.css'
// icons import
import { IoMdCloseCircleOutline } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa";
// utils import
import { trimText } from '../../utils/utils'



type ShopListItemModalProps = {
  itemId: string;
  addToList: (itemId: string, quantity: number) => void;
  removeFromList: (itemId: string) => void;
  closeModal: (bool: boolean) => void;
  selectedItem: ShopListItem | undefined;
  classTitle: string;
  selectedRecipeData: Recipe | undefined;
}

export default function ShopListItemModal(props: ShopListItemModalProps) {

  // destructuring props
  const { itemId, addToList, removeFromList, selectedItem,
    closeModal, classTitle, selectedRecipeData
  } = props;



  return (
    <div className={classTitle}>
      <p className='shoplist-item-modal__title'>
        {trimText(selectedRecipeData?.title, 20)}
      </p>
      {!selectedItem && <button onClick={() => addToList(itemId, 44)}>Add me!</button>}
      {selectedItem && <button onClick={() => removeFromList(itemId)}>Remove me!</button>}
      <button 
        onClick={() => closeModal(false)}
        className='shoplist-item-modal__close-btn'
        >
          <FaAngleDown />
      </button>
    </div>
  )
}

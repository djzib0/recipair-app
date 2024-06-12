// types import
import { ShopListItem } from '../../types/types';
// styles import
import './ShopListItemModal.css'

type ShopListItemModalProps = {
  itemId: string;
  addToList: (itemId: string, quantity: number) => void;
  removeFromList: (itemId: string) => void;
  closeModal: (bool: boolean) => void;
  isSelected: ShopListItem | undefined;
}

export default function ShopListItemModal(props: ShopListItemModalProps) {

  // destructuring props
  const { itemId, addToList, removeFromList, isSelected,
    closeModal
  } = props;

  return (
    <div>
      {!isSelected && <button onClick={() => addToList(itemId, 44)}>Add me!</button>}
      {isSelected && <button onClick={() => removeFromList(itemId)}>Remove me!</button>}
      <button onClick={() => closeModal(false)}>Close</button>
    </div>
  )
}

import React from 'react'

type ShopListItemModalProps = {
  itemId: string;
  quantity: number;
  addToList: (itemId: string, quantity: number) => void;
}

export default function ShopListItemModal(props: ShopListItemModalProps) {

  // destructuring props
  const { itemId, quantity, addToList} = props;

  return (
    <div>
      <button onClick={() => addToList(itemId, quantity)}>Click me!</button>
    </div>
  )
}

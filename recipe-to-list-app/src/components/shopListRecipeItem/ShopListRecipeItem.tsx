import React from 'react'

type ShopListRecipeItemProps = {
  recipeTitle: string;
  portion: number;
  addtoList: (recipeId: string) => void;
  
}

export default function ShopListRecipeItem(props: ShopListRecipeItemProps) {
  return (
    <div>
      Recipe item
    </div>
  )
}

// styles import
import './ShopListRecipeItem.css'

type ShopListRecipeItemProps = {
  recipeTitle: string;
  portion: number;
  isSelected: boolean;
}

export default function ShopListRecipeItem(props: ShopListRecipeItemProps) {

  // destructuring props
  const { recipeTitle, portion, isSelected} = props

  return (
    <div className={isSelected ? "shop-list-item__container--selected" : "shop-list-item__container"}>
      <p>{recipeTitle}</p>
      <p>{portion}</p>
    </div>
  )
}

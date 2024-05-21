
type RecipeListItemProps = {
  imgUrl: string;
  title: string;
  description: string;
}

export default function RecipeListItem(props: RecipeListItemProps) {

  // destructuring props
  const {imgUrl, title} = props;

  return (
    <div>
      <img 
        src={imgUrl} 
        alt={`${title} photo`}
        className="recipe__img"
      />
    </div>
  )
}

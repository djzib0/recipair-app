//styles import
import './RecipeListItem.css';
// images import
import stepsIconCol from '../../../images/icons/stepscolicon.png';
import ingredientIconCol from '../../../images/icons/ingredientsiconcol.png';
import editIcon from '../../../images/icons/edit.png';
import binIcon from '../../../images/icons/bin.png';
import noPhotoImg from '../../../images/nophoto.jpg'
 


type RecipeListItemProps = {
  imgUrl: string;
  title: string;
  description: string;
  stepsNumber: number | undefined;
}

export default function RecipeListItem(props: RecipeListItemProps) {

  // destructuring props
  const {imgUrl, title, stepsNumber } = props;

  // functions
  const onImageError = (e: any) => {
    e.target.onError = null;
    e.target.src = "../../../images/placeholderImg.jpg"
  }

  // click handling functions
  const handleEdit = () => {
    console.log("edit button was clicked")
  }

  return (
    <div className='recipe-list-item__container'>
      {/* <img 
        src={imgUrl} 
        alt={`${title} photo`}
        className="recipe-list__img"
      /> */}
      {imgUrl.length === 0 ?
      <img src={noPhotoImg} className="recipe__img"/> :
      <img src={imgUrl} 
        className="recipe-list__img" 
        onError={onImageError} />
      }
      
      <div className='recipe-list-item__details'>
        <div className='recipe-list-item__title'>
          <h5 >{title}</h5>
        </div>
        <div className='recipe-list-item__stats'>
          <div className='recipe-list-item__steps'>
            <img src={stepsIconCol} 
              alt='icon represents steps in a recipe'
              className='stats__icon' 
            />
            <p className='stats__text'>{stepsNumber ? stepsNumber : "0"}</p>
          </div>
          <div className='recipe-list-item__ingredients'>
            <img src={ingredientIconCol} 
              alt='icon represents steps in a recipe'
              className='stats__icon' 
            />
            <p className='stats__text'>{stepsNumber ? stepsNumber : "0"}</p>
          </div>
          <div className='recipe-list-item__cta'>
            <button 
              onClick={handleEdit}
              className='recipe-list-item__btn'
            >
              <img src={editIcon} />
            </button>
            <button 
              onClick={handleEdit}
              className='recipe-list-item__btn'
            >
              <img src={binIcon} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

//styles import
import './RecipeListItem.css';
// images import
import stepsIconCol from '../../../images/icons/stepscolicon.png';
import ingredientIconCol from '../../../images/icons/ingredientsiconcol.png';
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

  return (
    <div className='recipe-list-item__container'>
      {/* <img 
        src={imgUrl} 
        alt={`${title} photo`}
        className="recipe-list__img"
      /> */}
      <div className='recipe-list-img__container'>
        {imgUrl.length === 0 ?
        <img src={noPhotoImg} 
          className="recipe-list__img"
          alt='default image when photo is not added'
        /> 
        :
        <img src={imgUrl} 
          className="recipe-list__img" 
          onError={onImageError}
          alt='default image when error occurs during loading image'
        />
        }
      </div>
      
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
        </div>
      </div>
    </div>
  )
}

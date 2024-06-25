// react router imports
import { Link } from 'react-router-dom';
// styles import
import './ShopListItem.css'
// images import
import ingredientIconCol from '../../../images/icons/ingredientsiconcol.png';
// icons import
import { PiTrashLight } from 'react-icons/pi';

type ShopListItemProps = {
    linkTo: string;
    title: string;
    ingredientsQuantity: number;
}

export default function ShopListItem(props: ShopListItemProps) {
  return (
    <div className='shoplist-item__container'>
      <Link to={props.linkTo} className='shoplist-item-details__container'>
          <p className='shoplist-item__title'>
            {props.title}
          </p>
          <div className='shoplist-item__quantity'>
            <img src={ingredientIconCol} 
              alt='icon represents steps in a recipe'
              className='stats__icon' 
              />
            <p className='stats__text'>{props.ingredientsQuantity}</p>
          </div>
      </Link>
      <button
        className='shoplist-item__delete'
        type='button'
        >
        <PiTrashLight />
      </button>
    </div>
  )
}

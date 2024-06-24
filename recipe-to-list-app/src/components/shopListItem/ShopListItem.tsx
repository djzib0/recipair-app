// styles import
import './ShopListItem.css'
// images import
import ingredientIconCol from '../../../images/icons/ingredientsiconcol.png';
// icons import
import { PiTrashLight } from 'react-icons/pi';

type ShopListItemProps = {
    title: string;
    ingredientsQuantity: number;
}

export default function ShopListItem(props: ShopListItemProps) {
  return (
    <div className='shoplist-item__container'>
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
      <button
        className='cta__btn--medium shoplist-item__delete'
        type='button'
      >
        <PiTrashLight className='cta__btn--medium' />
      </button>
    </div>
  )
}

// react router imports
import { Link } from 'react-router-dom';
// custom hooks import
import useModal from '../../customHooks/useModal';
// styles import
import './ShopListItem.css'
// images import
import ingredientIconCol from '../../../images/icons/ingredientsiconcol.png';
// icons import
import { PiTrashLight } from 'react-icons/pi';
// types import
import { ShopList } from '../../types/types';

type ShopListItemProps = {
    linkTo: string;
    title: string;
    ingredientsQuantity: number;
    shopListId: string | undefined;
    openModal?: () => void;
    closeModal?: () => void;
    obj: ShopList;

}

export default function ShopListItem(props: ShopListItemProps) {

  // utilize useModal hook
  const {} = useModal();

  // destructuring props
  const {openModal} = props

  return (
    <main>
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
          // onClick={() => toggleYesNoModalOn(true, `Do you want to delete shop list "${props.title}"?`)}
          onClick={() => openModal && openModal()}
          >
          <PiTrashLight />
        </button>
        
      </div>   
    </main>
  )
}

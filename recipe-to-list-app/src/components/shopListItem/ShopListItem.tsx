// react router imports
import { Link } from 'react-router-dom';
// components import
import YesNoModal from '../yesNoModal/YesNoModal';
// custom hooks import
import useModal from '../../customHooks/useModal';
import useDatabase from '../../customHooks/useDatabase';
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
    shopListId: string | undefined;
}

export default function ShopListItem(props: ShopListItemProps) {

  // utilize useModal hook
  const {isYesNoModalOn, toggleYesNoModalOn} = useModal();

  // utilize useDatabase hook
  const { deleteShopList } = useDatabase();

  console.log(props.shopListId, " id")

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
          onClick={() => {toggleYesNoModalOn(false), toggleYesNoModalOn(true)}}
          >
          <PiTrashLight />
        </button>
        
      </div>   
      {isYesNoModalOn && 
        <YesNoModal 
          classTitle={isYesNoModalOn ? 'sliding-yesno-modal--bottom': 'sliding-yesno-modal--bottom--disabled' }
          message={`Do you want to delete shop list "${props.title}"?`}
          handleFunction={() => deleteShopList(props.shopListId)}
          isWarning={true}
          closeModal={() => toggleYesNoModalOn(false)}
          itemId={props.shopListId}
        />
        }    
    </main>
  )
}

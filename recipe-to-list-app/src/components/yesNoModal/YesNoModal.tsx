// custom hooks import
import useModal from '../../customHooks/useModal';
import { ShopList } from '../../types/types';
// styles import
import './YesNoModal.css'

type YesNoModalProps = {
  classTitle: string;
  editedObj: ShopList | undefined;
  message: string | undefined;
  closeModal: (() => void )| undefined;
}

export default function YesNoModal(props: YesNoModalProps) {

  // utilizing useModal custom hook
  const { } = useModal();

  // destructuring props
  const {
    classTitle, message, editedObj, closeModal
  } = props;

  const handleConfirm = () => {
    
  }

  return (
    <div className={classTitle}>
      <h5>{message}</h5>
      {
      <div className='yesno-modal-btn__container'>
        <button
          onClick={() => handleConfirm()}
        >
          Yes
        </button>
        <button
          onClick={() => closeModal && closeModal()}
        >Cancel</button>
      </div>
      }
    </div>
  )
}

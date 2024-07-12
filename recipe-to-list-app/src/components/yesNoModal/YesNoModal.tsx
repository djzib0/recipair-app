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
  handleFunction: (() => void )| undefined;
  refreshPage: (() => void )| undefined;
}

export default function YesNoModal(props: YesNoModalProps) {

  // utilizing useModal custom hook
  const { } = useModal();

  // destructuring props
  const {
    classTitle, message, refreshPage, closeModal, handleFunction,
  } = props;

  const handlingConfirm = () => {
    handleFunction && handleFunction();
    closeModal && closeModal();
    refreshPage && refreshPage();
  }


  return (
    <div className={classTitle}>
      <h5>{message}</h5>
      {
      <div className='yesno-modal-btn__container'>
        <button
          onClick={() => handlingConfirm()}
          className={`confirm-modal__btn`}
        >
          YES
        </button>
        <button
          onClick={() => closeModal && closeModal()}
        >Cancel</button>
      </div>
      }
    </div>
  )
}

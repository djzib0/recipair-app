// styles import
import { useEffect } from 'react';
import './YesNoModal.css'

type YesNoModalProps = {
  classTitle: string;
  message: string;
  handleFunction: (id: string) => void;
  closeModal: () => void;
  isWarning?: boolean;
  isInformative?: boolean;
  isConfirmative?: boolean
  itemId: string | undefined;
}

export default function YesNoModal(props: YesNoModalProps) {

  // destructuring prosp
  const {
    classTitle, message, handleFunction, closeModal,
    isWarning, isInformative, isConfirmative, itemId
  } = props;

  const handleConfirm = () => {
    itemId && handleFunction(itemId)
    closeModal();
  }

  return (
    <div className={classTitle}>
      <h5>{message}</h5>
      {isWarning && 
      <div className='yesno-modal-btn__container'>
        <button
          onClick={() => handleConfirm()}
        >
          Yes
        </button>
        <button
          onClick={() => closeModal()}
        >Cancel</button>
      </div>
      }
    </div>
  )
}

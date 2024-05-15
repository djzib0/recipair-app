// styles import
import './StepFormModal.css'
import '../../App.css'
// icons import
import { IoMdCloseCircleOutline } from "react-icons/io";

type StepFormModalProps = {
  classTitle: string;
  handleFunction: () => void;
  closeModal: () => void;
}

export default function StepFormModal(props: StepFormModalProps) {

  const { classTitle, handleFunction, closeModal } = props;

  return (
    <div className={classTitle}>
      <button className='close-modal__btn'>
        <IoMdCloseCircleOutline onClick={closeModal} />
      </button>
      <form className='modal__form'>  
        <label 
          htmlFor='step_description'
          className='modal__form__label'
          >
          Step description
        </label>
        <input 
          type='text' 
          id='step_description'
        />
        <button 
          className='confirm__btn--small'
          onClick={handleFunction}
          >
          Add
        </button>
      </form>
    </div>
  )
}

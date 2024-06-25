// styles import
import './RecipeStepContainer.css'
// icons import
import { PiTrashLight } from "react-icons/pi";
import { MdKeyboardArrowUp } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import { CiEdit } from "react-icons/ci";


type RecipeStepContainerProps = {
    index: number;
    description: string;
    maxIndex: number | undefined;
    removeStep: (index: number) => void;
    changeStepPosition: (index: number, changeUp: boolean) => void;
    toggleModal?: () => void;
}

export default function RecipeStepContainer(props: RecipeStepContainerProps) {

  const { index, description, maxIndex, removeStep, changeStepPosition, toggleModal} = props;

  return (
    <div className="recipe-step__container">
      <div className='step-number__container'>
        {index + 1}.
      </div>
      <div className='step-description__container'>
        {`${description}`}
      </div>
      <div className='step-cta__container'>
        <div className='step-cta--up'>
          {index > 0 && 
            <button 
              className='cta__step-btn--small' 
              onClick={() => changeStepPosition(index, true)}
            >
            {<MdKeyboardArrowUp />}
            </button>
          }
        </div>
        <div className='step-cta--down'>
          {index + 1 != maxIndex  &&
            <button
              className='cta__step-btn--small' 
              onClick={() => changeStepPosition(index, false)}
            >
              <MdKeyboardArrowDown />
            </button>
          }
        </div>
        <button 
            className='cta__step-btn--small' 
            type="button"
            onClick={toggleModal}
          >
            <CiEdit />
          </button>
        <div className='step-cta--delete'>
          <button 
            className='cta__step-btn--small' 
            type="button"
            onClick={() => removeStep(index)}
          >
            <PiTrashLight />
          </button>
        </div>
      </div>
    </div>
  )
}

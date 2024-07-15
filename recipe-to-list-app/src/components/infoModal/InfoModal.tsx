import { useEffect, useState } from 'react';
// utils import
import { firstLetterToUpperCase } from '../../utils/utils';
// styles import
import './InfoModal.css'
// images import
import errorIcon from '../../../images/infoModalIcons/close.png';
import warningIcon from '../../../images/infoModalIcons/warning.png';
import checkIcon from '../../../images/infoModalIcons/check.png';
import informationIcon from '../../../images/infoModalIcons/information.png';


type InfoModalProps = {
  isError?: boolean;
  isValidation?: boolean;
  isWarning?: boolean;
  isSuccessful?: boolean;
  isInformation?: boolean;
  errors?: any;
  message?: string;
  closeModal: () => void;
}

export default function InfoModal(props: InfoModalProps) {

  // state variables
  const [classHidden, setClassHidden] = useState<string>("")
  const [classVariant, setClassVariant] = useState<string>("")
  const [iconType, setIconType] = useState<string>();
  const [errorItemFieldsArr, setErrorItemFieldssArr] = useState<any[]>();
  const [errorItemMessagesArr, setErrorItemMessagesArr] = useState<any[]>();

  // destructuring props
  const {isError, isValidation, isWarning, isSuccessful,
    isInformation, errors, closeModal} = props;

  useEffect(() => {
    if (isError) {
      setClassVariant(`error__container`);
      setIconType(errorIcon);
    } else if (isValidation) {
      setClassVariant(`validation__container`);
      setIconType(errorIcon);
    } else if (isWarning) {
      setClassVariant(`warning__container`);
      setIconType(warningIcon);
    } else if (isSuccessful) {
      setClassVariant(`successful__container`);
      setIconType(checkIcon);
    } else if (isInformation) {
      setClassVariant(`info__container`);
      setIconType(informationIcon);
    }
    
    // set up the error message IF errors are passed
    try {
      setErrorItemFieldssArr(Object.keys(errors));
      setErrorItemMessagesArr(Object.values(errors));
    } catch (error) {
      console.log(error)
    }

    setTimeout(() => {
      setClassHidden(`visibility--hidden`)
    }, 2000);

    setTimeout(() => {
      closeModal()
    }, 2200);
  }, [])


  return (
    <div className={`content__container`}>
      <div className={`info-modal-main__container ${classVariant} ${classHidden}`}>
        <img 
        src={iconType}
        className='info-modal__icon'
        />
        {errorItemFieldsArr && errorItemMessagesArr 
        && errorItemFieldsArr.length > 0 && errorItemMessagesArr.length > 0 
        && <p>Field '{firstLetterToUpperCase(errorItemFieldsArr[0])}' {errorItemMessagesArr[0].message}</p>}
      </div>
    </div>
  )
}



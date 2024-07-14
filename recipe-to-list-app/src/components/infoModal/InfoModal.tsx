import { useEffect, useState } from 'react';
// utils import
import { firstLetterToUpperCase } from '../../utils/utils';
// styles import
import './InfoModal.css'

type InfoModalProps = {
  isError?: boolean;
  isInformation?: boolean;
  isConfirmation?: boolean;
  errors?: any;
  message?: string;
}

export default function InfoModal(props: InfoModalProps) {

  // state variables
  const [classHidden, setClassHidden] = useState<string>("")
  const [classVariant, setClassVariant] = useState<string>("")
  const [errorItemFieldsArr, setErrorItemFieldssArr] = useState<any[]>();
  const [errorItemMessagesArr, setErrorItemMessagesArr] = useState<any[]>();

  // destructuring props
  const {isError, errors} = props;

  useEffect(() => {
    if (isError) {
      setClassVariant(`validation__container`);
    }
    // set up the error message IF errors are passed
    try {
      setErrorItemFieldssArr(Object.keys(errors));
      setErrorItemMessagesArr(Object.values(errors));
    } catch (error) {

    }

    setTimeout(() => {
      setClassHidden(`visibility--hidden`)
    }, 2000);
    setTimeout(() => {
      setClassHidden(`visibility--none`)
    }, 2100);
  }, [])

  return (
    <div className={`content__container`}>
      <div className={`info-modal-main__container ${classVariant} ${classHidden}`}>
        {errorItemFieldsArr && errorItemMessagesArr 
        && errorItemFieldsArr.length > 0 && errorItemMessagesArr.length > 0 
        && <p>Field '{firstLetterToUpperCase(errorItemFieldsArr[0])}' {errorItemMessagesArr[0].message}</p>}
      </div>
    </div>
  )
}



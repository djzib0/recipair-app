import { useEffect, useState } from 'react';

// types import
import { Recipe, ShopListItem } from '../../types/types';
// styles import
import './ShopListItemModal.css'
// react form hook and zod imports
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
// icons import
import { FaAngleDown } from "react-icons/fa";
// utils import
import { trimText } from '../../utils/utils'
import { FaRegCircleCheck } from "react-icons/fa6";
import { FiTrash2 } from "react-icons/fi";

type ShopListItemModalProps = {
  itemId: string;
  addToList: (itemId: string, quantity: number) => void;
  removeFromList: (itemId: string) => void;
  closeModal: () => void;
  selectedItem: ShopListItem | undefined;
  classTitle: string;
  selectedRecipeData: Recipe | undefined;
  quantity: number;
}

const schema = z.object({
  quantity: z.number().min(1)
});

type FormFields = z.infer<typeof schema>


export default function ShopListItemModal(props: ShopListItemModalProps) {

  // destructuring props
  const { itemId, addToList, removeFromList, selectedItem,
    closeModal, classTitle, selectedRecipeData, quantity
  } = props;

  // state variables 
  const [initialQuantity, setInitialQuantity] = useState<number>();
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    setInitialQuantity(quantity)
  }, [])
 
  useEffect(() => {
    setValue("quantity", quantity)
  }, [quantity])

  // destructuring useForm
  const {
    register,
    handleSubmit,
    resetField,
    setValue,
  } = useForm<FormFields>(
    {defaultValues: {
      quantity: Number(quantity)
    },
    resolver: zodResolver(schema)}
  )



  // handling functions
  const onSubmit: SubmitHandler<FormFields> = (data) => {
    addToList(itemId, data.quantity)
    resetField("quantity")
    closeModal();
  }
 
  const handleChange = (e: any) => {
    if (e.target.value != initialQuantity) {
      setIsChanged(true)
    } else {
      setIsChanged(false);
    }
  }
  
  return (
    <div className={classTitle}>
      <p className='shoplist-item-modal__title'>
        {trimText(selectedRecipeData?.title, 24)}
      </p>
      <form 
        onSubmit={handleSubmit(onSubmit)}
        className='shoplist-item-modal__form'
      >
        <label
          htmlFor='quantity'
        >
        </label>
        <input {...register("quantity", {valueAsNumber: true, onChange: handleChange} )} 
          type='number'
          id='quantity'
        />
      {(!selectedItem || isChanged) && 
      <button 
        type='submit'
        className='shoplist-item-modal__btn'
      >
        <FaRegCircleCheck />
      </button>}
      {selectedItem && 
      <button 
        type='button'
        onClick={() => removeFromList(itemId)}
        className='shoplist-item-modal__btn'
      >
        <FiTrash2 />
      </button>}
      </form>
      
      <button 
        onClick={() => closeModal()}
        className='shoplist-item-modal__btn'
        >
          <FaAngleDown />
      </button>
    </div>
  )
}

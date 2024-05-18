// styles import
// import './IngredientFormModal.css'
import '../../App.css'
// icons import
import { IoMdCloseCircleOutline } from "react-icons/io";
// react-hook and zod imports
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
// enum import
import { Unit } from '../../enums/enums';

type IngredientFormModalProps = {
  classTitle: string;
  addStep: (description: string) => void;
  closeModal: () => void;
  isOn: boolean;
}

const schema = z.object({
  description: z.string().min(1),
  quantity: z.coerce.number().min(0.1),
  // quantity: z.preprocess((a) => parseInt(z.string().parse(a), 2)),
  unit: z.string().min(1),
})

type FormFields = z.infer<typeof schema>

export default function IngredientFormModal(props: IngredientFormModalProps) {

  // destructurize useForm
  const {
    register,
    handleSubmit,
    resetField,
    formState: {errors},
  } = useForm<FormFields>(
    {defaultValues: {
      description: ""
    },
    resolver: zodResolver(schema)}
  )

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    // addStep(data.description)
    console.log(data)
    // resetField("description")
  }

  // destructurizing props
  const { classTitle, closeModal, isOn } = props;

  // functions
  const closeIngredientForm = () => {
    resetField("description");
    resetField("quantity");
    resetField("quantity");
    closeModal();
  }

  // create option list from Unit enum
  const unitsArr = Object.keys(Unit).map((unit, index) => {
    return (
      <option key={index} value={unit}>{Unit[`${unit as keyof typeof Unit}`]}</option>
    )
  })

  return (
    <div className={classTitle}>
      <button className='close-modal__btn'>
        <IoMdCloseCircleOutline onClick={() => closeIngredientForm()} />
      </button>
      {isOn && 
      <form className='modal__form' onSubmit={handleSubmit(onSubmit)}>  
        
        <label 
          htmlFor='ingredient'
          className='modal__form__label'
          >
          {errors.description ? errors.description.message : "Ingredient"}
        </label>
        <textarea {...register("description")} 
          id='ingredient'
          placeholder='Your next ingredient...'
        />

        <label
          htmlFor='quantity'
          className='modal__form__label'
        >
          {errors.quantity ? errors.quantity.message : "Quantity"}
        </label>
        <input
          {...register("quantity")}
          type='number'
          id='quantity' 
        />

        <label
          htmlFor='quantity'
          className='modal__form__label'
        >
          {errors.unit ? errors.unit.message : "Unit" }
        </label>
        <select
          {...register("unit")}
          id='unit'
        >
          {unitsArr}
        </select>

        <button 
          className='confirm__btn--small'
          >
          Add
        </button>
      </form>}
    </div>
  )
}

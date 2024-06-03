import { useEffect, useState } from 'react';
// styles import
// import './IngredientFormModal.css'
import '../../App.css'
// icons import
import { IoMdCloseCircleOutline } from "react-icons/io";
// react-hook and zod imports
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
// types import
import { Ingredient } from '../../types/types';
// enum import
import { Unit, IngredientType } from '../../enums/enums';

type IngredientFormModalProps = {
  classTitle: string;
  addIngredient?: (name: string, quantity: number, unit: Unit, ingredientType: IngredientType ) => void;
  closeModal: () => void;
  isOn: boolean;
  defaultValue?: Ingredient | undefined;
  editedIndex?: number | undefined;
}

const schema = z.object({
  description: z.string().min(1),
  quantity: z.coerce.number().min(0.1),
  unit: z.string().min(1),
  ingredientType: z.string().min(1)
})

type FormFields = z.infer<typeof schema>

export default function IngredientFormModal(props: IngredientFormModalProps) {


  console.log(props.defaultValue?.unit)
  // destructuring useForm
  const {
    register,
    handleSubmit,
    resetField,
    formState: {errors},
  } = useForm<FormFields>(
    {defaultValues: {
      description: props.defaultValue?.name ? props.defaultValue.name : "",
      quantity: props.defaultValue?.quantity ? props.defaultValue?.quantity : 0,
      unit: props.defaultValue?.unit ? props.defaultValue?.unit : Unit["Piece"],
      ingredientType: props.defaultValue?.ingredientType ? props.defaultValue?.ingredientType : IngredientType["MilkProducts"]
    },
    resolver: zodResolver(schema)}
  )

   // destructuring props
   const { classTitle, addIngredient, closeModal, isOn, defaultValue } = props;

   // state variables
   const [defaultUnitValue, setDefaultUnitValue] = useState<string>(Unit['Gram']) 

   useEffect(() => {
    for (let key of Object.keys(Unit)) {
          if (defaultValue?.unit === Unit[`${key as keyof typeof Unit}`]) {
        setDefaultUnitValue(Unit[`${key as keyof typeof Unit}`])
      }
    }
   }, [defaultUnitValue])


  const onSubmit: SubmitHandler<FormFields> = (data) => {
    let unit: Unit = Unit[data.unit as keyof typeof Unit]
    let ingredientType: IngredientType = IngredientType[data.ingredientType as keyof typeof IngredientType]

    if (addIngredient) {
      addIngredient(
        data.description,
        data.quantity,
        unit,
        ingredientType
      )
    }
    closeIngredientForm();
  }

  // functions
  const closeIngredientForm = () => {
    resetField("description");
    resetField("quantity");
    resetField("unit");
    closeModal();
  }

  // create option list from Unit enum
  const unitsArr = Object.keys(Unit).map((unit, index) => {
    return (
      <option 
        key={index}
        value={Unit[`${unit as keyof typeof Unit}`]}
      >
        {Unit[`${unit as keyof typeof Unit}`]}
      </option>
    )
  })

  // create an option list from IngredientType enum
  const ingredientTypesArr = Object.keys(IngredientType).map((ingredientType, index) => {
    return (
      <option 
        key={index} 
        value={IngredientType[`${ingredientType as keyof typeof IngredientType}`]}
      >
        {IngredientType[`${ingredientType as keyof typeof IngredientType}`]}
      </option>
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
          htmlFor='unit'
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

        <label
          htmlFor='ingredientType'
          className='modal__form__label'
        >
          {errors.unit ? errors.unit.message : "Ingredient type" }
        </label>
        <select
          {...register("ingredientType")}
          id='ingredientType'
        >
          {ingredientTypesArr}
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

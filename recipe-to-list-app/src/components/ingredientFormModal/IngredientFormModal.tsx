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
import { Ingredient, ShopListIngredient } from '../../types/types';
// enum import
import { Unit, IngredientType } from '../../enums/enums';

type IngredientFormModalProps = {
  classTitle: string;
  addIngredient?: (ingredient: Ingredient ) => void;
  editIngredient?: (index: number | undefined, newIngredient : Ingredient) => void;
  addNotShopListIngredient?: (shopListId: string, newIngredient: ShopListIngredient) => void;
  closeModal: () => void;
  editedShopListId?: string | undefined;
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
   const { classTitle, addIngredient, closeModal, isOn,
    editIngredient, editedIndex, defaultValue,
    addNotShopListIngredient, editedShopListId} = props;

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
    // let unit: Unit = Unit[data.unit as keyof typeof Unit]
    // let ingredientType: IngredientType = IngredientType[data.ingredientType as keyof typeof IngredientType]
    const newUnit= Object.keys(Unit).find((k) => {
      return Unit[`${k as keyof typeof Unit}`] === data.unit
    })

    const newIngredientType = Object.keys(IngredientType).find((k) => {
      return IngredientType[`${k as keyof typeof IngredientType}`] === data.ingredientType
    })

    console.log(newIngredientType, " new ingredient")

    if (addIngredient) {
      const newIngredient = {
        name: data.description,
        quantity: data.quantity,
        unit: Unit[`${newUnit as keyof typeof Unit}`],
        ingredientType: IngredientType[`${newIngredientType as keyof typeof IngredientType}`]
      }
      addIngredient(newIngredient)
    }

    // when edit ingredient function is passed as a prop
    // edit the existing ingredient, if the values are the same
    // it means there are no changes, so do nothing
    if (editIngredient) {
      const newIngredient = {
        name: data.description,
        quantity: data.quantity,
        unit: Unit[`${newUnit as keyof typeof Unit}`],
        ingredientType: IngredientType[`${newIngredientType as keyof typeof IngredientType}`]
      }
      editIngredient(editedIndex, newIngredient)
    }

    // when addNotShopListIngredient function is passed as a prop
    // add new ingredient to the shop list
    if (addNotShopListIngredient && editedShopListId) {
      const newIngredient: ShopListIngredient = {
        name: data.description,
        quantity: data.quantity,
        portionQuantity: data.quantity,
        isPurchased: false,
        unit: Unit[`${newUnit as keyof typeof Unit}`],
        ingredientType: IngredientType[`${newIngredientType as keyof typeof IngredientType}`]
      }
      addNotShopListIngredient(editedShopListId, newIngredient);
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
          {addIngredient && "Add"}
          {editIngredient && "Save"}
        </button>
      </form>}
    </div>
  )
}

// react-hook and zod imports
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
// icons import
import { IoMdCloseCircleOutline } from "react-icons/io";
// styles import
import '../../App.css'
import './RecipeTitleFormModal.css'

type RecipeTitleFormModalProps = {
    classTitle: string;
    addTitle?: (title: string) => void;
    editTitle?: (title: string) => void;
    closeModal: () => void;
    toggleIsChanged: (bool: boolean) => void;
    refreshPage: () => void;
    isOn: boolean;
    defaultValue?: string;
}

const schema = z.object({
    title: z.string().min(1)
})

type FormFields = z.infer<typeof schema>

export default function RecipeTitleFormModal(props: RecipeTitleFormModalProps) {
  
  // destructuring props 
  const {
    classTitle,
    addTitle,
    editTitle,
    closeModal, 
    isOn, 
    defaultValue, 
    toggleIsChanged,
    refreshPage 
  } = props;

  // destructuring useForm
  const {
    register,
    handleSubmit,
    resetField,
    formState: {errors},
  } = useForm<FormFields>(
    {defaultValues: {
      title: defaultValue ? defaultValue : ""
    },
    resolver: zodResolver(schema)}
  )

  
  const onSubmit: SubmitHandler<FormFields> = (data) => {
    if (data.title != defaultValue) {
      toggleIsChanged(true);
      refreshPage();
    }
    addTitle && addTitle(data.title);
    editTitle && editTitle(data.title)
    closeRecipeTitleForm();
    refreshPage();
  }

  const closeRecipeTitleForm = () => {
    resetField("title")
    closeModal();
  }

  return (
    <div className={classTitle}>
      <button className='close-modal__btn'>
        <IoMdCloseCircleOutline onClick={() => {closeModal(); resetField("title")}} />
      </button>
      {isOn && <form className='modal__form' onSubmit={handleSubmit(onSubmit)}>  
        <label 
          htmlFor='title'
          className='modal__form__label'
          >
          {errors.title ? errors.title.message : "New title"}
        </label>
        <input {...register("title")}
          type='text'
          id='title'
          autoComplete='off'
          placeholder='New title here...'
        />
        <button 
          className='confirm__btn--small'
          >
          {addTitle && "Add"}
          {editTitle && "Save"}
        </button>
      </form>}
    </div>
  )
}




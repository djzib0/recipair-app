// react form hook and zod imports
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
// icons import
import { IoMdCloseCircleOutline } from "react-icons/io";

type RecipeDescriptionFormModalProps = {
  classTitle: string;
  editDescription?: (description: string) => void;
  closeModal: () => void;
  toggleIsChanged: (bool: boolean) => void;
  refreshPage: () => void;
  isOn: boolean;
  defaultValue?: string;
}

const schema = z.object({
  description: z.string().min(1)
})

type FormFields = z.infer<typeof schema>

export default function RecipeDescriptionFormModal(props: RecipeDescriptionFormModalProps ) {

  // destructuring props
  const {classTitle, editDescription, closeModal, toggleIsChanged,
    refreshPage, isOn, defaultValue
  } = props;

  // destructuring useForm
  const {
    register,
    handleSubmit,
    resetField,
    formState: {errors},
  } = useForm<FormFields>(
    {defaultValues: {
      description: defaultValue ? defaultValue : ""
    },
    resolver: zodResolver(schema)}
  )

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    if (data.description != defaultValue) {
      toggleIsChanged(true);
      refreshPage();
    }
    editDescription && editDescription(data.description)
    closeModal();
    refreshPage();
  }

  return (
    <div className={classTitle}>
      <button className='close-modal__btn'>
        <IoMdCloseCircleOutline onClick={() => {closeModal(); resetField("description")}} />
      </button>
      {isOn && <form className='modal__form' onSubmit={handleSubmit(onSubmit)}>  
        <label 
          htmlFor='description'
          className='modal__form__label'
          >
          {errors.description ? errors.description.message : "New description"}
        </label>
        <input {...register("description")}
          type='text'
          id='description'
          autoComplete='off'
          placeholder='New description here...'
        />
        <button 
          className='confirm__btn--small'
          >
          {editDescription && "Save"}
        </button>
      </form>}
    </div>
  )
}

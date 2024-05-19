// styles import
import './StepFormModal.css'
import '../../App.css'
// icons import
import { IoMdCloseCircleOutline } from "react-icons/io";
// react-hook and zod imports
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

type StepFormModalProps = {
  classTitle: string;
  addStep: (description: string) => void;
  closeModal: () => void;
  isOn: boolean;
}

const schema = z.object({
  description: z.string().min(1),
})

type FormFields = z.infer<typeof schema>

export default function StepFormModal(props: StepFormModalProps) {

  // destructuring useForm
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
    addStep(data.description)
    resetField("description")
  }

  const { classTitle, addStep, closeModal, isOn } = props;

  return (
    <div className={classTitle}>
      <button className='close-modal__btn'>
        <IoMdCloseCircleOutline onClick={() => {closeModal(); resetField("description")}} />
      </button>
      {isOn && <form className='modal__form' onSubmit={handleSubmit(onSubmit)}>  
        <label 
          htmlFor='step_description'
          className='modal__form__label'
          >
          {errors.description ? errors.description.message : "Step description"}
        </label>
        <textarea {...register("description")} 
          id='step_description'
          placeholder='Your next step...'
        />
        <button 
          className='confirm__btn--small'
          >
          Add
        </button>
      </form>}
    </div>
  )
}

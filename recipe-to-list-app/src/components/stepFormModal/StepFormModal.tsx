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
  addStep?: (description: string) => void;
  editStep?: (index: number | undefined, description: string ) => void;
  closeModal: () => void;
  isOn: boolean;
  defaultValue?: string;
  editedIndex?: number | undefined;
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
      description: props.defaultValue
    },
    resolver: zodResolver(schema)}
  )

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    // when addStep function is passed as a prop
    // create new step and add it to the array with cooking
    // steps
    addStep && addStep(data.description)

    // when editStep function is passed as a prop
    // edit the existing step, if the values are the same
    // it means there are no changes so do nothing
    if ( editStep && data.description !== props.defaultValue) {
      editStep(editedIndex, data.description);
      console.log(editedIndex, " edited Index")
      console.log(data.description, " step description")
      console.log("editing")
    }
    resetField("description");
    closeModal();
  }

  // destructuring props
  const { classTitle, addStep, editStep, closeModal, isOn, editedIndex } = props;

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
          {addStep && "Add"}
          {editStep && "Save"}
        </button>
      </form>}
    </div>
  )
}

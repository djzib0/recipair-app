// styles import
import './ImgUrlFormModal.css'
import '../../App.css'
// icons import
import { IoMdCloseCircleOutline } from "react-icons/io";
// react-hook and zod imports
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

type ImgUrlFormModalProps = {
    classTitle: string;
    addImgUrl?: (imgUrl: string) => void;
    editImgUrl?: (imgUrl: string) => void;
    closeModal: () => void;
    isOn: boolean;
    defaultValue?: string;
    toggleIsChanged?: (bool: boolean) => void;
    refreshPage?: () => void;
}

const schema = z.object({
    imgUrl: z.string().url()
})

type FormFields = z.infer<typeof schema>

export default function ImgUrlFormModal(props: ImgUrlFormModalProps) {

  // destructuring useForm
  const {
    register,
    handleSubmit,
    resetField,
    formState: {errors}
  } = useForm<FormFields>(
    {defaultValues: {
      imgUrl: props.defaultValue? props.defaultValue : ""
    },
    resolver: zodResolver(schema)}
  )

   //destructuring props
  const { classTitle, addImgUrl, closeModal, editImgUrl,
     isOn, toggleIsChanged, defaultValue, refreshPage 
  } = props;

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    if (data.imgUrl != defaultValue) {
      toggleIsChanged && toggleIsChanged(true)
      refreshPage && refreshPage()
    }
    addImgUrl && addImgUrl(data.imgUrl)
    editImgUrl && editImgUrl(data.imgUrl)
    resetField("imgUrl")
    closeModal();
  }


  return (
    <div className={classTitle}>
      <button className='close-modal__btn'>
        <IoMdCloseCircleOutline onClick={() => {closeModal(); resetField("imgUrl")}} />
      </button>
      {isOn && <form className='modal__form' onSubmit={handleSubmit(onSubmit)}>  
        <label 
          htmlFor='img_url'
          className='modal__form__label'
          >
          {errors.imgUrl ? errors.imgUrl.message : "Image url"}
        </label>
        <input {...register("imgUrl")}
          type='text'
          id='img_url'
          autoComplete='off'
          placeholder='Image url here...'
        />
        <button 
          className='confirm__btn--small'
          >
          {addImgUrl && "Add"}
          {editImgUrl && "Save"}
        </button>
      </form>}
    </div>
  )
}

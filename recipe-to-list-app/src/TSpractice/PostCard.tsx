import { PostProps } from "../types/types";

export default function PostCard({title, body}: PostProps) {

  return (
    <div className='postcard'>
      <h3 className='post__title'>{title}</h3>
      <p>{body}</p>
    </div>
  )
}

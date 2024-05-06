import { useEffect, useState } from 'react';
import PostCard from './PostCard';
import { PostProps } from '../types/types';

export default function PostList() {

  const [postsData, setPostsData] = useState([]); 

  useEffect(() => {
    async function getData() {
      fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(json => setPostsData(json))
    }
    getData();
  }, []) 

  const postsArr = postsData.map((post: PostProps) => {
    return <PostCard key={post.id} id={post.id} title={post.title} body={post.body} />
  })

  return (
    <div className='post__list'>
      {postsArr}
    </div>
  )
}

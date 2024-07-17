import React from 'react'

export default function EventExample() {

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
  }

  // const deletePost = ((e: React.MouseEvent<HTMLButtonElement>, postId: number) => {
  //   e.preventDefault();
  // })

  const postsArr = [
    {
      id: 1,
      title: "title one",
      body: "post 1 test text"
    },
    {
      id: 2,
      title: "title two",
      body: "post 2 test text"
    },
  ]

  const posts = postsArr.map(post => {
    return (
      <div key={post.id}>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
        <form>
        {/* <button onClick={(e) => deletePost(e, post.id)}>Press me</button> */}
      </form>
      </div>
    )
  })

  return (
    <div>
      <form>
        <input 
          type='text' 
          placeholder='Search for anything...'
          onChange={handleChange}
        />
        <button onClick={handleClick}>Press me</button>
      </form>
      {posts}
    </div>
  )
}

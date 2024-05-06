// import React from 'react'

import { useEffect, useRef } from "react"

export default function UseRefExample() {

  const inputRef = useRef<HTMLInputElement>(null)
  const usernameInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])


  const handleClick = () => {
    console.log("username is: " + usernameInputRef.current?.value)
  }

  return (
    <div>
      <input ref={inputRef} type='text' placeholder='focus here' />
      <input ref={usernameInputRef} type='text' placeholder='username' />
      <button onClick={handleClick}>Send</button>
    </div>
  )
}

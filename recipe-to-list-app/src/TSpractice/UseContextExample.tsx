import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'

export default function UseContextExample() {

  const {state, dispatch} = useContext(ThemeContext)

  console.log(state)

  return (
    <div>
      <button onClick={() => dispatch({type: "CHANGE_THEME"})}>Change Theme</button>
      <button onClick={() => dispatch({type: "CHANGE_FONTSIZE", payload: 20})}>Change Theme</button>
    </div>
  )
}

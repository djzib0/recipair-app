// import React from 'react'
import Item from './Item'

export default function ItemList() {
  return (
    <div>
        <Item id={1} title='title' extra={[{firstName: "haha", lastName: "hehe"}, {firstName: "hihi", lastName: "hoho"}]} />
    </div>
  )
}

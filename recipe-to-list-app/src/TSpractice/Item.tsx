// import React from 'react'

type ItemProps<T> = {
  id: number;
  title: string;
  extra?: T[]
}

type User = {
  firstName: string;
  lastName: string;
}

export default function Item(props: ItemProps<User>) {

  const {id, title, extra} = props;


  const itemsArr = extra?.map(item => {
    return (
      <div key={id}>
      <p>{item.firstName} - {item.lastName}</p>
    </div>
    )
  })

  return (
    <div>{id} - {title}
      {itemsArr}
    </div>
  )
}

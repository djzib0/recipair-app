// import React from 'react'

export default function Parent({children}: {children: React.ReactNode}) {
  return (
    <div>
        <h1>This is the parent</h1>
        {children}
    </div>
  )
}

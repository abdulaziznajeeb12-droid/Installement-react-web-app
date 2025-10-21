import React, { useState } from 'react'

export default function Footer({condition,message}) {
  return (
    <div>
        {
            condition ? (<h1>you are right</h1>) : ( <h1>you are wrong</h1>)
            
        }
        {template}
        <div>
<h1>{message}</h1>
</div>
    </div>
    
  )
}

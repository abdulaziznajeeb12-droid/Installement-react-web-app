import React from 'react';

export default function Todos({ todos  }) {

  return (
    <div>
        <form>
            <input type='text' placeholder value={title} onChange={(e)=>{settittle(e.target.value)}}></input>
        </form>
      <h1>Todos</h1>
      
      <ul>

        {todos.map((item) => (
          <li>
            {item.title} - {item.name}
            <button className='button'>delete</button>

          </li>
        ))}
      </ul>
    </div>
  );
}

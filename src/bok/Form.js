import React,{useState} from 'react'

export default function Form({heading}) {
    const handleupclick = () =>{
        console.log('upper case was clicked'+ text)
        
        
      let newText =  (text.toUpperCase()) ; // Correct
      setText(newText);

        
        
    }
    const handledownclick = ()=>{
        setText(text.toLowerCase());
        
    }
    const handleonchange =(event)=>{
         console.log("lower case was clear "+ text)
        setText(event.target.value)
       
    }
    const clear=()=>{
        setText('');
    }
    
    const [text,setText] = useState('enter text here');

  return (
    <div className='container'>
        <div className="mb-3 my-5">
  <h1>{heading}</h1>
  
  <textarea className="form-control" id="exampleFormControlTextarea1" rows="5" value={text} onChange={handleonchange}></textarea>
 
 <button type="button" className="btn btn-primary my-3 mx-5" onClick={handledownclick}>convert to upper case</button>
  <button type="button" className="btn btn-primary my-3 mx-5" onClick={handleupclick}>convert to upper case</button>

  <button type="button" className="btn btn-primary my-3 mx-5" onClick={clear}>clear</button>
    
</div>
 <div className='container'>
        <h1>new box</h1>
        <p>
         characters   {text.length} words
            {text.split(' ').length}
        </p>
    </div>
    </div>
    
  )
}

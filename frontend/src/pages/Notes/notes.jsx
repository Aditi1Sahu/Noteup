import './notes.css'
import { useState } from 'react'
const Notes = () => {

     const [title, setTitle] = useState("")
     const [content, setContent] = useState("")

     const handlesubmit=(e)=>{
        e.preventDefault();

        console.log(title)
        console.log(content)
     }
  

  return (
    <div className="main">
     
     <form onSubmit={handlesubmit }>

       <label htmlFor="title">Title</label>
       <input type="text" id="title" onChange={ (e)=>{ setTitle(e.target.value) }   } />

    


       <label htmlFor="content">Content</label>
       <textarea name="content" id="content" onChange={ (e)=>{ setContent(e.target.value) }   }></textarea>

       <button className="savenote">Save</button>


     </form>



    </div>
  )
}

export default Notes
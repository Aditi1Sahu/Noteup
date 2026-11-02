const Note =require("../models/note.model.js")

const createNote = async (req, res) => {
       const {title,content}= req.body

       if(!title || !content){
        return res.status(400).json({
            message:"Title and Content are required"
        })
       }

       const userId=req.userId


       const note= await Note.create({
        title,
        content,
        user:userId
       })


       return res.status(201).json({
        message:"Note create successfully!!!!"
       })
}

const getNotes = async (req, res) => {
    const userId=req.userId
    const notes= await Note.find({user:userId})

     return res.status(200).json({
        notes
    })
}


const deleteNote =async (req,res)=>{
    const noteId= req.params.id
    const userId=req.userId

    const note=await Note.findOneAndDelete({
        _id:noteId,
        user:userId
    })

    if(!note){
        return res.status(404).json({
            message: "Note not found"
        })
    }

    return res.status(200).json({
    message: "Note deleted successfully"
})

}


const updateNote =async (req,res)=>{
    const noteId =req.params.id
    const userId =req.userId
    const { title,content }=req.body

    if(!title || !content){
       return res.status(400).json({
            message:"Title and Content both are required."
        })
    }

    const note= await Note.findOneAndUpdate( 
        {_id:noteId, user:userId},
        {title,content},
        {new:true}
    
    )

    if(!note){
        return res.status(404).json({
            message:"Note not found."
        })
    }

     return res.status(200).json({
            message:"Note updated successfully!!",
            note
        })

}

module.exports = { createNote , getNotes , deleteNote , updateNote}
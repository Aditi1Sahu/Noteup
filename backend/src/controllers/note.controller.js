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


module.exports = { createNote , getNotes }
const express = require("express")
const noteController = require("../controllers/note.controller.js")
const authMiddleware = require("../middleware/auth.middleware.js")

const router=express.Router()

router.post("/",authMiddleware,noteController.createNote)
router.get("/",authMiddleware,noteController.getNotes)
router.delete("/:id",authMiddleware,noteController.deleteNote)
router.put("/:id",authMiddleware,noteController.updateNote)

module.exports = router
const express=require("express")
const authRoutes= require("./routes/auth.routes.js")
const cookieParser = require("cookie-parser")
const noteRoutes= require("./routes/note.routes.js")

const app= express();
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",authRoutes)
app.use("/api/notes",noteRoutes)

app.get("/",(req,res)=>{
    res.send("Your Noteup backend is runnong now.")
})
module.exports= app;
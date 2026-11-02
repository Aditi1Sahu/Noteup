require("dotenv").config()
const connectDB =require("./config/db.js")
const app= require("./app.js")

const startServer = async () => {
    try {
        await connectDB()

        app.listen(process.env.PORT || 5000, () => {
            console.log("Server running at 5000 💙")
        })
    } catch (err) {
        console.error("Failed to start server:", err.message)
        process.exit(1)
    }
}

startServer()
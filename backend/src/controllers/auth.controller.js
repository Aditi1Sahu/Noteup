const User =require("../models/user.model.js")
const bcrypt =require("bcryptjs")
const jwt =require("jsonwebtoken")

const registerUser = async (req,res)=>{
    const {name,email,password}= req.body

    if(!email || !name || !password){

        return res.status(400).json({
            "message":"All fields are required"
        })
    }

    const existingUser= await User.findOne({email})

    if(existingUser){
        return res.status(409).json({
            message:"User already exists"
        })
    }

    const hashedpassword=await bcrypt.hash(password,10)

    const user=await User.create({
        name,
        email,
        password:hashedpassword
    })

    return res.status(201).json({
        message:"User created successfully"
    })
}


const loginUser = async (req,res)=>{

    const {email,password} =req.body

    if(!email || !password){
        return res.status(400).json({
            message:"Email and Password both are required."
        })
    }

    const user= await User.findOne({email})

    if(!user){
        return res.status(401).json({
            message:"Invalid email or password."
        })
    }


    const ispasswordcorrect = await bcrypt.compare(password, user.password)
     
     if(!ispasswordcorrect){
        return res.status(401).json({
            message:"Invalid email or password."
        })
    }


    const token = jwt.sign(
        {userId:user._id},
        process.env.JWT_SECRET,
        {expiresIn:"7d"}
    )


    res.cookie("authToken", token ,{
        httpOnly:true,
        secure:process.env.NODE_ENV=== 'production',
        sameSite:"lax",
        maxAge:7*24*60*60*1000
    })

    return res.status(200).json({
        "message":"login successfull!!!!!!!"
    })

}

const logoutUser =async(req,res)=>{
    res.clearCookie("authToken",{
        httpOnly :true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: "lax"

    })


      return res.status(200).json({
        message: "Logout successful"
    })
}

module.exports ={registerUser ,loginUser,logoutUser}



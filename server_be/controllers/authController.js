const User = require('../models/user.model')
const jwt = require('jsonwebtoken')

// generate the JWT TOKEN
const generateToken = (id) => {
    return jwt.sign(
        {id} , 
        process.env.JWT_SECRET,
        {
            expiresIn: "1h"
        }
    )
}

// exporting register Functionlity
exports.registerUser = async (req , res) => {
    // since data is sent by the form-data =>  req.body

    const { fullName , email , password , profileImageUrl} = req.body;

    // validate for empty
    if(!fullName || !email || !password){
        return res.status(400).json({
            message: "All fields are required.."
        })
    }

    console.log( fullName , email , password , profileImageUrl);
    console.log(User);
    
    

    try {
        
        // check for user email exist or not
        const existingUser  = await User.findOne({email})

        if(existingUser){
            return res.status(400).json({
                message: "Email already exist.."
            })
        }

        // create new user..
        const user = await User.create({
            fullName,
            email,
            password,
            profileImageUrl
        })

        res.status(201).json({
            id:user._id,
            user,
            token: generateToken(user._id)
        })


    } catch (err) {
        res
            .status(500)
            .json({
                message:" Error in registering the user.." , error : err.message
            })

    }

}



// exporting login Functionlity
exports.loginUser = async (req , res) => {

    const { email , password} = req.body;
    // validate for empty
    if(!email || !password){
        return res.status(400).json({
            message: "All fields are required.."
        })
    }

    console.log(email , password);
    
    try {
        
        // check for user email exist or not
        const user  = await User.findOne({email});

        console.log(user , "login user");
        

        if(!user || !(await user.comparePassword(password))){
            return res.status(400).json({
                message: "Invalid credentials.."
            })
        }
        res.status(200).json({
            id:user._id,
            user,
            token: generateToken(user._id)
        })
    } catch (err) {
        res
            .status(500)
            .json({
                message:" Error in login the user.." , error : err.message
            })
    }


}



// exporting get User Data Functionlity
exports.getUserInfo = async (req , res) => {

    try {
        const user = await User.findById(req.user.id).select("-password")
    
        if(!user){
            return res.status(404).json({
                message: "User not found.."
            })
        }
    
        res.status(200).json({
            user
        })
    } catch (err) {
        res
            .status(500)
            .json({
                message:" Error in getting the user info.." , error : err.message
            })
    }



}


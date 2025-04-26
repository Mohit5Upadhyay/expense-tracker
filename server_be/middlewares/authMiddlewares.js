

// route protecting
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

exports.protect = async(req, res , next) => {

    let token = req.headers.authorization?.split(" ")[1];

    if(!token){
        return res.status(401).json({
            message: "Unauthorized user.."
        })
    }

    console.log( "token from auth middleware" , token);

    console.log(User);
    // console.log(user);
    console.log(await req.user);
    
    

    try {
        const decoded = jwt.verify(token , process.env.JWT_SECRET)

        console.log(decoded , "decoded token from auth middleware");
        

        req.user = await User.findById(decoded.id).select("-password");

        console.log(req.user , "user from auth middleware");
        
        next();

    } catch (error) {
        res.status(401).json({
            message: "Unauthorized user.. , token expired..."
        })
    }


}

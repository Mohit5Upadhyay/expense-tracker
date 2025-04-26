const mongoose = require('mongoose')

const bcrypt = require('bcryptjs')


const UserSchema = new mongoose.Schema({
    fullName: {
        type:String,
        required: [true , "Name is required."]
    },
    email: {
        type: String,
        required: [true , "Email is required.."],
        unique: true
    },
    password: {
        type: String, // hashed
        required: [true , "password is required.."]
    },
    profileImageUrl: {
        type: String , 
        default: null
    }
} , {timestamps: true})



// hash password
UserSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password , 10);
    next();
})


// comparing when login..
UserSchema.methods.comparePassword = async function (candidatePassword){
    return await bcrypt.compare(candidatePassword , this.password);
}



module.exports =  mongoose.model('User' , UserSchema);



const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const response = await mongoose.connect(process.env.MONGODB_URI,{

        })

        console.log("MongoDB Connected :--->" , response.connection.host);
        
    } catch (err) {
        console.log("Error :: dbConnect.js File ::" , err);
        process.exit(1);
    }
}

module.exports = connectDB



const multer = require('multer');

//configuring multer storage
const storage = multer.diskStorage({
    destination: (req, file , cb) => {
        cb(null, 'uploads/')
    },
    filename: (req , file , cb) => {
        cb(null , `${Date.now()}-${file.originalname}`)
    },
})


// file filter for image only
const fileFilter = (req , file , cb) => {
    const allowedTypes = ['image/jpeg' , 'image/jpg' , 'image/png']

    if(allowedTypes.includes(file.mimetype)){
        cb(null , true)
    } else {
        cb(new Error('Only .png , .jpg and .jpeg format allowed..'), false)
    }
}

const upload =  multer({storage , fileFilter})
// console.log(upload , "upload middleware");


module.exports = upload;
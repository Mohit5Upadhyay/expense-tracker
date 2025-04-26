
const express = require("express")
const { protect } = require("../middlewares/authMiddlewares")

const {
    registerUser,
    loginUser,
    getUserInfo
} = require('../controllers/authController');
const upload = require("../middlewares/uploadMiddleware");


const router = express.Router();

router.post('/register' , registerUser)
router.post('/login',loginUser)

// Protected Routed -  oonly login user can use it.
router.get('/me' , protect , getUserInfo)


// uploading profile image
router.post('/upload-image' , upload.single("image") ,(req ,res) => {

    if(!req.file){
        return res.status(400).json({
            message: "Image not found.."
        })
    }

    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`

    res
        .status(200)
        .json({ imageUrl , message: "Image uploaded successfully.."})

})

module.exports = router;
const express = require("express")
const router = express.Router()
const { getAllUser ,createUser, updateUser, deleteUser} = require('../Controller/UserListing');
const {auth} = require('../middlewares/auth')
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, "./client/public/Images")
    },
    filename: function(req,file,cb){
        const uniqueSuffix = Date.now();
        cb(null,uniqueSuffix + file.originalname);
    }
})
const upload = multer({storage:storage})


router.get('/getuserlisting',auth,getAllUser)
router.post('/createUser',auth,createUser)
router.put('/edituser/:id',auth, upload.single("img"),updateUser)
router.delete('/deleteuser/:userId',auth,deleteUser)

module.exports = router
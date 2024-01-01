const UserListing = require("../model/UserListing")

//get all user
exports.getAllUser = async(req,res)=>{
    try {
        const Listing = await UserListing.find({})
        return res.json({
            success:true,
            message:"user listing fetch successfully",
            users:Listing
        })
    } catch (error) {
        res.json({
            success:false,
            message:"user listing fetch error"
        })
    }
}
//create new user
exports.createUser = async(req,res)=>{
     try {
        const {UserName,Email,Phone} = req.body;
        if(!UserName || !Email || !Phone){
            return res.json({
                success:false,
                message:"all field required"

            })
        }
        const newUser = await UserListing.create({UserName,Email,Phone})
        newUser.save()
        return res.json({
            success:true,
            message:"created successfully",
            user:newUser
        })
     } catch (error) {
        return res.json({
            success:false,
            message:"error in creating user"

        })
     }
}

exports.updateUser = async(req,res)=>{
    try {
        const {UserName,Email,Phone,id} = req.body;
        if(!UserName || !Email || !Phone || !id){
            return res.json({
                success:false,
                message:"all fields are required"
            })
    
        }
    
        const updatedUser = await UserListing.findByIdAndUpdate(id,{
            UserName:UserName,
            Email:Email,
            Phone:Phone,
           
        },
        {new:true})
        return res.json({
            success:true,
            message:"user updated successfully",
            user:updatedUser
    
        })
    } catch (error) {
        return res.json({
            success:false,
            message:"error in updating user"
        })
    }
   
}

exports.deleteUser = async(req,res)=>{
    try {
        // const {userId} = req.body; 
        const userId = req.params.userId;
        console.log("reqbody",userId)
       
        if(!userId){
            return res.json({
                success:false,
                message:"all fields are required"
            })  
        }
        const deletedUser = await UserListing.findByIdAndDelete({_id:userId})
        return res.json({
            success:true,
            message:false,
            deletedUser
        })

    } catch (error) {
        return res.json({
            success:false,
            message:"error in deleting user"
        })
    }
}



exports.updateProfilePicture =  async(req,res)=>{
    const {id} = req.body;
    const imageName = req.file.filename
    console.log("id",id,imageName)
    try {
        
        if(!imageName || !id){
            return res.json({
                success:false,
                message:"all fields are required"
            })
        }

        const updatedUser = await UserListing.findByIdAndUpdate(id,{
            Image:imageName
        },
        {new:true})
        return res.json({
            success:true,
            message:"image updated successfully",
            user:updatedUser
    
        })
    } catch (error) {
        return res.json({
            success:false,
            message:"error in updating image"
        })
    }
}
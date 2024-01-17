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
        const firstname = UserName.split(" ")[0]
        const lastname = UserName.split(" ")[1]
        const image = `https://ui-avatars.com/api/?name=${firstname}+${lastname}?background=9E0047&color=9E0047`
        console.log(image)
        const data = {
            UserName,
            Email,
            Phone,
            Image:image
        }
        const newUser = await UserListing.create(data)
      
        console.log(newUser)
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
        console.log("updateuser_Req_body", req.body)
        const {UserName,Email,Phone} = req.body;
        const {id} = req.params
        const imageName = req.file ? req.file.filename : undefined;
     
        console.log("req_body",req.body)
        if(!UserName || !Email || !Phone || !id){
            return res.json({
                success:false,
                message:"all fields are required"
            })
    
        }
    
        const updateFields = {
            UserName: UserName,
            Email: Email,
            Phone: Phone,
          };
          if (imageName) {
            updateFields.Image = imageName;
          }
      
          const updatedUser = await UserListing.findByIdAndUpdate(
            id,
            updateFields,
            { new: true }
          );
         console.log('updateduser',updatedUser)

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


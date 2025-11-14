import User from "../models/user.js"


export const protect = async(req,resizeBy,next)=>{

    const {userId} = req.auth;

    if(!userId){
        res.json({success: false, message:"not authorised"})

    }
    else{
        const user = await User.findById(userId);
        req.user = user;
        next()
    }
}
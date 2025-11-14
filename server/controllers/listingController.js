import Listing from "../models/listing.js"
import User from "../models/user.js"

export const listHotel = async(req,res)=>{
    try {
        const {title, description, location, amenities } = req.body;
        const owner = req.use._id;
    const listing = await Listing.findOne({owner})
    if (listing) {
        return res.json({success: false, message: "Already Listed"})
    }
    await Listing.create({title, description, location, amenities, owner})
    await User.findByIdAndUpdate(owner, {role: "hotelOwner"});
    res.json({success: true,message:"Listing Complete"});
    
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}
export const getUserData = async(req, res)=> {
 try{
    const role =req.user.role;
    const previousBookings = req.user.previousBookings;
    res.json({success: true, role, previousBookings})
 }  
 catch(error){
    res.json({success: false, message: error.message})
 } 
}


export const storePreviousBookings = async (req,res)=>{
    try {
        const{currentBooking} = req.body;
        const user = await req.user;

        if (user.previousBookings.length<3) {
            user.previousBookings.push(currentBooking)
        }else{
            user.previousBookings.shift();
            user.previousBookings.push(currentBooking)
        }
        awaituser.save();
        res.kson({success:true, message: "booking added"})

    } catch (error) {
        res.json({success:false, message: error.message})
        
    }
};
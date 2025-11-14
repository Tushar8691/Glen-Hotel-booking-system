import express from "express";
import  {protect} from "../middleware/authMiddleware.js";
import { getUserData, storePreviousBookings } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get('/',protect, getUserData);
userRouter.post('/store-new-booking',protect, storePreviousBookings);
 

export default userRouter;
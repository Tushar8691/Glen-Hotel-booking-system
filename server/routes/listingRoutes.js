import express from 'express';
import {protect} from '../middleware/authMiddleware.js'
import { listHotel } from '../controllers/listingController.js';


const listingRouter = express.Router();
listingRouter.post('/', protect, listHotel)

export default listingRouter;
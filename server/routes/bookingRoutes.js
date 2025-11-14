import express from 'express';
import { 
  createBooking, 
  getUserBookings, 
  getBookingById,
  cancelBooking,
  checkAvailability,
  calculateBookingPrice,
  getAllBookings 
} from '../controllers/bookingController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/check-availability', checkAvailability);
router.post('/calculate-price', calculateBookingPrice);

// Protected routes (require authentication)
router.use(protect); // Apply authentication middleware to all routes below

// User booking routes
router.post('/', createBooking);
router.get('/my-bookings', getUserBookings);
router.get('/:bookingId', getBookingById);
router.patch('/:bookingId/cancel', cancelBooking);

// Admin routes (you can add admin middleware later)
router.get('/admin/all-bookings', getAllBookings);

export default router;

import Booking from '../models/Booking.js';
import User from '../models/user.js';
import Listing from '../models/listing.js';
import { sendConfirmationEmail, sendBookingUpdateEmail } from '../utils/emailSender.js';

// Calculate total booking price: per person price * guests * number of days
export const calculateBookingPrice = async (req, res) => {
  try {
    const { hotelId, checkInDate, checkOutDate, guests } = req.body;

    // Validate input
    if (!hotelId || !checkInDate || !checkOutDate || !guests) {
      return res.status(400).json({ 
        success: false, 
        message: "Missing required fields: hotelId, checkInDate, checkOutDate, guests" 
      });
    }

    // Get hotel details
    const hotel = await Listing.findById(hotelId);
    if (!hotel) {
      return res.status(404).json({ 
        success: false, 
        message: "Hotel not found" 
      });
    }

    // Calculate number of days
    const startDate = new Date(checkInDate);
    const endDate = new Date(checkOutDate);
    
    if (startDate >= endDate) {
      return res.status(400).json({ 
        success: false, 
        message: "Check-out date must be after check-in date" 
      });
    }

    const diffInTime = endDate.getTime() - startDate.getTime();
    const numberOfDays = Math.ceil(diffInTime / (1000 * 3600 * 24));

    if (numberOfDays <= 0) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid date range" 
      });
    }

    // Calculate total price: per person price * guests * number of days
    const pricePerPersonPerDay = hotel.pricePerNight || 0;
    const totalPrice = pricePerPersonPerDay * guests * numberOfDays;

    res.json({ 
      success: true, 
      data: {
        hotelTitle: hotel.title,
        pricePerPersonPerDay,
        numberOfDays,
        guests: parseInt(guests),
        totalPrice,
        breakdown: {
          basePrice: pricePerPersonPerDay,
          guests: parseInt(guests),
          nights: numberOfDays,
          calculation: `$${pricePerPersonPerDay} × ${guests} guests × ${numberOfDays} nights = $${totalPrice}`
        }
      }
    });
  } catch (error) {
    console.error('Price calculation error:', error);
    res.status(500).json({ 
      success: false, 
      message: "Error calculating booking price: " + error.message 
    });
  }
};

// Check availability for specific dates
export const checkAvailability = async (req, res) => {
  try {
    const { hotelId, checkInDate, checkOutDate } = req.body;

    if (!hotelId || !checkInDate || !checkOutDate) {
      return res.status(400).json({ 
        success: false, 
        message: "Missing required fields: hotelId, checkInDate, checkOutDate" 
      });
    }

    const startDate = new Date(checkInDate);
    const endDate = new Date(checkOutDate);

    // Find overlapping bookings
    const overlappingBookings = await Booking.find({
      hotel: hotelId,
      status: { $ne: 'cancelled' }, // Exclude cancelled bookings
      $or: [
        {
          checkInDate: { $lt: endDate },
          checkOutDate: { $gt: startDate }
        }
      ]
    });

    const isAvailable = overlappingBookings.length === 0;

    res.json({ 
      success: true, 
      available: isAvailable,
      conflictingBookings: overlappingBookings.length,
      message: isAvailable ? "Hotel is available for selected dates" : "Hotel is not available for selected dates"
    });
  } catch (error) {
    console.error('Availability check error:', error);
    res.status(500).json({ 
      success: false, 
      message: "Error checking availability: " + error.message 
    });
  }
};

// Create new booking
export const createBooking = async (req, res) => {
  try {
    const { hotelId, checkInDate, checkOutDate, guests } = req.body;
    const userId = req.auth.userId;

    // Validate input
    if (!hotelId || !checkInDate || !checkOutDate || !guests) {
      return res.status(400).json({ 
        success: false, 
        message: "Missing required fields: hotelId, checkInDate, checkOutDate, guests" 
      });
    }

    // Get hotel details
    const hotel = await Listing.findById(hotelId);
    if (!hotel) {
      return res.status(404).json({ 
        success: false, 
        message: "Hotel not found" 
      });
    }

    // Get user details
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    const startDate = new Date(checkInDate);
    const endDate = new Date(checkOutDate);

    // Validate dates
    if (startDate >= endDate) {
      return res.status(400).json({ 
        success: false, 
        message: "Check-out date must be after check-in date" 
      });
    }

    if (startDate < new Date()) {
      return res.status(400).json({ 
        success: false, 
        message: "Check-in date cannot be in the past" 
      });
    }

    // Check availability
    const overlappingBookings = await Booking.find({
      hotel: hotelId,
      status: { $ne: 'cancelled' },
      $or: [
        {
          checkInDate: { $lt: endDate },
          checkOutDate: { $gt: startDate }
        }
      ]
    });

    if (overlappingBookings.length > 0) {
      return res.status(400).json({ 
        success: false, 
        message: "Hotel not available for selected dates. Please choose different dates." 
      });
    }

    // Calculate total price
    const numberOfDays = Math.ceil((endDate - startDate) / (1000 * 3600 * 24));
    const totalPrice = hotel.pricePerNight * guests * numberOfDays;

    // Create booking
    const newBooking = await Booking.create({
      user: userId,
      hotel: hotelId,
      checkInDate: startDate,
      checkOutDate: endDate,
      guests: parseInt(guests),
      totalPrice: totalPrice,
      status: 'confirmed',
      bookingDate: new Date()
    });

    // Populate booking with hotel details
    await newBooking.populate('hotel');
    await newBooking.populate('user');

    // Update user's booking history
    await User.findByIdAndUpdate(
      userId,
      { $push: { previousBookings: newBooking._id } },
      { new: true }
    );

    // Send confirmation email (async, don't block response)
    sendConfirmationEmail(user.email, newBooking, hotel, user.username || user.email)
      .then(emailResult => {
        console.log('Glen confirmation email result:', emailResult);
      })
      .catch(emailError => {
        console.error('Glen confirmation email error:', emailError);
      });

    res.status(201).json({ 
      success: true, 
      message: "Booking created successfully! Glen confirmation email sent to " + user.email,
      booking: {
        id: newBooking._id,
        hotel: {
          title: hotel.title,
          location: hotel.location
        },
        checkInDate: newBooking.checkInDate,
        checkOutDate: newBooking.checkOutDate,
        guests: newBooking.guests,
        totalPrice: newBooking.totalPrice,
        status: newBooking.status,
        bookingDate: newBooking.bookingDate
      },
      priceBreakdown: {
        pricePerPersonPerDay: hotel.pricePerNight,
        numberOfDays,
        guests: parseInt(guests),
        totalPrice,
        calculation: `$${hotel.pricePerNight} × ${guests} guests × ${numberOfDays} nights = $${totalPrice}`
      }
    });
  } catch (error) {
    console.error('Glen booking creation error:', error);
    res.status(500).json({ 
      success: false, 
      message: "Error creating booking: " + error.message 
    });
  }
};

// Get user's bookings
export const getUserBookings = async (req, res) => {
  try {
    const userId = req.auth.userId;

    const bookings = await Booking.find({ user: userId })
      .populate('hotel', 'title location images pricePerNight')
      .sort({ bookingDate: -1 });

    res.json({ 
      success: true, 
      bookings,
      count: bookings.length,
      message: bookings.length > 0 ? `Found ${bookings.length} bookings` : "No bookings found"
    });
  } catch (error) {
    console.error('Get user bookings error:', error);
    res.status(500).json({ 
      success: false, 
      message: "Error fetching bookings: " + error.message 
    });
  }
};

// Get booking by ID
export const getBookingById = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const userId = req.auth.userId;

    const booking = await Booking.findOne({ 
      _id: bookingId, 
      user: userId 
    }).populate('hotel').populate('user');

    if (!booking) {
      return res.status(404).json({ 
        success: false, 
        message: "Booking not found" 
      });
    }

    res.json({ 
      success: true, 
      booking 
    });
  } catch (error) {
    console.error('Get booking by ID error:', error);
    res.status(500).json({ 
      success: false, 
      message: "Error fetching booking: " + error.message 
    });
  }
};

// Cancel booking
export const cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const userId = req.auth.userId;

    const booking = await Booking.findOne({ 
      _id: bookingId, 
      user: userId 
    }).populate('hotel').populate('user');

    if (!booking) {
      return res.status(404).json({ 
        success: false, 
        message: "Booking not found" 
      });
    }

    if (booking.status === 'cancelled') {
      return res.status(400).json({ 
        success: false, 
        message: "Booking is already cancelled" 
      });
    }

    // Update booking status
    booking.status = 'cancelled';
    booking.cancelledAt = new Date();
    await booking.save();

    // Send cancellation email
    sendBookingUpdateEmail(
      booking.user.email, 
      booking, 
      booking.hotel, 
      'cancelled',
      booking.user.username || booking.user.email
    ).catch(console.error);

    res.json({ 
      success: true, 
      message: "Booking cancelled successfully. Cancellation email sent.",
      booking: {
        id: booking._id,
        status: booking.status,
        cancelledAt: booking.cancelledAt
      }
    });
  } catch (error) {
    console.error('Cancel booking error:', error);
    res.status(500).json({ 
      success: false, 
      message: "Error cancelling booking: " + error.message 
    });
  }
};

// Get all bookings (admin only)
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('user', 'username email')
      .populate('hotel', 'title location pricePerNight')
      .sort({ bookingDate: -1 });

    res.json({ 
      success: true, 
      bookings,
      count: bookings.length 
    });
  } catch (error) {
    console.error('Get all bookings error:', error);
    res.status(500).json({ 
      success: false, 
      message: "Error fetching all bookings: " + error.message 
    });
  }
};

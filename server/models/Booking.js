import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Listing',
    required: true
  },
  checkInDate: {
    type: Date,
    required: true
  },
  checkOutDate: {
    type: Date,
    required: true
  },
  guests: {
    type: Number,
    required: true,
    min: 1
  },
  totalPrice: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'confirmed'
  },
  bookingDate: {
    type: Date,
    default: Date.now
  },
  cancelledAt: {
    type: Date
  },
  specialRequests: {
    type: String,
    maxLength: 500
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  }
}, {
  timestamps: true
});

// Index for efficient queries
bookingSchema.index({ user: 1, bookingDate: -1 });
bookingSchema.index({ hotel: 1, checkInDate: 1, checkOutDate: 1 });
bookingSchema.index({ status: 1 });

// Virtual for number of nights
bookingSchema.virtual('numberOfNights').get(function() {
  return Math.ceil((this.checkOutDate - this.checkInDate) / (1000 * 60 * 60 * 24));
});

// Ensure virtuals are included in JSON output
bookingSchema.set('toJSON', { virtuals: true });

export default mongoose.model('Booking', bookingSchema);

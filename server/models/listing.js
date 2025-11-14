// listing.js
import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  owner:{
    type:String,
    required: true,
    ref: "user"
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
      type: String,
      required: true
  },
  pricePerNight: {
    type: Number,
    required: true,
    min: 0
  },
  images: [{
    type: String,
    required: true
  }],
  amenities: [{
    type: String
  }],
  roomTypes: [{
    name: String,
    description: String,
    price: Number,
    capacity: Number
  }],
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviews: [{
    userId: {
      type: String,
      ref: 'User'
    },
    rating: Number,
    comment: String,
    date: Date
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for search optimization
listingSchema.index({ title: 'text', description: 'text' });
listingSchema.index({ 'location.city': 1, 'location.state': 1 });

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;

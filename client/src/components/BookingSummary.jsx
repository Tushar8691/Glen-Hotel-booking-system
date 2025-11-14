// components/BookingSummary.jsx
import React from "react";

export function BookingSummary({ bookingData }) {
  const { hotel, searchData, totalAmount } = bookingData;
  
  if (!hotel || !searchData) return null;

  const startDate = new Date(searchData.checkIn);
  const endDate = new Date(searchData.checkOut);
  const nights = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

  return (
    <div className="booking-summary">
      <div className="hotel-info">
        <h2>{hotel.title}</h2>
        <p>{hotel.description}</p>
        <p>{hotel.location}</p>
      </div>

      <div className="booking-details">
        <div className="detail-group">
          <h3>Your Stay</h3>
          <p><strong>Check-in:</strong> {startDate.toDateString()}</p>
          <p><strong>Check-out:</strong> {endDate.toDateString()}</p>
          <p><strong>Nights:</strong> {nights}</p>
        </div>

        <div className="detail-group">
          <h3>Guests</h3>
          <p>{searchData.guests} {searchData.guests > 1 ? "guests" : "guest"}</p>
        </div>
      </div>

      <div className="price-summary">
        <h3>Price Details</h3>
        <div className="price-row">
          <span>Base Price</span>
          <span>₹{hotel.pricePerNight} × {searchData.guests} guests × {nights} nights</span>
          <span>₹{hotel.pricePerNight * searchData.guests * nights}</span>
        </div>
        
        <div className="price-row total">
          <span>Total Amount</span>
          <span>₹{totalAmount}</span>
        </div>
      </div>

      <div className="cancellation-policy">
        <p>Free cancellation until 24 hours before check-in. After that, the first night will be charged.</p>
      </div>
    </div>
  );
}

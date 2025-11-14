import React, { useState, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

const Booking = () => {
  const { hotelId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get hotel data and search data from navigation state
  const hotelData = location.state?.hotel;
  const searchData = location.state?.searchData;

  // If no hotel data, redirect back to hotels
  if (!hotelData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-500">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No Hotel Selected</h2>
          <p className="text-gray-600 mb-6">Please select a hotel to proceed with booking.</p>
          
        </div>
      </div>
    );
  }

  // Controlled form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  // Modal / confirmation state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('pay_at_hotel');
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [bookingRef, setBookingRef] = useState(null);
  const slipRef = useRef();

  const getNumberOfNights = () => {
    try {
      if (searchData?.checkIn && searchData?.checkOut) {
        const start = new Date(searchData.checkIn);
        const end = new Date(searchData.checkOut);
        const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        return diff > 0 ? diff : 1;
      }
    } catch (e) {
      // ignore and fallback
    }
    return 1;
  };

  const nights = getNumberOfNights();
  const guests = searchData?.guests || 1;
  const basePrice = hotelData.pricePerNight;
  const taxes = Math.round(basePrice * 0.18 * nights * guests);
  const total = Math.round(basePrice * nights * guests + taxes);

  const openConfirmation = () => {
    // basic validation
    if (!firstName || !lastName || !email || !phone) {
      alert('Please fill in required guest details (first name, last name, email, phone).');
      return;
    }

    setIsModalOpen(true);
    setPaymentStatus(null);
    setBookingRef(null);
  };

  const closeModal = () => setIsModalOpen(false);

  const simulateCreateBooking = async (method) => {
    // This is a local simulation. Replace this with a real API call to create booking
    // Example: POST /api/bookings with body { hotelId, checkInDate, checkOutDate, guests }
    setPaymentStatus('processing');
    await new Promise((r) => setTimeout(r, 1000));
    const ref = 'BK-' + Date.now().toString(36).toUpperCase();
    setBookingRef(ref);
    setPaymentStatus(method === 'pay_now' ? 'paid' : 'pending');
    // Persist booking locally so it can be shown in MyBookings
    try {
      const existing = JSON.parse(localStorage.getItem('localBookings') || '[]');
      const newBooking = {
        id: ref,
        bookingRef: ref,
        title: hotelData.title,
        subtitle: hotelData.subtitle || hotelData.title,
        location: hotelData.location,
        status: method === 'pay_now' ? 'confirmed' : 'pending',
        checkIn: searchData?.checkIn || '-',
        checkOut: searchData?.checkOut || '-',
        guests: `${searchData?.guests || 1} Guests`,
        price: `₹${total.toLocaleString()}`,
        nights,
        src: hotelData.src,
        totalPrice: total,
        bookingDate: new Date().toISOString(),
      };
      existing.unshift(newBooking);
      localStorage.setItem('localBookings', JSON.stringify(existing));
      // notify other tabs/components that local bookings changed
      try {
        window.dispatchEvent(new Event('localBookingsUpdated'));
      } catch (e) {
        // ignore
      }
    } catch (e) {
      console.error('Error saving local booking', e);
    }
  };

  const handlePayNow = async () => {
    setPaymentMethod('pay_now');
    await simulateCreateBooking('pay_now');
  };

  const handlePayAtHotel = async () => {
    setPaymentMethod('pay_at_hotel');
    await simulateCreateBooking('pay_at_hotel');
  };

  const printSlip = () => {
    const content = slipRef.current?.innerHTML;
    if (!content) return;
    const win = window.open('', '_blank', 'width=800,height=600');
    if (!win) return;
    win.document.write(`<!doctype html><html><head><title>Booking Confirmation</title>`);
    win.document.write('<meta name="viewport" content="width=device-width, initial-scale=1">');
    win.document.write('</head><body>');
    win.document.write(content);
    win.document.write('</body></html>');
    win.document.close();
    // Give browser a moment to render then print
    setTimeout(() => {
      win.print();
    }, 250);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mt-12">
          
          <h1 className="text-3xl font-bold text-gray-900">Complete Your Booking</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Hotel Info */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex flex-col md:flex-row gap-6">
                <img
                  src={hotelData.src}
                  alt={hotelData.title}
                  className="w-full md:w-64 h-48 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{hotelData.title}</h2>
                  <p className="text-gray-600 mb-2">📍 {hotelData.location}</p>
                  <p className="text-gray-600 mb-4">{hotelData.description}</p>
                  <div className="text-2xl font-bold text-green-600">
                    ₹{hotelData.pricePerNight.toLocaleString()}
                    <span className="text-sm text-gray-500 font-normal"> per night</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Guest Information</h3>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Special Requests
                  </label>
                  <textarea
                    rows={3}
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Any special requests or preferences..."
                  />
                </div>
              </form>
            </div>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Booking Summary</h3>
              
              {searchData && (
                <div className="space-y-3 mb-6 pb-6 border-b">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Check-in:</span>
                    <span className="font-medium">{searchData.checkIn || 'Not specified'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Check-out:</span>
                    <span className="font-medium">{searchData.checkOut || 'Not specified'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Guests:</span>
                    <span className="font-medium">{searchData.guests || 1}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Nights:</span>
                    <span className="font-medium">1</span>
                  </div>
                </div>
              )}

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Room Rate:</span>
                  <span className="font-medium">₹{hotelData.pricePerNight.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Taxes & Fees:</span>
                  <span className="font-medium">₹{Math.round(hotelData.pricePerNight * 0.18).toLocaleString()}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-green-600">
                      ₹{Math.round(hotelData.pricePerNight * 1.18).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={openConfirmation}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Complete Booking
              </button>

              <p className="text-xs text-gray-500 mt-4 text-center">
                By completing this booking, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </div>

        {/* Confirmation Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full shadow-lg overflow-auto">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-bold">Booking Confirmation</h2>
                  <button className="text-gray-500" onClick={closeModal}>✕</button>
                </div>

                <div ref={slipRef} className="mt-4" id="confirmation-slip">
                  <h3 className="font-semibold text-lg">{hotelData.title}</h3>
                  <p className="text-sm text-gray-600">{hotelData.location}</p>
                  <hr className="my-3" />

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-gray-600">Guest:</div>
                    <div className="font-medium">{firstName} {lastName}</div>

                    <div className="text-gray-600">Email:</div>
                    <div className="font-medium">{email}</div>

                    <div className="text-gray-600">Phone:</div>
                    <div className="font-medium">{phone}</div>

                    <div className="text-gray-600">Check-in:</div>
                    <div className="font-medium">{searchData?.checkIn || '-'}</div>

                    <div className="text-gray-600">Check-out:</div>
                    <div className="font-medium">{searchData?.checkOut || '-'}</div>

                    <div className="text-gray-600">Nights:</div>
                    <div className="font-medium">{nights}</div>

                    <div className="text-gray-600">Guests:</div>
                    <div className="font-medium">{guests}</div>
                  </div>

                  <div className="mt-4 border-t pt-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Room ({nights} × ₹{basePrice.toLocaleString()}):</span>
                      <span className="font-medium">₹{(basePrice * nights * guests).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Taxes & Fees:</span>
                      <span className="font-medium">₹{taxes.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold mt-2">
                      <span>Total:</span>
                      <span className="text-green-600">₹{total.toLocaleString()}</span>
                    </div>
                  </div>

                  {bookingRef && (
                    <div className="mt-3 text-sm text-gray-700">
                      Booking reference: <span className="font-medium">{bookingRef}</span>
                    </div>
                  )}
                </div>

                <div className="mt-6">
                  <h4 className="font-semibold">Payment Options</h4>
                  <div className="mt-2 flex gap-3 items-center">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'pay_now'}
                        onChange={() => setPaymentMethod('pay_now')}
                        className="mr-2"
                      />
                      Pay Now (card)
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'pay_at_hotel'}
                        onChange={() => setPaymentMethod('pay_at_hotel')}
                        className="mr-2"
                      />
                      Pay at Hotel
                    </label>
                  </div>

                  <div className="mt-4 flex gap-3">
                    <button
                      onClick={() => (paymentMethod === 'pay_now' ? handlePayNow() : handlePayAtHotel())}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md"
                      disabled={paymentStatus === 'processing'}
                    >
                      {paymentStatus === 'processing' ? 'Processing...' : paymentMethod === 'pay_now' ? 'Pay & Confirm' : 'Confirm Booking'}
                    </button>

                    <button
                      onClick={printSlip}
                      className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md"
                      disabled={!bookingRef}
                    >
                      Print Slip
                    </button>

                    <button onClick={closeModal} className="ml-auto text-sm text-gray-600">Close</button>
                  </div>

                  {paymentStatus === 'paid' && (
                    <div className="mt-4 text-green-700 font-semibold">Payment successful! Your booking is confirmed.</div>
                  )}

                  {paymentStatus === 'pending' && (
                    <div className="mt-4 text-orange-700 font-semibold">Booking confirmed. Please pay at hotel.</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default Booking;

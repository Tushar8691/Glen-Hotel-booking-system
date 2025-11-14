// components/BookingForm.jsx
import React, { useState } from "react";

export function BookingForm({ hotel, searchData, onUpdate }) {
  const [guestDetails, setGuestDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: "",
  });
  const [roomSelection, setRoomSelection] = useState({
    roomType: "standard",
    numberOfRooms: 1,
    addOns: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const roomTypes = [
    { id: "standard", name: "Standard Room", price: 150, description: "Comfortable room with basic amenities" },
    { id: "deluxe", name: "Deluxe Room", price: 250, description: "Spacious room with premium amenities" },
    { id: "suite", name: "Executive Suite", price: 400, description: "Luxury suite with separate living area" },
    { id: "presidential", name: "Presidential Suite", price: 800, description: "Ultimate luxury with panoramic views" },
  ];

  const addOns = [
    { id: "breakfast", name: "Breakfast Included", price: 25 },
    { id: "spa", name: "Spa Package", price: 100 },
    { id: "airport", name: "Airport Transfer", price: 50 },
    { id: "wifi", name: "Premium WiFi", price: 15 },
    { id: "parking", name: "Valet Parking", price: 30 },
  ];

  const handleGuestChange = (field, value) => {
    const newDetails = { ...guestDetails, [field]: value };
    setGuestDetails(newDetails);
    onUpdate("guestDetails", newDetails);
  };

  const handleRoomChange = (field, value) => {
    const newSelection = { ...roomSelection, [field]: value };
    setRoomSelection(newSelection);
    onUpdate("roomSelection", newSelection);

    // Calculate total amount
    const selectedRoom = roomTypes.find((room) => room.id === newSelection.roomType);
    const addOnTotal = newSelection.addOns.reduce((total, addOnId) => {
      const addOn = addOns.find((a) => a.id === addOnId);
      return total + (addOn ? addOn.price : 0);
    }, 0);
    const nights =
      searchData?.checkIn && searchData?.checkOut
        ? Math.ceil((new Date(searchData.checkOut) - new Date(searchData.checkIn)) / (1000 * 60 * 60 * 24))
        : 1;
    const totalAmount = (selectedRoom.price + addOnTotal) * newSelection.numberOfRooms * nights;
    onUpdate("totalAmount", totalAmount);
  };

  const handleAddOnToggle = (addOnId) => {
    const newAddOns = roomSelection.addOns.includes(addOnId)
      ? roomSelection.addOns.filter((id) => id !== addOnId)
      : [...roomSelection.addOns, addOnId];
    handleRoomChange("addOns", newAddOns);
  };

  // NEW: Booking submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");
    setSubmitSuccess(false);

    const bookingPayload = {
      hotel,
      searchData,
      guestDetails,
      roomSelection,
    };

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingPayload),
      });
      if (!response.ok) {
        throw new Error("Booking failed. Please try again.");
      }
      setSubmitSuccess(true);
    } catch (err) {
      setSubmitError(err.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {/* ...existing form fields... */}
      {/* Guest details, room selection, add-ons, etc. */}
      {/* Add your form JSX here as in your original file, unchanged */}

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Booking..." : "Confirm Booking"}
      </button>
      {submitError && <div className="text-red-600 mt-2">{submitError}</div>}
      {submitSuccess && <div className="text-green-600 mt-2">Booking successful!</div>}
    </form>
  );
}

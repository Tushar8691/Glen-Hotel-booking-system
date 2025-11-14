# Hotel Booking System – Simple Documentation

**Live Demo**: [https://hotel-booking-chi-pied.vercel.app/](https://hotel-booking-chi-pied.vercel.app/)  
**Date**: November 14, 2025  
**Author**: Tushar8691  

---

## Overview
A full-stack hotel booking web app built with React (frontend) and Node.js/Express (backend). Users can browse hotels, book rooms, and manage reservations. Authentication via Clerk, data stored in MongoDB, with email confirmations via Nodemailer.

---

## Features
- **Auth**: Sign up/login with Clerk (email/password or social).
- **Browse**: Search hotels by location, dates, price; view details & rooms.
- **Book**: Select dates/rooms, add guests, confirm booking (simulated payment).
- **Dashboard**: View/cancel personal bookings.
- **Admin**: Basic hotel/room management (if implemented).
- **Emails**: Confirmation on booking.
- **UI**: Responsive with Tailwind, animations via Framer Motion.

---

## Tech Stack
- **Frontend**: React 19, Vite 6, React Router 7, Clerk React 5, Tailwind 4, Framer Motion 12.
- **Backend**: Node.js, Express 5, Mongoose 8, Clerk Express 1, Nodemailer 7, CORS.
- **DB**: MongoDB (via Atlas).
- **Dev**: ESLint 9, Nodemon 3.

---

## Project Structure
```
Hotel-Booking/
├── client/                 # Frontend
│   ├── public/             # Static files
│   ├── src/
│   │   ├── components/     # UI components (e.g., HotelCard, BookingForm)
│   │   ├── pages/          # Routes (Home, Search, Dashboard)
│   │   ├── hooks/          # Custom hooks (e.g., useClerkAuth)
│   │   ├── lib/            # API utils, helpers
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css       # Tailwind setup
│   ├── vite.config.js
│   └── package.json
├── server/                 # Backend
│   ├── config/             # DB connection (db.js)
│   ├── controllers/        # Logic (hotels, bookings)
│   ├── middleware/         # Auth (clerkAuth.js)
│   ├── models/             # Schemas (Hotel.js, Booking.js, etc.)
│   ├── routes/             # API (hotels.js, bookings.js)
│   ├── utils/              # Email sender
│   ├── server.js           # Main server
│   └── .env
├── .gitignore
└── README.md               # (Basic repo info)
```

---

## Setup
1. **Clone**: `git clon https://github.com/Tushar8691/Glen-Hotel-booking-system.git && cd Hotel-Booking`
2. **Backend**:
   - `cd server && npm install`
   - Copy `.env.example` to `.env`: Add `MONGODB_URI`, `CLERK_SECRET_KEY`, `EMAIL_USER/PASS`.
   - `npm run dev` (runs on port 5000)
3. **Frontend**:
   - `cd ../client && npm install`
   - Copy `.env.example` to `.env`: Add `VITE_CLERK_PUBLISHABLE_KEY`, `VITE_API_BASE_URL=http://localhost:5000/api`.
   - `npm run dev` (runs on port 5173)
4. **Clerk**: Setup at [clerk.com](https://clerk.com) – add keys & redirect URLs (localhost:5173, vercel domain).
5. **Seed Data**: Run any seed script in backend if available.

---

## API Endpoints
Base: `/api`  
- `GET /hotels` – List hotels (query: ?location=NYC&dates=2025-11-10/2025-11-12)
- `GET /hotels/:id` – Hotel details
- `POST /bookings` – Create booking (body: {hotelId, dates, guests}; auth req.)
- `GET /bookings/user` – User's bookings (Clerk auth)

Protected routes use Clerk middleware.

---

## Deployment
- **Frontend**: Vercel – Connect repo, add env vars.
- **Backend**: Render – Deploy server folder, set env vars.
- Update `VITE_API_BASE_URL` to production backend URL.

---

## Usage
1. Visit live demo or localhost:5173.
2. Sign up/login via Clerk.
3. Search/browse hotels → Select room/dates → Book.
4. Check dashboard for bookings; emails sent on confirm.

---

## Models (MongoDB)
- **Hotel**: name, location, price, amenities, rooms[].
- **Room**: type, capacity, available, hotel ref.
- **Booking**: user (Clerk ID), hotel/room refs, dates, status, totalPrice.

---

## Troubleshooting
- **Auth Errors**: Verify Clerk keys.
- **CORS**: Enabled in server.
- **Emails**: Use Gmail app password.
- **Env**: Frontend vars must prefix `VITE_`.

---

## Contributing
Fork → Branch → Commit → PR. Run `npm run lint` in client.

**License**: ISC  

---  

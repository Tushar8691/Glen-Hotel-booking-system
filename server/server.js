import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from '@clerk/express';
import clerkWebhooks from "./controllers/clerkWebhooks.js";
import userRouter from "./routes/userRoutes.js";
import listingRouter from "./routes/listingRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js"; // ADDED

const app = express();
app.use(cors());

// Connect to DB first
const startServer = async () => {
    try {
        const dbConnection = await connectDB();
        
        // Verify connection state
        if (dbConnection.readyState !== 1) {
            throw new Error("Database connection not ready");
        }

        // Webhook route
        app.post('/api/clerk',
            express.raw({ type: 'application/json' }),
            clerkWebhooks
        );

        // Other middleware and routes
        app.use(express.json());
        app.use(clerkMiddleware());

        // --- ROUTES START ---
        app.get('/', (req, res) => res.send("API Working fine!"));
        app.use('/api/user', userRouter);
        app.use('/api/listing', listingRouter);
        app.use('/api/bookings', bookingRouter); // ADDED
        // --- ROUTES END ---

        // Error handling
        app.use((error, req, res, next) => {
            console.error('Global error handler:', error);
            res.status(500).json({ error: 'Internal server error' });
        });

        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("❌ Server startup failed:", error.message);
        process.exit(1);
    }
};

startServer();

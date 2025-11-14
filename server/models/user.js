import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    _id: { 
        type: String, 
        required: true 
    },
    username: { 
        type: String, 
        required: true,
        trim: true
    },
    email: { 
        type: String, 
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    image: { 
        type: String, 
        default: ""
    },
    role: { 
        type: String, 
        enum: ["user", "admin"],
        default: "user" 
    },
    previousBookings: [{
        hotelId: { 
            type: String, 
            required: true 
        },
        hotelName: { 
            type: String, 
            required: true 
        },
        bookingDate: { 
            type: Date, 
            required: true 
        },
        checkIn: { 
            type: Date, 
            required: true 
        },
        checkOut: { 
            type: Date, 
            required: true 
        },
        guests: { 
            type: Number, 
            required: true,
            min: 1
        },
        price: { 
            type: Number, 
            required: true,
            min: 0
        },
        status: { 
            type: String, 
            enum: ["confirmed", "cancelled", "completed"], 
            default: "confirmed" 
        }
    }]
}, { 
    timestamps: true,
    // Ensure virtual id field is included when converting to JSON
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Add indexes for better performance
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });

const User = mongoose.model("User", userSchema);

export default User;

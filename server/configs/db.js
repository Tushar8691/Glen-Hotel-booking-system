import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        // Connection options
        const options = {
            dbName: 'glen-hotel-booking',
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000,
            maxPoolSize: 10,
            // REMOVED: bufferCommands: false
        };

        await mongoose.connect(process.env.MONGO_URI, options);
        console.log("✅ Connected to database:", mongoose.connection.db.databaseName);
        
        // Connection event listeners
        mongoose.connection.on('connected', () => {
            console.log('✅ Mongoose connected to MongoDB');
        });

        mongoose.connection.on('error', (err) => {
            console.error('❌ Mongoose connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('⚠️ Mongoose disconnected from MongoDB');
        });

        return mongoose.connection;
    } catch (error) {
        console.error("❌ DB Connection Error:", error.message);
        process.exit(1);
    }
};

export default connectDB;

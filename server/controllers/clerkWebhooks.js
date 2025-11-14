import { Webhook } from 'svix';
import User from '../models/user.js';
import mongoose from 'mongoose';

const clerkWebhooks = async (req, res) => {
    try {
        // Get webhook secret from environment
        const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
        
        if (!webhookSecret) {
            console.error('CLERK_WEBHOOK_SECRET not found in environment variables');
            return res.status(500).json({ error: 'Webhook secret not configured' });
        }
        if (mongoose.connection.readyState !== 1) {
            console.error('Database connection not ready');
            return res.status(500).json({ error: 'Database unavailable' });
        }

        // Get headers
        const headers = req.headers;
        const payload = req.body;

        // Verify webhook signature using Svix
        const wh = new Webhook(webhookSecret);
        let evt;

        try {
            evt = wh.verify(payload, headers);
        } catch (err) {
            console.error('Webhook signature verification failed:', err.message);
            return res.status(400).json({ error: 'Invalid webhook signature' });
        }

        // Log the event for debugging
        console.log('Received Clerk webhook event:', evt.type);
        console.log('Event data:', JSON.stringify(evt.data, null, 2));

        // Handle different event types
        switch (evt.type) {
            case 'user.created':
                await handleUserCreated(evt.data);
                break;
            case 'user.updated':
                await handleUserUpdated(evt.data);
                break;
            case 'user.deleted':
                await handleUserDeleted(evt.data);
                break;
            default:
                console.log(`Unhandled event type: ${evt.type}`);
        }

        res.status(200).json({ message: 'Webhook processed successfully' });

    } catch (error) {
        console.error('Webhook error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Helper function to handle user creation
const handleUserCreated = async (userData) => {
    try {
        // Safely extract email address
        const primaryEmail = userData.email_addresses?.find(email => 
            email.id === userData.primary_email_address_id
        );

        if (!primaryEmail) {
            console.error('No primary email found for user:', userData.id);
            return;
        }

        // Create user document
        const newUser = new User({
            _id: userData.id,
            username: userData.username || `${userData.first_name || ''} ${userData.last_name || ''}`.trim() || 'Unknown User',
            email: primaryEmail.email_address,
            image: userData.image_url || userData.profile_image_url || '',
            role: 'user'
        });

        await newUser.save();
        console.log('User created successfully:', userData.id);

    } catch (error) {
        console.error('Error creating user:', error);
        // Don't throw error - we don't want to break webhook processing
    }
};

// Helper function to handle user updates
const handleUserUpdated = async (userData) => {
    try {
        const primaryEmail = userData.email_addresses?.find(email => 
            email.id === userData.primary_email_address_id
        );

        if (!primaryEmail) {
            console.error('No primary email found for user update:', userData.id);
            return;
        }

        const updateData = {
            username: userData.username || `${userData.first_name || ''} ${userData.last_name || ''}`.trim() || 'Unknown User',
            email: primaryEmail.email_address,
            image: userData.image_url || userData.profile_image_url || ''
        };

        await User.findByIdAndUpdate(userData.id, updateData);
        console.log('User updated successfully:', userData.id);

    } catch (error) {
        console.error('Error updating user:', error);
    }
};

// Helper function to handle user deletion

const handleUserDeleted = async (userData) => {
    try {
        // Ensure connection is ready
        if (mongoose.connection.readyState !== 1) {
            console.error('Cannot delete user - DB connection not ready');
            return;
        }
        
        await User.findByIdAndDelete(userData.id);
        console.log('User deleted successfully:', userData.id);
    } catch (error) {
        console.error('Error deleting user:', error);
    }
};


export default clerkWebhooks;

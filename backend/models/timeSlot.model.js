// models/timeSlot.model.js
import mongoose from 'mongoose';

const timeSlotSchema = new mongoose.Schema({
    managerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User (Manager) model
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    startTime: {
        type: String, // Stored as 'HH:MM' format
        required: true,
    },
    endTime: {
        type: String, // Stored as 'HH:MM' format
        required: true,
    },
    status: {
        type: String,
        enum: ['AVAILABLE', 'BOOKED', 'UNAVAILABLE'],
        default: 'AVAILABLE', // Initially, slots are available
    },
}, { timestamps: true });

export const TimeSlot = mongoose.model('TimeSlot', timeSlotSchema);

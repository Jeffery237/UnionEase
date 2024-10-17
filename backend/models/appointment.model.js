import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    citizenId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true
    },
    managerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true
    },
    timeSlotId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TimeSlot", 
        required: true
    },
    date:{
        type: Date,
        required: true
    },  
    status: {
        type: String,
        enum: ["PENDING", "APPROVED","DECLINED"],
        default: "PENDING"
    },
    reason: {
        type: String,
        default: ""
    }
}, {timestamps: true});

export const Appointment = mongoose.model('Appointment', appointmentSchema);

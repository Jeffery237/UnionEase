import mongoose from "mongoose";

const RequestSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    husband: {
        name: { type: String, required: true },
        surname: { type: String, required: true },
        idCardNumber: { type: String, required: true },
        profession: { type: String, required: true },
        residence: { type: String, required: true },
        dateOfBirth: { type: Date, required: true },
        cityOfBirth: { type: String, required: true },
        nationality: { type: String, required: true },
        fatherName: { type: String, required: true },
        motherName: { type: String, required: true },
        familyHead: { type: String, required: true },
        witness: { type: String, required: true }
    },
    wife: {
        name: { type: String, required: true },
        surname: { type: String, required: true },
        idCardNumber: { type: String, required: true },
        profession: { type: String, required: true },
        residence: { type: String, required: true },
        dateOfBirth: { type: Date, required: true },
        cityOfBirth: { type: String, required: true },
        nationality: { type: String, required: true },
        fatherName: { type: String, required: true },
        motherName: { type: String, required: true },
        familyHead: { type: String, required: true },
        witness: { type: String, required: true }
    },
    status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending"
    },
    requestDate: {
        type: Date,
        default: Date.now
    },
    marriageDate:{
        type: Date,
        required: true,
    },
    approvedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

export const Request = mongoose.model('Request', RequestSchema);

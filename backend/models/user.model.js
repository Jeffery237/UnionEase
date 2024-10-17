import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    lastlogin:{
        type: Date,
        default: new Date().now
    },
    isVerified:{
        type: Boolean,
        default: false
    },
    isActive:{
        type: Boolean,
        default: true
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
    role: {
        type: String,
        enum: ["CITIZEN", "MANAGER", "ADMIN"],
        default: "CITIZEN"
    }
}, {timestamps: true});

const User = mongoose.model('User', userSchema);
export {User};









import {User} from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import crypto from "crypto"
import validator from "validator"
import { generateVerificationCode } from "../utils/generateVerificationCode.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail } from "../nodemailer/emails.js";
import { sendWelcomeEmail } from "../nodemailer/emails.js";
import {sendPasswordResetEmail} from "../nodemailer/emails.js"
import {sendResetSuccessEmail} from "../nodemailer/emails.js"


export const signup = async (req, res) => {
    const { name, email, password, role} = req.body;
    try {
        // Validate input fields
        if (!name || !email || !password) {
            throw new Error("All fields are required!");
        }

        if (!validator.isEmail(email)) {
            throw new Error("Please use a valid email address!");
        }

        const userAlreadyExists = await User.findOne({ email });
        if (userAlreadyExists) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcryptjs.hash(password, 10);

        // Generate verification token
        const verificationToken = generateVerificationCode();

        // Determine user role (only CITIZEN by default unless an admin assigns another role)
        const allowedRoles = ["CITIZEN", "MANAGER", "ADMIN"];
        const assignedRole = allowedRoles.includes(role) ? role : "CITIZEN";

        // Create the user object
        const user = new User({
            name,
            email,
            password: hashedPassword,
            role: assignedRole, // Assign role here
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
        });

        // Save the user in the database
        await user.save();

        // Generate JWT token and set it in the cookie, including role in the token payload
        generateTokenAndSetCookie(res, user._id, user.role);

        // Send verification email
        await sendVerificationEmail(user.email, verificationToken);

        // Respond with success and exclude the password in the response
        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                ...user._doc,
                password: undefined // Do not expose the password
            }
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const verifyEmail = async (req, res) =>{
    const {code} = req.body;
    try {
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: {$gt: Date.now()}
        })
        if(!user){
            return res.status(404).json({
                success: false,
                message: "Invalid or expired verification code"
            });
        }else{
            user.isVerified = true;
            user.verificationToken = undefined;
            user.verificationTokenExpiresAt = undefined;
            await user.save();
            console.log("Verified User saved!!!");

            console.log("Preparing to send welcome email to:", user.email);
            await sendWelcomeEmail(user.email, user.name);
            
        }
        res.status(200).json({
            success: true,
            message: "Email verified successfully",
            user: {
                ...user._doc,
                password: undefined
            }
        })
        
    } catch (error) {
        res.status(400).json({success: false, message: error.message})
    }
};

export const login = async (req, res) =>{
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!validator.isEmail(email)){
            throw new error("Please use a valid email address!!")
        }
        if(!user){
            return res.status(404).json({success: false, message: "Invalid Credentials!!"});
        }
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(404).json({success: false, message: "Password Mismatch!!"});
        }

        generateTokenAndSetCookie(res, user._id, user.role);
        user.lastlogin = new Date();
        await user.save();
        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            user: {
                ...user._doc,
                password: undefined
            }
        })
    } catch (error) {
        console.log("Error in login", error);
        res.status(400).json({success: false, message: error.message})
    }
};

export const logout = async (req, res) =>{
    res.clearCookie("token");
    res.status(200).json({success: true, message: "Logged out successfully"})
};


export const forgotPassword = async (req, res) =>{
    const {email} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({success: false, message: "User not found!!"});
        }

        //Generate password reset token
        const resetToken = crypto.randomBytes(20).toString("hex");
        const resetTokenExpiresAt = Date.now() + 1*60*60*1000; //1hour

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetTokenExpiresAt;

        await user.save();

        //Send email
        await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);
        res.status(200).json({success: true, message: "Password reset email sent successfully!!"});

    } catch (error) {
        console.log("Error in sending reset email", error);
        res.status(400).json({success: false, message: error.message})
    }
};

export const resetPassword = async (req, res) =>{
    try {
        const {token} = req.params;
        const {password} = req.body;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: {$gt: Date.now()},
        });

        if (!user) {
            return res.status(404).json({success: false, message: "Invalid or expired reset token!!"});
        }

        //Update Password
        const hashedPassword = await bcryptjs.hash(password, 10);
        user.password = hashedPassword;
        user.resetPasswordToken =  undefined,
        user.resetPasswordExpiresAt = undefined
        await user.save();

        await sendResetSuccessEmail(user.email);
        res.status(200).json({success: true, message: "Password reset successfully"})
    } catch (error) {
        console.log("Error in resetPassword", error);
        res.status(400).json({success: false, message: error.message});
        
    }
}

export const checkAuth = async (req, res) =>{
    try {
        const user = await User.findById(req.userId).select("-password");
        if (!user) {
            return res.status(404).json({success: false, message: "User not found"});
        }

        res.status(200).json({success: true, user});
    } catch (error) {
        console.log("Error in checkingAuth", error);
        res.status(400).json({success: false, message: error.message});
    }
}

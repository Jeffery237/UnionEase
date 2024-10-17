import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

// VERIFY JWT Token
export const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ success: false, message: "Access denied. No token provided." });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        req.userRole = decoded.role;
        next();
    } catch (error) {
        console.error("Error in verifyingToken", error);
        res.status(401).json({ success: false, message: "Unauthorized - invalid token" });
    }
};

export const authorizeRoles = (...roles) => {
    return async (req, res, next) => {
        try {
            const user = await User.findById(req.userId);
            if (!user) {
                return res.status(404).json({ success: false, message: 'User not found' });
            }
            if (!roles.includes(user.role)) {
                return res.status(403).json({ success: false, message: `Role (${user.role}) is not authorized to access this resource.` });
            }
            req.user = user; // Attach user to req for further use if needed
            next();
        } catch (error) {
            console.error('Error in authorizeRoles middleware', error);
            res.status(500).json({ success: false, message: 'Server error' });
        }
    };
};

export const isAdmin = authorizeRoles('ADMIN');
export const isManager = authorizeRoles('MANAGER');
export const isCitizen = authorizeRoles('CITIZEN');
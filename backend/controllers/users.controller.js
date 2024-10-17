import {User} from '../models/user.model.js';
import bcryptjs from "bcryptjs"
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js';

// Admin adding a manager
export const addManager = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already in use.',
      });
    }

    // Hash the password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create a new manager
    const newManager = new User({
      name,
      email,
      password: hashedPassword,
      role: 'MANAGER',
      isVerified: true, // Skipping email verification
      isActive: true,
    });

    // Save the manager
    await newManager.save();
    // Generate JWT token and set it in the cookie, including role in the token payload
    generateTokenAndSetCookie(res, newManager._id, newManager.role);

    return res.status(201).json({
      success: true,
      message: 'Manager added successfully.',
      manager: newManager,
    });
  } catch (error) {
    console.error('Error adding manager:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while adding the manager.',
    });
  }
};


export const getManagersAndAdmins = async (req, res) => {
  try {
    const managers = await User.find({ role: 'MANAGER', isActive: true });

    if (!managers.length) {
      return res.status(404).json({ success: false, message: 'No managers or admins found' });
    }

    res.status(200).json({ success: true, data: managers });
    console.log('Active Managers fetched successfully');
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};

// Mark manager as unavailable (admin only)
export const markManagerUnavailable = async (req, res) => {
  const { managerId } = req.params;

  try {
    // Find the manager and set them as inactive
    const manager = await User.findById(managerId);
    if (!manager || manager.role !== 'MANAGER') {
      return res.status(404).json({
        success: false,
        message: 'Manager not found.',
      });
    }

    manager.active = false;
    await manager.save();

    // Set all future time slots for this manager as unavailable
    await TimeSlot.updateMany(
      { manager: managerId, date: { $gte: new Date() } },
      { $set: { status: 'UNAVAILABLE' } }
    );

    return res.status(200).json({
      success: true,
      message: 'Manager marked as unavailable, and future time slots updated.',
    });
  } catch (error) {
    console.error('Error marking manager unavailable:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while marking the manager as unavailable.',
    });
  }
};

// routes/timeSlots.js
import express from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import { createTimeSlots, getAvailableTimeSlots } from '../controllers/timeslot.controller.js';

const router = express.Router();

// Route to create a time slot (Managers and Admins Only)
router.post('/create-timeslot', verifyToken, createTimeSlots);

// Route to get available time slots for a manager (Citizen)
router.get('/timeslot', verifyToken, getAvailableTimeSlots);

// // Route to book a time slot (Citizen)
// router.post('/book/:slotId', verifyToken, isCitizen, bookTimeSlot);

// // Route to get booked time slots for a citizen
// router.get('/booked', verifyToken, isCitizen, getBookedTimeSlotsForCitizen);

// // Route to get all time slots for a manager (Manager only)
// router.get('/manager', verifyToken, isManager, getManagerTimeSlots);

// // Route to cancel a booked time slot (Citizen or Manager)
// router.post('/cancel/:slotId', verifyToken, cancelTimeSlot);

export default router;

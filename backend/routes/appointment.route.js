import express from 'express';
import { bookAppointment, getAppointments, updateAppointmentStatus } from '../controllers/appointment.controller.js';
import {checkAuth} from "../controllers/auth.controller.js"
import { verifyToken, authorizeRoles } from '../middleware/verifyToken.js';


const router = express.Router();

// Citizen books an appointment
router.post('/book-appointement', verifyToken, checkAuth, bookAppointment);

// Manager/Admin views all appointments
router.get('/all-appointments', verifyToken, checkAuth, authorizeRoles('MANAGER', 'ADMIN'), getAppointments);

// Manager/Admin updates appointment status
router.put('/appointment-status/update', verifyToken, checkAuth, authorizeRoles('MANAGER', 'ADMIN'), updateAppointmentStatus);

export default router;

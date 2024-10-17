import {Appointment} from '../models/appointment.model.js';
import { TimeSlot } from '../models/timeSlot.model.js';
import { User } from '../models/user.model.js';
import { updateTimeSlotStatus } from './timeslot.controller.js';

// 1. Book an appointment (Citizen books a slot)
export const bookAppointment = async (req, res) => {
    const { userId, managerId, timeSlotId, date } = req.body;
  
    try {
      // Check if the manager exists and is active
      const manager = await User.findById(managerId);
      if (!manager || manager.role !== 'MANAGER' || !manager.active) {
        return res.status(404).json({
          success: false,
          message: 'Manager not found or unavailable.',
        });
      }
  
      // Check if the time slot exists and is available
      const timeSlot = await TimeSlot.findById(timeSlotId);
      if (!timeSlot || timeSlot.status !== 'AVAILABLE') {
        return res.status(400).json({
          success: false,
          message: 'Time slot is no longer available.',
        });
      }
  
      // Update the time slot to 'BOOKED'
      timeSlot.status = 'BOOKED';
      await timeSlot.save();
  
      // Create the appointment
      const appointment = new Appointment({
        user: userId,
        manager: managerId,
        timeSlot: timeSlotId,
        date,
      });
  
      await appointment.save();
  
      return res.status(201).json({
        success: true,
        message: 'Appointment booked successfully.',
        appointment,
      });
    } catch (error) {
      console.error('Error booking appointment:', error);
      return res.status(500).json({
        success: false,
        message: 'An error occurred while booking the appointment.',
      });
    }
  };
// 2. View appointments (For citizens and managers)
export const getAppointments = async (req, res) => {
    const userID = req.userId; // Either manager or citizen

    try {
        let appointments;
        if (req.role === 'CITIZEN') {
            appointments = await Appointment.find({ citizenID: userID }).populate('timeSlotID managerID', 'date startTime endTime name');
        } else if (req.role === 'MANAGER') {
            appointments = await Appointment.find({ managerID: userID }).populate('timeSlotID citizenID', 'date startTime endTime name');
        }

        res.status(200).json({ success: true, appointments });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

// 3. Update the status of an appointment (Manager updates the status)
export const updateAppointmentStatus = async (req, res) => {
    const { appointmentID, status } = req.body; // Appointment ID and new status passed from the request body
    const managerID = req.userId; // Manager must be logged in

    try {
        // Validate the new status
        const validStatuses = ['APPROVED', 'CANCELLED'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ success: false, message: 'Invalid status.' });
        }

        // Find the appointment by its ID and ensure the manager owns it
        const appointment = await Appointment.findById(appointmentID);
        if (!appointment) {
            return res.status(404).json({ success: false, message: 'Appointment not found.' });
        }

        if (appointment.managerID.toString() !== managerID) {
            return res.status(403).json({ success: false, message: 'You are not authorized to update this appointment.' });
        }

        // Update the appointment status
        appointment.status = status;
        await appointment.save();

        res.status(200).json({ success: true, message: 'Appointment status updated successfully', appointment });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

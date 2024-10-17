
import { TimeSlot } from '../models/timeSlot.model.js';


export const createTimeSlots = async (req, res) => {
    const { date, slots } = req.body;
    const managerID = req.userId;
    const role = req.userRole;
    if(role==="ADMIN" || role==="MANAGER"){
        try {
            // Ensure the date is a working day (Monday to Friday)
            const day = new Date(date).getDay();
            if (day === 0 || day === 6) {
                return res.status(400).json({ success: false, message: 'Time slots can only be created from Monday to Friday.' });
            }
    
            // Iterate over the time slots and create them
            const timeSlots = await Promise.all(
                slots.map(async (slot) => {
                    const newSlot = new TimeSlot({
                        managerID,
                        date,
                        startTime: slot.startTime,
                        endTime: slot.endTime,
                    });
                    return await newSlot.save();
                })
            );
    
            res.status(201).json({ success: true, message: 'Time slots created successfully', data: timeSlots });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Server error', error: error.message });
        }
    }else{
        console.log("User unauthorized to create time slots!!!")
        res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    
};

// Fetch available time slots for a specific manager on a specific date
export const getAvailableTimeSlots = async (req, res) => {
    const { date } = req.query;
    // Normalize the date to midnight to match stored dates
    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);
  
    try {
      // Find all available time slots for the given manager and date
      const timeSlots = await TimeSlot.find({
        date: selectedDate,
        status: 'AVAILABLE',
      });
  
      if (!timeSlots.length) {
        return res.status(404).json({
          success: false,
          message: 'No available time slots for the selected date.',
        });
      }
  
      return res.status(200).json({
        success: true,
        timeSlots,
      });
    } catch (error) {
      console.error('Error fetching time slots:', error);
      return res.status(500).json({
        success: false,
        message: 'An error occurred while fetching time slots.',
      });
    }
  };

// Update the status of a time slot after it is booked
export const updateTimeSlotStatus = async (timeSlotId) => {
    try {
      // Find the time slot by its ID
      const timeSlot = await TimeSlot.findById(timeSlotId);
      if (!timeSlot) {
        throw new Error('Time slot not found.');
      }
  
      // Update status to 'BOOKED'
      timeSlot.status = 'BOOKED';
      await timeSlot.save();
    } catch (error) {
      throw new Error(error.message);
    }
  };
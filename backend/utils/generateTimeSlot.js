import cron from "node-cron";
import { TimeSlot } from "../models/timeSlot.model.js";
import {User} from "../models/user.model.js"
import moment from "moment"

// Function to generate time slots
const generateTimeSlots = async () => {
  try {
    // Fetch all active managers
    const managers = await User.find({ role: 'MANAGER', active: true });
    if (!managers.length) return;

    // Define working hours (8 AM - 3 PM) with a 5-minute break and a lunch break
    const workingHours = [
      { start: '08:00', end: '12:00' },
      { start: '12:45', end: '15:00' },
    ];

    // Generate slots for the next 14 days (2 weeks)
    for (let i = 1; i <= 14; i++) {
      const date = moment().add(i, 'days'); // Get the date 'i' days from now

      // Ensure it's a working day (Monday to Friday)
      if (date.isoWeekday() > 5) continue;

      // For each manager, generate time slots
      for (const manager of managers) {
        for (const period of workingHours) {
          let startTime = moment(`${date.format('YYYY-MM-DD')} ${period.start}`);
          const endTime = moment(`${date.format('YYYY-MM-DD')} ${period.end}`);

          // Create time slots in 30-minute intervals with a 5-minute break
          while (startTime.isBefore(endTime)) {
            const slotEndTime = startTime.clone().add(30, 'minutes');

            if (slotEndTime.isAfter(endTime)) break;

            // Create a time slot if it doesn't exist for this manager and time
            const existingSlot = await TimeSlot.findOne({
              manager: manager._id,
              date: date.toDate(),
              startTime: startTime.format('HH:mm'),
            });

            if (!existingSlot) {
              const newSlot = new TimeSlot({
                manager: manager._id,
                date: date.toDate(),
                startTime: startTime.format('HH:mm'),
                endTime: slotEndTime.format('HH:mm'),
                status: 'AVAILABLE',
              });

              await newSlot.save();
            }

            // Add a 5-minute break before the next slot
            startTime.add(35, 'minutes');
          }
        }
      }
    }

    console.log('Time slots generated successfully!');
  } catch (error) {
    console.error('Error generating time slots:', error);
  }
};

// Schedule the cron job to run daily at midnight
cron.schedule('0 0 * * *', generateTimeSlots);

module.exports = generateTimeSlots;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AppointmentForm = () => {
  const [managers, setManagers] = useState([]);
  const [selectedManager, setSelectedManager] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  // Fetch available managers
  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const response = await axios.get('http://localhost:4500/api/users/managers');
        setManagers(response.data.data || []);
      } catch (error) {
        console.error('Error fetching managers:', error);
      }
    };
    fetchManagers();
  }, []);

  // Fetch available time slots when a manager and date are selected
  useEffect(() => {
    if (selectedManager && selectedDate) {
      const fetchSlots = async () => {
        try {
          const response = await axios.get(`http://localhost:4500/api/timeslots/timeslot`,{
            params:{
              date: selectedDate  
            }
          }
          );
          if (response.data.success) {
            setAvailableSlots(response.data.timeSlots);
          } else {
            setAvailableSlots([]);
            setError(response.data.message || 'No available time slots.');
          }
          response? console.log(response.data): console.log("Error fetching timeslots")
        } catch (error) {
          console.error('Error fetching time slots:', error);
        }
      };
      fetchSlots();
    }
  }, [selectedDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Make a request to book an appointment
    try {
      const response = await axios.post('http://localhost:4500/api/appointments/book-appointment', {
        userId: req.userId, 
        managerId: selectedManager,
        timeSlotId: selectedSlot,
        date: selectedDate,
      });

      alert('Appointment booked successfully!');
    } catch (error) {
      console.error('Error booking appointment:', error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      <h2 className="text-2xl font-bold text-green-600 mb-4">Book Appointment</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Select Manager */}
        <div>
          <label className="block text-gray-700">Select Manager</label>
          <select
            className="w-full border-gray-300 rounded-lg p-2 focus:border-green-500 focus:ring-green-500"
            value={selectedManager}
            onChange={(e) => setSelectedManager(e.target.value)}
            required
          >
            <option value="">Choose a manager...</option>
            {managers && managers.length > 0 && managers.map((manager) => (
              <option key={manager._id} value={manager._id}>
                {manager.name}
              </option>
            ))}
          </select>
        </div>

        {/* Select Date */}
        <div>
          <label className="block text-gray-700">Select Date</label>
          <input
            type="date"
            className="w-full border-gray-300 rounded-lg p-2 focus:border-green-500 focus:ring-green-500"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            required
          />
        </div>

        {/* Select Time Slot */}
        {availableSlots.length > 0 && (
          <div>
            <label className="block text-gray-700">Select Time Slot</label>
            <select
              className="w-full border-gray-300 rounded-lg p-2 focus:border-green-500 focus:ring-green-500"
              value={selectedSlot}
              onChange={(e) => setSelectedSlot(e.target.value)}
              required
            >
              <option value="">Choose a time slot...</option>
              {availableSlots.map((slot) => (
                <option key={slot._id} value={slot._id}>
                  {slot.startTime} - {slot.endTime}
                </option>
              ))}
            </select>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-200"
        >
          Book Appointment
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;

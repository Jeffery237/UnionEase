import React, { useState } from 'react';
import { CalendarIcon, ClockIcon, PlusCircleIcon, TrashIcon } from 'lucide-react';
import Swal from 'sweetalert2';

const TimeSlotForm = () => {
  const [date, setDate] = useState('');
  const [slots, setSlots] = useState([{ startTime: '', endTime: '' }]);

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleSlotChange = (index, field, value) => {
    const newSlots = slots.map((slot, i) => 
      i === index ? { ...slot, [field]: value } : slot
    );
    setSlots(newSlots);
  };

  const addSlot = () => {
    setSlots([...slots, { startTime: '', endTime: '' }]);
  };

  const removeSlot = (index) => {
    setSlots(slots.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4500/api/timeslots/create-timeslot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date, slots }),
        credentials: 'include',
      });

      if (response.ok) {
        const result = await response.json();
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: result.message,
          confirmButtonColor: '#10B981',
        });
        setDate('');
        setSlots([{ startTime: '', endTime: '' }]);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create time slots');
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message || 'Failed to create time slots. Please try again.',
        confirmButtonColor: '#10B981',
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-green-700 text-center">Create Time Slots</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <CalendarIcon className="absolute top-3 left-3 text-green-500" />
          <input
            type="date"
            value={date}
            onChange={handleDateChange}
            required
            className="w-full pl-10 pr-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        
        {slots.map((slot, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div className="relative flex-1">
              <ClockIcon className="absolute top-3 left-3 text-green-500" />
              <input
                type="time"
                value={slot.startTime}
                onChange={(e) => handleSlotChange(index, 'startTime', e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="relative flex-1">
              <ClockIcon className="absolute top-3 left-3 text-green-500" />
              <input
                type="time"
                value={slot.endTime}
                onChange={(e) => handleSlotChange(index, 'endTime', e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            {slots.length > 1 && (
              <button
                type="button"
                onClick={() => removeSlot(index)}
                className="p-2 text-red-500 hover:text-red-700 focus:outline-none"
              >
                <TrashIcon size={20} />
              </button>
            )}
          </div>
        ))}
        
        <button
          type="button"
          onClick={addSlot}
          className="flex items-center justify-center w-full py-2 px-4 border border-green-500 rounded-lg text-green-500 hover:bg-green-50 transition duration-300 ease-in-out"
        >
          <PlusCircleIcon size={20} className="mr-2" />
          Add Another Time Slot
        </button>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
          Create Time Slots
        </button>
      </form>
    </div>
  );
};

export default TimeSlotForm;
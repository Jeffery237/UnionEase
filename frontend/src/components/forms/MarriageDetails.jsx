import React from 'react'


const MarriageDetails = ({ formData, handleInputChange, errors }) => {
  return (
    <div>
      <div className="space-y-4">
        <div>
          <label htmlFor="marriageDate" className="block mb-1 font-semibold">Marriage Date</label>
          (<strong> NB:</strong> <font> <i className="text-red-600 text-lg">Please ensure to choose a corresponding date atleast 30 days after your visit at the town hall for verification of original documents</i>)</font>
          <input
            type="date"
            id="marriageDate"
            name="marriageDate"
            value={formData.marriageDate}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded ${errors.marriageDate ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.marriageDate && <p className="text-red-500 text-sm mt-1">{errors.marriageDate}</p>}
        </div>
      </div>
    </div>
  );
};

export default MarriageDetails;
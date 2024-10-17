import React from 'react';

const WifeDetailsForm = ({ formData, handleInputChange, errors }) => {
  return (
    <div>
      <div className="space-y-4">
        <div>
          <label htmlFor="wifeName" className="block mb-1 font-semibold">Name(s)</label>
          <input
            type="text"
            id="wifeName"
            name="wifeName"
            value={formData.wifeName}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded ${errors.wifeName ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.wifeName && <p className="text-red-500 text-sm mt-1">{errors.wifeName}</p>}
        </div>

        <div>
          <label htmlFor="wifeSurname" className="block mb-1">Surname(s)</label>
          <input
            type="text"
            id="wifeSurname"
            name="wifeSurname"
            value={formData.wifeSurname}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded ${errors.wifeSurname ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.wifeSurname && <p className="text-red-500 text-sm mt-1">{errors.wifeSurname}</p>}
        </div>

        <div>
          <label htmlFor="wifeIdCard" className="block mb-1">CNI number</label>
          <input
            type="number"
            id="wifeIdCard"
            name="wifeIdCard"
            value={formData.wifeIdCard}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded ${errors.wifeIdCard ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.wifeIdCard && <p className="text-red-500 text-sm mt-1">{errors.wifeIdCard}</p>}
        </div>

        <div>
          <label htmlFor="wifeProfession" className="block mb-1">Profession</label>
          <input
            type="text"
            id="wifeProfession"
            name="wifeProfession"
            value={formData.wifeProfession}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded ${errors.wifeProfession ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.wifeProfession && <p className="text-red-500 text-sm mt-1">{errors.wifeProfession}</p>}
        </div>

        <div>
          <label htmlFor="wifeResidence" className="block mb-1">Residence</label>
          <input
            type="text"
            id="wifeResidence"
            name="wifeResidence"
            value={formData.wifeResidence}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded ${errors.wifeResidence ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.wifeResidence && <p className="text-red-500 text-sm mt-1">{errors.wifeResidence}</p>}
        </div>

        <div>
          <label htmlFor="wifeDateOfBirth" className="block mb-1">Date of birth</label>
          <input
            type="date"
            id="wifeDateOfBirth"
            name="wifeDateOfBirth"
            value={formData.wifeDateOfBirth}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded ${errors.wifeDateOfBirth ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.wifeDateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.wifeDateOfBirth}</p>}
        </div>

        <div>
          <label htmlFor="wifeCityOfBirth" className="block mb-1">Place of Birth</label>
          <input
            type="text"
            id="wifeCityOfBirth"
            name="wifeCityOfBirth"
            value={formData.wifeCityOfBirth}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded ${errors.wifeCityOfBirth ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.wifeCityOfBirth && <p className="text-red-500 text-sm mt-1">{errors.wifeCityOfBirth}</p>}
        </div>

        <div>
          <label htmlFor="wifeNationality" className="block mb-1">Nationality</label>
          <input
            type="text"
            id="wifeNationality"
            name="wifeNationality"
            value={formData.wifeNationality}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded ${errors.wifeNationality ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.wifeNationality && <p className="text-red-500 text-sm mt-1">{errors.wifeNationality}</p>}
        </div>

        <div>
          <label htmlFor="wifeFather" className="block mb-1">Father's name</label>
          <input
            type="text"
            id="wifeFather"
            name="wifeFather"
            value={formData.wifeFather}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded ${errors.wifeFather ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.wifeFather && <p className="text-red-500 text-sm mt-1">{errors.wifeFather}</p>}
        </div>

        <div>
          <label htmlFor="wifeMother" className="block mb-1">Mother's Name</label>
          <input
            type="text"
            id="wifeMother"
            name="wifeMother"
            value={formData.wifeMother}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded ${errors.wifeMother ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.wifeMother && <p className="text-red-500 text-sm mt-1">{errors.wifeMother}</p>}
        </div>

        <div>
          <label htmlFor="wifeFamilyHead" className="block mb-1">Family Head</label>
          <input
            type="text"
            id="wifeFamilyHead"
            name="wifeFamilyHead"
            value={formData.wifeFamilyHead}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded ${errors.wifeFamilyHead ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.wifeFamilyHead && <p className="text-red-500 text-sm mt-1">{errors.wifeFamilyHead}</p>}
        </div>

        <div>
          <label htmlFor="wifeWitness" className="block mb-1">Witness</label>
          <input
            type="text"
            id="wifeWitness"
            name="wifeWitness"
            value={formData.wifeWitness}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded ${errors.wifeWitness ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.wifeWitness && <p className="text-red-500 text-sm mt-1">{errors.wifeWitness}</p>}
        </div>
        
      </div>
    </div>
  );
};

export default WifeDetailsForm;
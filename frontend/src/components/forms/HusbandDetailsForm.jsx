import React from 'react';

const HusbandDetailsForm = ({ formData, handleInputChange, errors }) => {
  return (
    <div>
      <div className="space-y-4">
        <div>
          <label htmlFor="husbandName" className="block mb-1 font-semibold">Name(s)</label>
          <input
            type="text"
            id="husbandName"
            name="husbandName"
            value={formData.husbandName}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded ${errors.husbandName ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.husbandName && <p className="text-red-500 text-sm mt-1">{errors.husbandName}</p>}
        </div>

        <div>
          <label htmlFor="husbandSurname" className="block mb-1 font-semibold">Surname(s)</label>
          <input
            type="text"
            id="husbandSurname"
            name="husbandSurname"
            value={formData.husbandSurname}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded ${errors.husbandSurname ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.husbandSurname && <p className="text-red-500 text-sm mt-1">{errors.husbandSurname}</p>}
        </div>

        <div>
          <label htmlFor="husbandIdCard" className="block mb-1 font-semibold">CNI number</label>
          <input
            type="number"
            id="husbandIdCard"
            name="husbandIdCard"
            value={formData.husbandIdCard}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded ${errors.husbandIdCard ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.husbandIdCard && <p className="text-red-500 text-sm mt-1">{errors.husbandIdCard}</p>}
        </div>

        <div>
          <label htmlFor="husbandProfession" className="block mb-1 font-semibold">Profession</label>
          <input
            type="text"
            id="husbandProfession"
            name="husbandProfession"
            value={formData.husbandProfession}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded ${errors.husbandProfession ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.husbandProfession && <p className="text-red-500 text-sm mt-1">{errors.husbandProfession}</p>}
        </div>

        <div>
          <label htmlFor="husbandResidence" className="block mb-1 font-semibold">Residence</label>
          <input
            type="text"
            id="husbandResidence"
            name="husbandResidence"
            value={formData.husbandResidence}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded ${errors.husbandResidence ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.husbandResidence && <p className="text-red-500 text-sm mt-1">{errors.husbandResidence}</p>}
        </div>

        <div>
          <label htmlFor="husbandDateOfBirth" className="block mb-1 font-semibold">Date of birth</label>
          <input
            type="date"
            id="husbandDateOfBirth"
            name="husbandDateOfBirth"
            value={formData.husbandDateOfBirth}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded ${errors.husbandDateOfBirth ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.husbandDateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.husbandDateOfBirth}</p>}
        </div>

        <div>
          <label htmlFor="husbandCityOfBirth" className="block mb-1 font-semibold">Place of Birth</label>
          <input
            type="text"
            id="husbandCityOfBirth"
            name="husbandCityOfBirth"
            value={formData.husbandCityOfBirth}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded ${errors.husbandCityOfBirth ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.husbandCityOfBirth && <p className="text-red-500 text-sm mt-1">{errors.husbandCityOfBirth}</p>}
        </div>

        <div>
          <label htmlFor="husbandNationality" className="block mb-1 font-semibold">Nationality</label>
          <input
            type="text"
            id="husbandNationality"
            name="husbandNationality"
            value={formData.husbandNationality}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded ${errors.husbandNationality ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.husbandNationality && <p className="text-red-500 text-sm mt-1">{errors.husbandNationality}</p>}
        </div>

        <div>
          <label htmlFor="husbandFather" className="block mb-1 font-semibold">Father's name</label>
          <input
            type="text"
            id="husbandFather"
            name="husbandFather"
            value={formData.husbandFather}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded ${errors.husbandFather ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.husbandFather && <p className="text-red-500 text-sm mt-1">{errors.husbandFather}</p>}
        </div>

        <div>
          <label htmlFor="husbandMother" className="block mb-1 font-semibold">Mother's Name</label>
          <input
            type="text"
            id="husbandMother"
            name="husbandMother"
            value={formData.husbandMother}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded ${errors.husbandMother ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.husbandMother && <p className="text-red-500 text-sm mt-1">{errors.husbandMother}</p>}
        </div>

        <div>
          <label htmlFor="husbandFamilyHead" className="block mb-1 font-semibold">Family Head</label>
          <input
            type="text"
            id="husbandFamilyHead"
            name="husbandFamilyHead"
            value={formData.husbandFamilyHead}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded ${errors.husbandFamilyHead ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.husbandFamilyHead && <p className="text-red-500 text-sm mt-1">{errors.husbandFamilyHead}</p>}
        </div>

        <div>
          <label htmlFor="husbandWitness" className="block mb-1 font-semibold">Witness</label>
          <input
            type="text"
            id="husbandWitness"
            name="husbandWitness"
            value={formData.husbandWitness}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded ${errors.husbandWitness ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.husbandWitness && <p className="text-red-500 text-sm mt-1">{errors.husbandWitness}</p>}
        </div>
        
      </div>
    </div>
  );
};

export default HusbandDetailsForm;
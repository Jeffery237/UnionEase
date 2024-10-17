import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from "react-router-dom";
import Stepper from './Stepper';
import Swal from 'sweetalert2';
import HusbandDetailsForm from './HusbandDetailsForm';
import WifeDetailsForm from './WifeDetailsForm';
import MarriageDetailsForm from './MarriageDetails';
import { useRequestStore } from '../../store/reqStore';

const StepperControl = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([false, false, false]);
  const { submitRequest, error } = useRequestStore();
  const [formData, setFormData] = useState({
    husbandName: '',
    husbandSurname: '',
    husbandIdCard: '',
    husbandProfession: '',
    husbandResidence: '',
    husbandDateOfBirth: '',
    husbandCityOfBirth: '',
    husbandNationality: '',
    husbandFather: '',
    husbandMother: '',
    husbandFamilyHead: '',
    husbandWitness: '',
    wifeName: '',
    wifeSurname: '',
    wifeIdCard: '',
    wifeProfession: '',
    wifeResidence: '',
    wifeDateOfBirth: '',
    wifeCityOfBirth: '',
    wifeNationality: '',
    wifeFather: '',
    wifeMother: '',
    wifeFamilyHead: '',
    wifeWitness: '',
    marriageDate: ''
  });

  const [errors, setErrors] = useState({});

  const validateStep = (step) => {
    const newErrors = {};
    switch (step) {
      case 1:
        if (!formData.husbandName) newErrors.husbandName = 'Name is required';
        if (!formData.husbandSurname) newErrors.husbandSurname = 'Surname is required';
        if (!formData.husbandIdCard) newErrors.husbandIdCard = 'CNI number is required';
        if (!formData.husbandProfession) newErrors.husbandProfession = 'Profession is required';
        if (!formData.husbandResidence) newErrors.husbandResidence = 'Residence is required';
        if (!formData.husbandDateOfBirth) newErrors.husbandDateOfBirth = 'DOB is required';
        if (!formData.husbandCityOfBirth) newErrors.husbandCityOfBirth = 'City of birth is required';
        if (!formData.husbandNationality) newErrors.husbandNationality = 'Nationality is required';
        if (!formData.husbandFather) newErrors.husbandFather = 'Father name is required';
        if (!formData.husbandMother) newErrors.husbandMother = 'Mother name is required';
        if (!formData.husbandFamilyHead) newErrors.husbandFamilyHead = 'Family head is required';
        if (!formData.husbandWitness) newErrors.husbandWitness = 'Witness name is required';
        
        break;
      case 2:
        // Add validation for wife fields
        if (!formData.wifeName) newErrors.wifeName = 'Name is required';
        if (!formData.wifeSurname) newErrors.wifeSurname = 'Surname is required';
        if (!formData.wifeIdCard) newErrors.wifeIdCard = 'CNI number is required';
        if (!formData.wifeProfession) newErrors.wifeProfession = 'Profession is required';
        if (!formData.wifeResidence) newErrors.wifeResidence = 'Residence is required';
        if (!formData.wifeDateOfBirth) newErrors.wifeDateOfBirth = 'DOB is required';
        if (!formData.wifeCityOfBirth) newErrors.wifeCityOfBirth = 'City of birth is required';
        if (!formData.wifeNationality) newErrors.wifeNationality = 'Nationality is required';
        if (!formData.wifeFather) newErrors.wifeFather = 'Father name is required';
        if (!formData.wifeMother) newErrors.wifeMother = 'Mother name is required';
        if (!formData.wifeFamilyHead) newErrors.wifeFamilyHead = 'Family head is required';
        if (!formData.wifeWitness) newErrors.wifeWitness = 'Witness name is required';
        break;
      case 3:
        // Add validation for marriage details
        if (!formData.marriageDate) newErrors.marriageDate = 'Marriage date is required';
        break;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

// Handle moving to the next step
const handleNext = () => {
  if (validateStep(currentStep)) {
    setCompletedSteps((prev) => {
      const newCompletedSteps = [...prev];
      newCompletedSteps[currentStep - 1] = true;
      return newCompletedSteps;
    });
    setCurrentStep(currentStep + 1);
  }
};

// Handle moving to the previous step
const handlePrevious = () => {
  setCurrentStep(currentStep - 1);
};

// Handle input changes
const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });
};
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep(3)) {
      console.log('Form Data:', formData);
      // Submit data to backend
      try {
        // Show loading state
          Swal.fire({
          title: 'Submitting request...',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });
        const data = {
          formData: formData,
        };
      const result = await submitRequest(data);
        if(result){
          // Close loading dialog
          Swal.close();
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Your request has been submitted successfully. Please ensure to book an appointment for further request verification!',
            confirmButtonText: 'OK',
            confirmButtonColor: '#4CAF50'
          });
          navigate("/appointments")
        }
        
      } catch (error) {
        console.log(error.response || error.message);
        setErrors(error.response?.data?.message || 'Your request could not be sent.');
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: error.response?.data?.message || 'Your request could not be sent.',
          confirmButtonText: 'OK',
          confirmButtonColor: '#F44336'
        });
      }      
    }else {
      // Handle validation failure
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: 'Please check your inputs and try again.',
        confirmButtonText: 'OK',
        confirmButtonColor: '#FFA000'
      });
    }
  };

  return (
    <div className="md:w-full mx-auto mt-6 px-6">
      <Stepper currentStep={currentStep} completedSteps={completedSteps} />
      <form onSubmit={handleSubmit}>
        {currentStep === 1 && (
          <HusbandDetailsForm
            formData={formData}
            handleInputChange={handleInputChange}
            errors={errors}
          />
        )}
        {currentStep === 2 && (
          <WifeDetailsForm
            formData={formData}
            handleInputChange={handleInputChange}
            errors={errors}
          />
        )}
        {currentStep === 3 && (
          <MarriageDetailsForm
            formData={formData}
            handleInputChange={handleInputChange}
            errors={errors}
          />
        )}
        <div className="mt-4 flex justify-end gap-7">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={handlePrevious}
              className="bg-gray-600 text-white px-4 py-2 rounded"
            >
              Previous
            </button>
          )}
          {currentStep < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default StepperControl;
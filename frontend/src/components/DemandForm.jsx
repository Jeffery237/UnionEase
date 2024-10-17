// DemandForm.js
import React, { useState } from 'react';
import HusbandDetails from './forms/HusbandDetailsForm';
import WifeDetails from './forms/WifeDetailsForm';
import MarriageDetails from './forms/MarriageDetails';

const DemandForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    husband: {},
    wife: {},
    marriage: {}
  });

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handlePrevious = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  const updateFormData = (section, data) => {
    setFormData((prevData) => ({
      ...prevData,
      [section]: { ...prevData[section], ...data }
    }));
  };

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return <HusbandDetails data={formData.husband} updateData={(data) => updateFormData('husband', data)} />;
      case 1:
        return <WifeDetails data={formData.wife} updateData={(data) => updateFormData('wife', data)} />;
      case 2:
        return <MarriageDetails data={formData.marriage} updateData={(data) => updateFormData('marriage', data)} />;
      default:
        return null;
    }
  };

  return (
    <div className="demand-form">
      <h2>DEMAND FORM</h2>
      <form onSubmit={handleSubmit}>
        {renderStep()}
        <div className="form-navigation">
          {activeStep > 0 && (
            <button type="button" onClick={handlePrevious} className="btn btn-secondary">
              Previous
            </button>
          )}
          {activeStep < 2 ? (
            <button type="button" onClick={handleNext} className="btn btn-primary">
              Next
            </button>
          ) : (
            <button type="submit" className="btn btn-success">
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default DemandForm;


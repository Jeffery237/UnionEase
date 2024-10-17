import React from 'react';
import { UserRound, Heart, Check } from 'lucide-react';
import { motion } from 'framer-motion';

const Stepper = ({ currentStep, completedSteps }) => {
  const steps = [
    { name: 'Husband Details', icon: UserRound },
    { name: 'Wife Details', icon: UserRound },
    { name: 'Marriage Details', icon: Heart },
  ];
  const stepPercentage = 100 / (steps.length - 1);


  return (
    <div className="flex justify-between mb-8 relative">
      <div className="absolute top-5 left-[5%] right-[5%] h-0.5 bg-gray-400">
        <motion.div 
          className="h-full bg-green-600"
          initial={{ width: '0%' }}
          animate={{ width: `${(currentStep - 1) * stepPercentage}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      {steps.map((step, index) => {
        // Use optional chaining to safely access completedSteps
        const isCompleted = completedSteps?.[index] ?? false;
        const isCurrent = index + 1 === currentStep;
        return (
          <div key={index} className="flex flex-col items-center z-10">
            <motion.div
              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                isCompleted ? 'bg-green-600' : (isCurrent ? 'bg-green-600' : 'bg-gray-300')
              } text-white`}
              initial={{ scale: 1 }}
              animate={{ scale: isCurrent ? 1.1 : 1 }}
              transition={{ duration: 0.3 }}
            >
              {isCompleted ? <Check size={25} /> : <step.icon size={25} />}
            </motion.div>
            <div className={`text-sm mt-2 ${isCurrent ? 'text-gray-400 font-semibold' : ''}`}>{step.name}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;
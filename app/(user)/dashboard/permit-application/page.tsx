'use client';

import { useState } from 'react';
import CapacityAndExperience from '@/components/consultant-permit/capacity-and-experience';
import NatureOfOperations from '@/components/consultant-permit/nature-of-operations';
import OpenBurning from '@/components/consultant-permit/open-burning';
import PermitTable from '@/components/consultant-permit/permit-table';
import TypeAndNature from '@/components/consultant-permit/type-and-nature';
import PermitApplications from '@/components/consultant-permit/permit-application';

type Step = 1 | 2 | 3 | 4 | 5;

const PermitApplication = () => {
  const [isAdd, setIsAdd] = useState(false);
  const [currentStep, setCurrentStep] = useState<Step>(1);

  const handleProceed = () => {
    if (currentStep < 5) {
      setCurrentStep((prev) => (prev + 1) as Step);
    }
  };

  const handleReturn = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as Step);
    } else {
      setIsAdd(false); // Return to table view if on first step
    }
  };

  const renderStepComponent = () => {
    switch (currentStep) {
      case 1:
        return (
          <PermitApplications
            onProceed={handleProceed}
            onReturn={handleReturn}
          />
        );
      case 2:
        return (
          <TypeAndNature onProceed={handleProceed} onReturn={handleReturn} />
        );
      case 2:
        return (
          <CapacityAndExperience
            onProceed={handleProceed}
            onReturn={handleReturn}
          />
        );
      case 3:
        return (
          <NatureOfOperations
            onProceed={handleProceed}
            onReturn={handleReturn}
          />
        );
      case 4:
        return (
          <OpenBurning onProceed={handleProceed} onReturn={handleReturn} />
        );
    }
  };

  return (
    <div className='px-9 py-6'>
      <div className='mb-8'>
        <h1 className='text-[#3E8290] text-2xl not-italic font-medium leading-[normal] mb-2'>
          Permit Application
        </h1>
        <p className='text-[#696969] text-sm not-italic font-normal leading-[normal]'>
          Welcome to the application process
        </p>
      </div>

      {isAdd ? (
        <>
          <div className='flex items-center gap-6 mb-8'>
            {[1, 2, 3, 4, 5].map((step) => (
              <div key={step} className='flex items-center gap-2'>
                <div
                  className={`w-8 h-8 rounded-full ${
                    step === currentStep
                      ? 'bg-[#3E8290] text-white'
                      : 'bg-[#E4E7EC] text-[#696969]'
                  } flex items-center justify-center`}
                >
                  {step}
                </div>
                <span
                  className={
                    step === currentStep
                      ? 'text-[#3E8290] font-medium'
                      : 'text-[#696969]'
                  }
                >
                  {step === 1 && 'Permit Application'}
                  {step === 2 && 'Type and Nature'}
                  {step === 3 && 'Capacity and Experience'}
                  {step === 4 && 'Nature of Operations'}
                  {step === 5 && 'Open Burning'}
                </span>
              </div>
            ))}
          </div>
          <div className='bg-white'>{renderStepComponent()}</div>
        </>
      ) : (
        <PermitTable onAdd={() => setIsAdd(true)} />
      )}
    </div>
  );
};

export default PermitApplication;

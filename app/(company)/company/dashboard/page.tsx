'use client';

import { formatDate } from '@/utils/format-date';
import { useState } from 'react';
import DashboardTable from '@/components/consultant/consultant-registration/dashboard-table';
import Link from 'next/link';
import CompanyDocumentUploads from '@/components/company/company-registration/company-document-uploads';
import CompanyServices from '@/components/company/company-registration/company-services';
import CompanyProfile from '@/components/company/company-registration/company-profile';
import { useAuth } from '@/context/auth-context';
import CompanyDetails from '@/components/company/company-registration/company-details';
type Step = 1 | 2 | 3 | 4;

const CompanyDashboard = () => {
  const [registrationStatus, setRegistrationStatus] = useState(true);
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const { user } = useAuth();

  const handleProceed = () => {
    console.log('Current step before:', currentStep); // Debug log
    if (currentStep < 4) {
      setCurrentStep((prev) => {
        const nextStep = (prev + 1) as Step;
        console.log('Moving to step:', nextStep); // Debug log
        return nextStep;
      });
    }
  };

  const handleReturn = () => {
    if (currentStep > 1) {
      const prevStep = Math.max(currentStep - 1, 1) as Step;
      setCurrentStep(prevStep);
    }
  };

  const renderStepComponent = () => {
    switch (currentStep) {
      case 1:
        return (
          <CompanyDetails onProceed={handleProceed} onReturn={handleReturn} />
        );
      case 2:
        return (
          <CompanyDocumentUploads
            onProceed={handleProceed}
            onReturn={handleReturn}
          />
        );
      case 3:
        return (
          <CompanyServices onProceed={handleProceed} onReturn={handleReturn} />
        );
      case 4:
        return (
          <CompanyProfile onProceed={handleProceed} onReturn={handleReturn} />
        );
    }
  };

  return (
    <div className='w-full'>
      {registrationStatus && (
        <div className='flex items-center justify-center w-full bg-[#254D55] text-white p-6 -mt-4'>
          <h6 className='text-white text-base not-italic font-medium leading-[normal]'>
            You're yet to complete your registration.{' '}
            <span
              className='text-[#FC0] cursor-pointer underline'
              onClick={() => setRegistrationStatus(false)}
            >
              Click here to complete your registration
            </span>
          </h6>
        </div>
      )}
      <div className='px-9 py-6 border-b border-solid border-[#BFBFBF]'>
        <h5 className='text-[#696969] text-base not-italic font-normal leading-[normal]'>
          {formatDate(new Date())}
        </h5>
        <h1 className='text-[#3E8290] text-2xl not-italic font-medium leading-[normal]'>
          Hello, {user?.name}
        </h1>
      </div>
      {registrationStatus ? (
        <DashboardTable />
      ) : (
        <div className='px-9 py-6'>
          <div className='flex items-center gap-2 text-sm text-[#696969] mb-8'>
            <Link href='/dashboard' className='hover:text-[#3E8290]'>
              Dashboard
            </Link>
            <span>{'>'}</span>
            <span>Registration</span>
          </div>
          <div className='flex items-center gap-6 mb-8'>
            {[1, 2, 3, 4].map((step) => (
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
                  {step === 1 && 'Company details'}
                  {step === 2 && 'Upload documents'}
                  {step === 3 && 'Services'}
                  {step === 4 && 'Profile of contact'}
                </span>
              </div>
            ))}
          </div>
          <div className='bg-white'>{renderStepComponent()}</div>
        </div>
      )}
    </div>
  );
};

export default CompanyDashboard;

'use client';

import { useState } from 'react';
import Dropdown from '@/components/dropdown';

interface FormData {
  company: string;
  facility: string;
  year: string;
  permitType: string;
}

interface PermitApplicationsProps {
  onProceed: () => void;
  onReturn: () => void;
}

const PermitApplications = ({
  onProceed,
  onReturn,
}: PermitApplicationsProps) => {
  const [formData, setFormData] = useState<FormData>({
    company: '',
    facility: '',
    year: '',
    permitType: '',
  });

  // Sample data - replace with actual data from API
  const companies = [
    { value: 'bengis-fredo', label: 'BENGIS FREDO' },
    // Add more companies
  ];

  const facilities = [
    { value: 'bengis', label: 'BENGIS' },
    // Add more facilities
  ];

  const years = [
    { value: '2024', label: '2024' },
    { value: '2023', label: '2023' },
    { value: '2022', label: '2022' },
  ];

  const permitTypes = [
    { value: 'air-quality', label: 'Air Quality Permit' },
    // Add more permit types
  ];

  const handleSubmit = () => {
    // Handle form submission
    console.log(formData);
  };

  return (
    <div className='p-6 bg-white rounded-lg'>
      <h2 className='text-[#101828] text-lg font-medium mb-6'>
        Fill in the details to proceed with your application
      </h2>

      <div className='space-y-0 w-full'>
        <Dropdown
          id='company'
          label='Select Company'
          required
          searchable
          placeholder='Select company'
          value={formData.company}
          onChange={(value) =>
            setFormData((prev) => ({ ...prev, company: value }))
          }
          options={companies}
          className='w-full px-3.5 py-2.5'
        />

        <Dropdown
          id='facility'
          label='Select Facility'
          required
          searchable
          placeholder='Select facility'
          value={formData.facility}
          onChange={(value) =>
            setFormData((prev) => ({ ...prev, facility: value }))
          }
          options={facilities}
          className='w-full px-3.5 py-2.5'
        />

        <Dropdown
          id='year'
          label='Select Year'
          required
          placeholder='Select year'
          value={formData.year}
          onChange={(value) =>
            setFormData((prev) => ({ ...prev, year: value }))
          }
          options={years}
          className='w-full px-3.5 py-2.5'
        />

        <Dropdown
          id='permitType'
          label='Select Permit Type'
          required
          placeholder='Select permit type'
          value={formData.permitType}
          onChange={(value) =>
            setFormData((prev) => ({ ...prev, permitType: value }))
          }
          options={permitTypes}
          className='w-full px-3.5 py-2.5'
        />

        <div className='flex justify-end'>
          <button
            onClick={onProceed}
            disabled={!Object.values(formData).every(Boolean)}
            className='px-8 py-3 bg-[#3E8290] text-white rounded-lg hover:bg-[#357381] disabled:opacity-50 disabled:cursor-not-allowed'
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default PermitApplications;

'use client';

import { useState } from 'react';
import Dropdown from '@/components/dropdown';

interface FormData {
  company: string;
  facility: string;
  year: string;
  reportType: string;
}

interface EnvironmentReportProps {
  onProceed?: () => void;
  onReturn?: () => void;
}

const EnvironmentReport = ({ onProceed, onReturn }: EnvironmentReportProps) => {
  const [formData, setFormData] = useState<FormData>({
    company: '',
    facility: '',
    year: '',
    reportType: '',
  });

  // Sample data - replace with actual data from API
  const companies = [
    { value: 'bengis-fredo', label: 'BENGIS Fredo' },
    // Add more companies as needed
  ];

  const facilities = [
    { value: 'bengis', label: 'BENGIS' },
    // Add more facilities as needed
  ];

  const years = [
    { value: '2024', label: '2024' },
    { value: '2023', label: '2023' },
    { value: '2022', label: '2022' },
  ];

  const reportTypes = [
    { value: 'ear', label: 'Environmental Audit Report (EAR)' },
    { value: 'emp', label: 'Environmental Management Plan (EMP)' },
    // Add more report types as needed
  ];

  const handleSubmit = () => {
    // Handle form submission
    console.log(formData);
    onProceed?.();
  };

  return (
    <div className='p-6 bg-white rounded-lg'>
      <h2 className='text-[#101828] text-lg font-medium mb-6'>
        Fill in the details to proceed with your application
      </h2>

      <div className='space-y-6 w-full'>
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
          id='reportType'
          label='Select Report Type'
          required
          placeholder='Select report type'
          value={formData.reportType}
          onChange={(value) =>
            setFormData((prev) => ({ ...prev, reportType: value }))
          }
          options={reportTypes}
          className='w-full px-3.5 py-2.5'
        />

        <div className='flex justify-between mt-8'>
          {onReturn && (
            <button
              onClick={onReturn}
              className='px-8 py-3 border border-[#3E8290] text-[#3E8290] rounded-lg hover:bg-gray-50'
            >
              Return
            </button>
          )}
          <button
            onClick={handleSubmit}
            disabled={!Object.values(formData).every(Boolean)}
            className='px-8 py-3 bg-[#3E8290] text-white rounded-lg hover:bg-[#357381] disabled:opacity-50 disabled:cursor-not-allowed ml-auto'
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnvironmentReport;

'use client';

import { useState } from 'react';
import Dropdown from '@/components/dropdown';

interface FormData {
  applicationState: string;
  existingPermit: string;
  shareholding: string;
  permitHistory: string;
}

const TypeAndNature = () => {
  const [formData, setFormData] = useState<FormData>({
    applicationState: '',
    existingPermit: '',
    shareholding: '',
    permitHistory: '',
  });

  // Options for each dropdown
  const applicationStates = [
    { value: 'fresh', label: 'Fresh' },
    { value: 'renewal', label: 'Renewal' },
    { value: 'rehearing', label: 'Rehearing' },
    { value: 'amendment', label: 'Amendment' },
    { value: 'appeal', label: 'Appeal' },
  ];

  const yesNoOptions = [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' },
  ];

  return (
    <div className='p-6 bg-white rounded-lg'>
      <h2 className='text-[#101828] text-lg font-medium mb-6'>
        Fill the form below for Air Quality Permit
      </h2>

      <div className='space-y-0 w-full'>
        <Dropdown
          id='applicationState'
          label='Application State'
          required
          placeholder='Select application state'
          value={formData.applicationState}
          onChange={(value) =>
            setFormData((prev) => ({ ...prev, applicationState: value }))
          }
          options={applicationStates}
          className='w-full px-3.5 py-2.5'
        />

        <Dropdown
          id='existingPermit'
          label='Does the organization have an existing permit issued by the agency?'
          required
          placeholder='Select'
          value={formData.existingPermit}
          onChange={(value) =>
            setFormData((prev) => ({ ...prev, existingPermit: value }))
          }
          options={yesNoOptions}
          className='w-full px-3.5 py-2.5'
        />

        <Dropdown
          id='shareholding'
          label='Does the organization own more than ten percent (10%) shareholding in another entity?'
          required
          placeholder='Select'
          value={formData.shareholding}
          onChange={(value) =>
            setFormData((prev) => ({ ...prev, shareholding: value }))
          }
          options={yesNoOptions}
          className='w-full px-3.5 py-2.5'
        />

        <Dropdown
          id='permitHistory'
          label='Has the applicant ever been denied a permit, suspended or revoked?'
          required
          placeholder='Select'
          value={formData.permitHistory}
          onChange={(value) =>
            setFormData((prev) => ({ ...prev, permitHistory: value }))
          }
          options={yesNoOptions}
          className='w-full px-3.5 py-2.5'
        />

        <div className='flex justify-between mt-8'>
          <button className='px-8 py-3 border border-[#3E8290] text-[#3E8290] rounded-lg hover:bg-gray-50'>
            Return
          </button>
          <button
            onClick={() => console.log(formData)}
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

export default TypeAndNature;

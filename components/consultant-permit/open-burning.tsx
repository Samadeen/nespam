'use client';

import { useState } from 'react';

interface FormData {
  burningLocation: string;
  burningDays: string;
  itemDescription: string;
  pollutionAbatement: string;
}

const OpenBurning = () => {
  const [formData, setFormData] = useState<FormData>({
    burningLocation: '',
    burningDays: '',
    itemDescription: '',
    pollutionAbatement: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className='py-6 bg-white rounded-lg'>
      <h2 className='text-[#101828] text-lg font-medium mb-6'>
        Fill the form below related to Open Burning
      </h2>

      <div className='space-y-6'>
        <div>
          <label className='class-label block text-[#344054] text-sm font-medium mb-1'>
            What location is the burning taking place?{' '}
            <span className='text-red-500'>*</span>
          </label>
          <input
            type='text'
            name='burningLocation'
            value={formData.burningLocation}
            onChange={handleInputChange}
            className='class-input w-full px-3.5 py-2.5 rounded-lg border border-[#D0D5DD] focus:outline-none focus:ring-2 focus:ring-[#3E8290]'
            placeholder='Enter location'
          />
        </div>

        <div>
          <label className='class-label block text-[#344054] text-sm font-medium mb-1'>
            Upon the following days, viz.{' '}
            <span className='text-red-500'>*</span>
          </label>
          <input
            type='text'
            name='burningDays'
            value={formData.burningDays}
            onChange={handleInputChange}
            className='class-input w-full px-3.5 py-2.5 rounded-lg border border-[#D0D5DD] focus:outline-none focus:ring-2 focus:ring-[#3E8290]'
            placeholder='Enter days'
          />
        </div>

        <div>
          <label className='class-label block text-[#344054] text-sm font-medium mb-1'>
            Type/Description of item(s) to be Burned{' '}
            <span className='text-red-500'>*</span>
          </label>
          <input
            type='text'
            name='itemDescription'
            value={formData.itemDescription}
            onChange={handleInputChange}
            className='class-input w-full px-3.5 py-2.5 rounded-lg border border-[#D0D5DD] focus:outline-none focus:ring-2 focus:ring-[#3E8290]'
            placeholder='Enter description'
          />
        </div>

        <div>
          <label className='class-label block text-[#344054] text-sm font-medium mb-1'>
            Describe pollution abatement/monitoring facilities on site
            (including details of year of installation, capacity, etc){' '}
            <span className='text-red-500'>*</span>
          </label>
          <input
            type='text'
            name='pollutionAbatement'
            value={formData.pollutionAbatement}
            onChange={handleInputChange}
            className='class-input w-full px-3.5 py-2.5 rounded-lg border border-[#D0D5DD] focus:outline-none focus:ring-2 focus:ring-[#3E8290]'
            placeholder='Enter details'
          />
        </div>

        <div className='flex justify-between mt-8'>
          <button className='px-8 py-3 border border-[#3E8290] text-[#3E8290] rounded-lg hover:bg-gray-50'>
            Return
          </button>
          <button className='px-8 py-3 bg-[#3E8290] text-white rounded-lg hover:bg-[#357381]'>
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default OpenBurning;

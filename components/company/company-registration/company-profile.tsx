'use client';

import { useState } from 'react';
import { states, LGAs } from '@/utils/use-state';
import Dropdown from '@/components/dropdown';

interface CompanyProfileData {
  fullName: string;
  email: string;
  nin: string;
  mobile: string;
  state: string;
  lga: string;
  city: string;
  address: string;
  website: string;
}

interface CompanyProfileProps {
  onProceed: () => void;
  onReturn: () => void;
}

const CompanyProfile = ({ onProceed, onReturn }: CompanyProfileProps) => {
  const [formData, setFormData] = useState<CompanyProfileData>({
    fullName: '',
    email: '',
    nin: '',
    mobile: '',
    state: '',
    lga: '',
    city: '',
    address: '',
    website: '',
  });

  const [selectedState, setSelectedState] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Convert states array to dropdown options format
  const stateOptions = states.map((state) => ({
    value: state.label,
    label: state.label,
  }));

  // Convert LGAs array to dropdown options format
  const lgaOptions = selectedState
    ? LGAs[selectedState as keyof typeof LGAs]?.map((lga) => ({
        value: lga,
        label: lga,
      })) || []
    : [];

  return (
    <div className='p-6 bg-white rounded-lg'>
      <h2 className='text-[#101828] text-lg font-medium mb-2'>
        Profile of Contact
      </h2>
      <p className='text-[#696969] text-sm mb-6'>
        Fill in the details below to update your contact profile
      </p>

      <div className='grid grid-cols-2 gap-6'>
        <div>
          <label
            htmlFor='fullName'
            className='class-label block text-[#344054] text-sm font-medium mb-1'
          >
            Full Name <span className='text-red-500'>*</span>
          </label>
          <input
            type='text'
            id='fullName'
            name='fullName'
            placeholder='John Doe'
            value={formData.fullName}
            onChange={handleChange}
            className='class-input w-full px-3.5 py-2.5 rounded-lg border border-[#D0D5DD] focus:outline-none focus:ring-2 focus:ring-[#3E8290]'
          />
        </div>

        <div>
          <label
            htmlFor='email'
            className='class-label block text-[#344054] text-sm font-medium mb-1'
          >
            Email Address <span className='text-red-500'>*</span>
          </label>
          <input
            type='email'
            id='email'
            name='email'
            placeholder='JohnDoe@gmail.com'
            value={formData.email}
            onChange={handleChange}
            className='class-input w-full px-3.5 py-2.5 rounded-lg border border-[#D0D5DD] focus:outline-none focus:ring-2 focus:ring-[#3E8290]'
          />
        </div>

        <div>
          <label
            htmlFor='nin'
            className='class-label block text-[#344054] text-sm font-medium mb-1'
          >
            NIN <span className='text-red-500'>*</span>
          </label>
          <input
            type='text'
            id='nin'
            name='nin'
            placeholder='00000000000'
            value={formData.nin}
            onChange={handleChange}
            className='class-input w-full px-3.5 py-2.5 rounded-lg border border-[#D0D5DD] focus:outline-none focus:ring-2 focus:ring-[#3E8290]'
          />
        </div>

        <div>
          <label
            htmlFor='mobile'
            className='class-label block text-[#344054] text-sm font-medium mb-1'
          >
            Mobile Number <span className='text-red-500'>*</span>
          </label>
          <input
            type='tel'
            id='mobile'
            name='mobile'
            placeholder='09012345678'
            value={formData.mobile}
            onChange={handleChange}
            className='class-input w-full px-3.5 py-2.5 rounded-lg border border-[#D0D5DD] focus:outline-none focus:ring-2 focus:ring-[#3E8290]'
          />
        </div>

        <div>
          <Dropdown
            id='state'
            options={stateOptions}
            value={formData.state}
            onChange={(value) => {
              setFormData((prev) => ({ ...prev, state: value, lga: '' }));
              setSelectedState(value);
            }}
            placeholder='Select state'
            label='State'
            required
            searchable
          />
        </div>

        <div>
          <Dropdown
            id='lga'
            options={lgaOptions}
            value={formData.lga}
            onChange={(value) => {
              setFormData((prev) => ({ ...prev, lga: value }));
            }}
            placeholder='Select LGA'
            label='Local Government'
            required
            searchable
            className={!selectedState ? 'opacity-50 cursor-not-allowed' : ''}
          />
        </div>

        <div>
          <label
            htmlFor='city'
            className='class-label block text-[#344054] text-sm font-medium mb-1'
          >
            City <span className='text-red-500'>*</span>
          </label>
          <input
            type='text'
            id='city'
            name='city'
            placeholder='Abeokuta'
            value={formData.city}
            onChange={handleChange}
            className='class-input w-full px-3.5 py-2.5 rounded-lg border border-[#D0D5DD] focus:outline-none focus:ring-2 focus:ring-[#3E8290]'
          />
        </div>

        <div>
          <label
            htmlFor='address'
            className='class-label block text-[#344054] text-sm font-medium mb-1'
          >
            Address <span className='text-red-500'>*</span>
          </label>
          <input
            type='text'
            id='address'
            name='address'
            placeholder='Home address'
            value={formData.address}
            onChange={handleChange}
            className='class-input w-full px-3.5 py-2.5 rounded-lg border border-[#D0D5DD] focus:outline-none focus:ring-2 focus:ring-[#3E8290]'
          />
        </div>

        <div>
          <label
            htmlFor='website'
            className='class-label block text-[#344054] text-sm font-medium mb-1'
          >
            Website URL <span className='text-red-500'>*</span>
          </label>
          <input
            type='url'
            id='website'
            name='website'
            placeholder='00000000'
            value={formData.website}
            onChange={handleChange}
            className='class-input w-full px-3.5 py-2.5 rounded-lg border border-[#D0D5DD] focus:outline-none focus:ring-2 focus:ring-[#3E8290]'
          />
        </div>
      </div>

      <div className='flex justify-between mt-8'>
        <button
          onClick={onReturn}
          className='px-8 py-3 border border-[#3E8290] text-[#3E8290] rounded-lg hover:bg-gray-50'
        >
          Return
        </button>
        <button
          onClick={onProceed}
          className='px-8 py-3 bg-[#3E8290] text-white rounded-lg hover:bg-[#357381]'
        >
          Proceed
        </button>
      </div>
    </div>
  );
};

export default CompanyProfile;

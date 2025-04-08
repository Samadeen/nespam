'use client';

import { states, LGAs } from '@/utils/use-state';
import { useState } from 'react';
import { api } from '@/lib/api';
import { Select } from 'antd';
import Dropdown from '@/components/dropdown';
import Button from '../../button';
import { toast } from 'react-hot-toast';
import { ConsultantDetailsPayload } from '@/types';

interface ConsultantDetailsProps {
  onProceed: () => void;
  onReturn: () => void;
}

const ConsultantDetails = ({ onProceed, onReturn }: ConsultantDetailsProps) => {
  const [selectedState, setSelectedState] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    state: '',
    city: '',
    legalStatus: '',
    workPhoneNo: '',
    faxNo: '',
    localGovernment: '',
    websiteURL: '',
    officeAddress: '',
    natureOfBusiness: '',
  });

  const handleStateChange = (value: string) => {
    setSelectedState(value);
    setFormData((prev) => ({
      ...prev,
      state: value,
      localGovernment: '', // Reset LGA when state changes
    }));
  };

  const handleSubmit = async () => {
    try {
      // Get user info from localStorage
      const userInfo = localStorage.getItem('user_info');
      const user = userInfo ? JSON.parse(userInfo) : null;

      if (!user) {
        toast.error('User information not found');
        return;
      }

      const payload: ConsultantDetailsPayload = {
        user_id: user.user_id,
        fullname: formData.name,
        state: formData.state,
        lga: formData.localGovernment,
        city: formData.city,
        website_url: formData.websiteURL,
        legal_status: formData.legalStatus,
        office_address: formData.officeAddress,
        phone_number: formData.workPhoneNo,
        nature_of_business: formData.natureOfBusiness,
        fax_number: formData.faxNo || '',
        created_by: user.email,
      };

      await api.post('/add-consultant-details', payload);
      toast.success('Consultant details added successfully');
      onProceed();
    } catch (error) {
      console.error('Error submitting consultant details:', error);
      toast.error('Failed to add consultant details');
    }
  };

  // Validate form before proceeding
  const isFormValid = () => {
    const requiredFields = [
      formData.name,
      formData.state,
      formData.city,
      formData.legalStatus,
      formData.workPhoneNo,
      formData.localGovernment,
      formData.websiteURL,
      formData.officeAddress,
      formData.natureOfBusiness,
    ];

    return requiredFields.every((field) => field.trim() !== '');
  };

  return (
    <div className=''>
      <div className='flex items-center gap-2 mb-6'>
        <h2 className='text-[#101828] text-lg font-medium'>
          Add Consultant Details
        </h2>
        <span className='text-[#FF0000] text-sm'>
          (items marked * are mandatory)
        </span>
      </div>
      <div className='grid grid-cols-2 gap-6'>
        <label htmlFor='name' className='class-label'>
          Name <span className='text-[#FF0000]'>*</span>
          <input
            type='text'
            id='name'
            name='name'
            className='class-input'
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            placeholder='John Doe'
            required
          />
        </label>

        <label htmlFor='state' className='class-label'>
          {/* State <span className='text-[#FF0000]'>*</span> */}
          <Dropdown
            id='state'
            label='State'
            required
            searchable
            placeholder='Select State'
            value={selectedState}
            onChange={handleStateChange}
            options={states.map((state) => ({
              value: state.value,
              label: state.label,
            }))}
          />
        </label>

        <label htmlFor='city' className='class-label'>
          City <span className='text-[#FF0000]'>*</span>
          <input
            type='text'
            id='city'
            name='city'
            className='class-input'
            value={formData.city}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, city: e.target.value }))
            }
            placeholder='ABEOKUTA'
            required
          />
        </label>

        <label htmlFor='localGovernment' className='class-label'>
          {/* Local Government <span className='text-[#FF0000]'>*</span> */}
          <Dropdown
            id='localGovernment'
            label='Local Government'
            required
            searchable
            placeholder='Select Local Government'
            value={formData.localGovernment}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, localGovernment: value }))
            }
            options={
              selectedState
                ? LGAs[
                    states.find((s) => s.value === selectedState)
                      ?.label as keyof typeof LGAs
                  ]?.map((lga) => ({
                    value: lga,
                    label: lga,
                  })) || []
                : []
            }
          />
        </label>

        <label htmlFor='legalStatus' className='class-label'>
          {/* Legal Status <span className='text-[#FF0000]'>*</span> */}
          <Dropdown
            id='legalStatus'
            label='Legal Status'
            required
            placeholder='Select Legal Status'
            value={formData.legalStatus}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, legalStatus: value }))
            }
            options={[
              { value: 'PARTNERSHIP', label: 'Partnership' },
              { value: 'LIMITED_LIABILITY', label: 'Limited Liability' },
              { value: 'SOLE_PROPRIETORSHIP', label: 'Sole Proprietorship' },
            ]}
          />
        </label>

        <label htmlFor='websiteURL' className='class-label'>
          Website URL <span className='text-[#FF0000]'>*</span>
          <input
            type='url'
            id='websiteURL'
            name='websiteURL'
            className='class-input'
            value={formData.websiteURL}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, websiteURL: e.target.value }))
            }
            placeholder='www.randomsrandoms.com'
            required
          />
        </label>

        <label htmlFor='workPhoneNo' className='class-label'>
          Work Phone No <span className='text-[#FF0000]'>*</span>
          <input
            type='tel'
            id='workPhoneNo'
            name='workPhoneNo'
            className='class-input'
            value={formData.workPhoneNo}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, workPhoneNo: e.target.value }))
            }
            placeholder='08012345678'
            required
          />
        </label>

        <label htmlFor='officeAddress' className='class-label'>
          Office Address <span className='text-[#FF0000]'>*</span>
          <input
            type='text'
            id='officeAddress'
            name='officeAddress'
            className='class-input'
            value={formData.officeAddress}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                officeAddress: e.target.value,
              }))
            }
            placeholder='Random address'
            required
          />
        </label>

        <label htmlFor='faxNo' className='class-label'>
          Fax No
          <input
            type='text'
            id='faxNo'
            name='faxNo'
            className='class-input'
            value={formData.faxNo}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, faxNo: e.target.value }))
            }
            placeholder='123456789'
          />
        </label>

        <label htmlFor='natureOfBusiness' className='class-label'>
          Nature of Business <span className='text-[#FF0000]'>*</span>
          <input
            type='text'
            id='natureOfBusiness'
            name='natureOfBusiness'
            className='class-input'
            value={formData.natureOfBusiness}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                natureOfBusiness: e.target.value,
              }))
            }
            placeholder='Random'
            required
          />
        </label>

        <div className='col-span-2 flex justify-between mt-8'>
          <button
            onClick={onReturn}
            className='px-8 py-3 border border-[#3E8290] text-[#3E8290] rounded-lg hover:bg-gray-50'
          >
            Return
          </button>
          <button
            onClick={handleSubmit}
            disabled={!isFormValid()}
            className='px-8 py-3 bg-[#3E8290] text-white rounded-lg hover:bg-[#357381] disabled:opacity-50 disabled:cursor-not-allowed'
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsultantDetails;

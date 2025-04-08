'use client';

import { useState } from 'react';

interface Service {
  id: string;
  name: string;
  description: string;
}

interface ServicesProps {
  onProceed: () => void;
  onReturn: () => void;
}

const services: Service[] = [
  {
    id: 'environmental-audit',
    name: 'Environmental Audit',
    description:
      'Assessing compliance with environmental laws and regulations to ensure sustainable practices',
  },
  {
    id: 'environmental-management',
    name: 'Environmental Management System',
    description:
      'Developing frameworks for organizations to manage environmental responsibilities effectively',
  },
  {
    id: 'environmental-studies',
    name: 'Environmental Studies',
    description:
      'Conducting research to analyze environmental impacts and support decision-making',
  },
  {
    id: 'environmental-technology',
    name: 'Environmental Technology',
    description:
      'Promoting innovations to reduce pollution and improve environmental sustainability',
  },
  {
    id: 'laboratory-services',
    name: 'Laboratory Services',
    description:
      'Providing scientific analysis for air, water, soil, and waste samples',
  },
  {
    id: 'waste-management',
    name: 'Waste Management',
    description:
      'Implementing strategies for the safe disposal and recycling of waste materials',
  },
];

const Services = ({ onProceed, onReturn }: ServicesProps) => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleSelectAll = () => {
    setSelectedServices(
      selectedServices.length === services.length
        ? []
        : services.map((service) => service.id)
    );
  };

  const handleProceed = () => {
    console.log('Proceeding from Services...');
    onProceed();
  };

  const handleReturn = () => {
    console.log('Returning from Services...');
    onReturn();
  };

  return (
    <div className='p-6 bg-white rounded-lg'>
      <h2 className='text-[#101828] text-lg font-medium mb-2'>
        Add Consultancy Service(s)
      </h2>
      <p className='text-[#696969] text-sm mb-6'>
        Select one or more service(s)
      </p>

      <div className='overflow-hidden text-[#696969] text-sm not-italic font-normal leading-[normal]'>
        <div className='w-full px-2 bg-[#EEF8FA] grid grid-cols-[0.4fr_1fr_2fr] '>
          <div className='p-4 flex items-center gap-3'>
            <input
              type='checkbox'
              id='select-all'
              checked={selectedServices.length === services.length}
              onChange={handleSelectAll}
              className='w-4 h-4 rounded border-gray-300 text-[#3E8290] focus:ring-[#3E8290]'
            />
          </div>
          <p className='p-4'>Services</p>
          <p className='p-4'>Description</p>
        </div>
        {services.map((service, index) => (
          <div
            key={service.id}
            className={`w-full px-2 bg-[#fff] grid grid-cols-[0.4fr_1fr_2fr]  ${
              index !== services.length - 1 ? 'border-b border-[#F1F1F1]' : ''
            }`}
          >
            <div className='p-4 flex items-center gap-3'>
              <input
                type='checkbox'
                id={service.id}
                checked={selectedServices.includes(service.id)}
                onChange={() => handleServiceToggle(service.id)}
                className='w-4 h-4 rounded border-gray-300 text-[#3E8290] focus:ring-[#3E8290]'
              />
            </div>
            <p className='p-4'>{service.name}</p>
            <p className='p-4'>{service.description}</p>
          </div>
        ))}
      </div>

      <div className='flex justify-between mt-8'>
        <button
          onClick={handleReturn}
          className='px-8 py-3 border border-[#3E8290] text-[#3E8290] rounded-lg hover:bg-gray-50'
        >
          Return
        </button>
        <button
          onClick={handleProceed}
          className='px-8 py-3 bg-[#3E8290] text-white rounded-lg hover:bg-[#357381]'
          disabled={selectedServices.length === 0}
        >
          Proceed
        </button>
      </div>
    </div>
  );
};

export default Services;

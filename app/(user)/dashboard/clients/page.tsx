'use client';

import { ChevronUp, ChevronDown } from 'lucide-react';
import filterIcon from '@/public/assets/filter-lines.svg';
import Image from 'next/image';
import { useState } from 'react';

type SortDirection = 'asc' | 'desc' | null;
type SortField = 'sn' | 'facility' | 'company' | 'dateAppointed' | null;

interface ClientData {
  sn: number;
  facility: string;
  company: string;
  dateAppointed: string;
}

const Clients = () => {
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  // Sample data - replace with actual data from API
  const [clients] = useState<ClientData[]>([
    {
      sn: 1,
      facility: 'BENGIS Facility',
      company: 'BENGIS FREDO',
      dateAppointed: '2024-03-25',
    },
    {
      sn: 2,
      facility: 'Lagos Plant',
      company: 'ABC Manufacturing',
      dateAppointed: '2024-03-20',
    },
    // Add more sample data as needed
  ]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection((prev) =>
        prev === 'asc' ? 'desc' : prev === 'desc' ? null : 'asc'
      );
      setSortField((prev) =>
        prev === field && sortDirection === 'desc' ? null : field
      );
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return (
        <div className='inline-flex flex-col ml-1 text-gray-300'>
          <ChevronUp size={12} />
          <ChevronDown size={12} className='-mt-1' />
        </div>
      );
    }
    return sortDirection === 'asc' ? (
      <ChevronUp size={16} className='ml-1 text-[#3E8290]' />
    ) : (
      <ChevronDown size={16} className='ml-1 text-[#3E8290]' />
    );
  };

  return (
    <div className='px-9 py-6'>
      <div className='mb-8'>
        <h1 className='text-[#3E8290] text-2xl not-italic font-medium leading-[normal] mb-2'>
          Clients
        </h1>
        <p className='text-[#696969] text-sm not-italic font-normal leading-[normal]'>
          List of all clients
        </p>
      </div>

      <div className='border bg-white rounded-lg border-solid border-[#F1F1F1]'>
        <div className='flex items-center justify-between py-5 px-6'>
          <div className=''>
            <h2 className='text-[#3E8290] text-[1.125rem] not-italic font-medium leading-[normal] mb-1'>
              Client List
            </h2>
            <p className='text-[#696969] text-sm not-italic font-normal leading-[normal]'>
              Overview of all clients
            </p>
          </div>
          <div className='flex items-center gap-6'>
            <div className='flex items-center gap-2 cursor-pointer'>
              <Image src={filterIcon} alt='filter' />
              <span className='text-[#3E8290] text-sm not-italic font-medium leading-[normal]'>
                Filter
              </span>
            </div>
          </div>
        </div>
        <div className='mt-1 w-full overflow-x-auto'>
          <table className='w-full px-2 bg-[#EEF8FA]'>
            <thead>
              <tr>
                <th
                  className='py-3 px-4 text-left text-sm text-[#696969] font-normal cursor-pointer hover:bg-[#F0F0F0]'
                  onClick={() => handleSort('sn')}
                >
                  <div className='flex items-center'>
                    S/N
                    <SortIcon field='sn' />
                  </div>
                </th>
                <th
                  className='py-3 px-4 text-left text-sm text-[#696969] font-normal cursor-pointer hover:bg-[#F0F0F0]'
                  onClick={() => handleSort('facility')}
                >
                  <div className='flex items-center'>
                    Facilities
                    <SortIcon field='facility' />
                  </div>
                </th>
                <th
                  className='py-3 px-4 text-left text-sm text-[#696969] font-normal cursor-pointer hover:bg-[#F0F0F0]'
                  onClick={() => handleSort('company')}
                >
                  <div className='flex items-center'>
                    Company
                    <SortIcon field='company' />
                  </div>
                </th>
                <th
                  className='py-3 px-4 text-left text-sm text-[#696969] font-normal cursor-pointer hover:bg-[#F0F0F0]'
                  onClick={() => handleSort('dateAppointed')}
                >
                  <div className='flex items-center'>
                    Date Appointed
                    <SortIcon field='dateAppointed' />
                  </div>
                </th>
                <th className='py-3 px-4 text-left text-sm text-[#696969] font-normal'>
                  Action
                </th>
              </tr>
            </thead>
            <tbody className='bg-[#fff]'>
              {clients.map((client) => (
                <tr
                  key={client.sn}
                  className='border-t border-[#F1F1F1] hover:bg-gray-50'
                >
                  <td className='py-4 px-4 text-sm text-[#696969]'>
                    {client.sn}
                  </td>
                  <td className='py-4 px-4 text-sm text-[#696969]'>
                    {client.facility}
                  </td>
                  <td className='py-4 px-4 text-sm text-[#696969]'>
                    {client.company}
                  </td>
                  <td className='py-4 px-4 text-sm text-[#696969]'>
                    {new Date(client.dateAppointed).toLocaleDateString()}
                  </td>
                  <td className='py-4 px-4 text-sm'>
                    <button className='text-[#3E8290] hover:underline'>
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Clients;

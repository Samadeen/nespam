'use client';

import { ChevronUp, ChevronDown, Plus } from 'lucide-react';
import filterIcon from '@/public/assets/filter-lines.svg';
import Image from 'next/image';
import { useState } from 'react';

type SortDirection = 'asc' | 'desc' | null;
type SortField =
  | 'sn'
  | 'applicationId'
  | 'type'
  | 'year'
  | 'applicationDate'
  | 'status'
  | null;

interface PermitData {
  sn: number;
  applicationId: string;
  type: string;
  year: string;
  applicationDate: string;
  status: string;
}

interface PermitTableProps {
  onAdd: () => void;
}

const PermitTable = ({ onAdd }: PermitTableProps) => {
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  // Sample data - replace with actual data from API
  const [permits] = useState<PermitData[]>([
    {
      sn: 1,
      applicationId: 'APP-001',
      type: 'New Registration',
      year: '2024',
      applicationDate: '2024-03-25',
      status: 'Pending',
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
    <div className='py-6'>
      <p className='text-[#A1A1A1] text-sm not-italic font-normal leading-[normal] mb-8'>
        Dashboard <span className='text-[#3E8290]'>{'>'}</span> Permit
        Applications
      </p>
      <div className='border bg-white rounded-lg border-solid border-[#F1F1F1]'>
        <div className='flex items-center justify-between py-5 px-6'>
          <div className=''>
            <h2 className='text-[#3E8290] text-[1.125rem] not-italic font-medium leading-[normal] mb-1'>
              Permit Applications
            </h2>
            <p className='text-[#696969] text-sm not-italic font-normal leading-[normal]'>
              List of all permit applications
            </p>
          </div>
          <div className='flex items-center gap-6'>
            <div className='flex items-center gap-2 cursor-pointer'>
              <Image src={filterIcon} alt='filter' />
              <span className='text-[#3E8290] text-sm not-italic font-medium leading-[normal]'>
                Filter
              </span>
            </div>
            <button
              onClick={onAdd}
              className='flex items-center gap-2 cursor-pointer bg-[#3E8290] rounded-lg px-4 py-2'
            >
              <Plus className='text-[#fff]' />
              <span className='text-[#fff] text-sm not-italic font-medium leading-[normal]'>
                Apply
              </span>
            </button>
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
                  onClick={() => handleSort('applicationId')}
                >
                  <div className='flex items-center'>
                    Application ID
                    <SortIcon field='applicationId' />
                  </div>
                </th>
                <th
                  className='py-3 px-4 text-left text-sm text-[#696969] font-normal cursor-pointer hover:bg-[#F0F0F0]'
                  onClick={() => handleSort('type')}
                >
                  <div className='flex items-center'>
                    Type
                    <SortIcon field='type' />
                  </div>
                </th>
                <th
                  className='py-3 px-4 text-left text-sm text-[#696969] font-normal cursor-pointer hover:bg-[#F0F0F0]'
                  onClick={() => handleSort('year')}
                >
                  <div className='flex items-center'>
                    Year
                    <SortIcon field='year' />
                  </div>
                </th>
                <th
                  className='py-3 px-4 text-left text-sm text-[#696969] font-normal cursor-pointer hover:bg-[#F0F0F0]'
                  onClick={() => handleSort('applicationDate')}
                >
                  <div className='flex items-center'>
                    Application Date
                    <SortIcon field='applicationDate' />
                  </div>
                </th>
                <th
                  className='py-3 px-4 text-left text-sm text-[#696969] font-normal cursor-pointer hover:bg-[#F0F0F0]'
                  onClick={() => handleSort('status')}
                >
                  <div className='flex items-center'>
                    Status
                    <SortIcon field='status' />
                  </div>
                </th>
                <th className='py-3 px-4 text-left text-sm text-[#696969] font-normal'>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {/* {permits.map((permit) => (
                <tr
                  key={permit.applicationId}
                  className='border-t border-[#F1F1F1] hover:bg-gray-50'
                >
                  <td className='py-4 px-4 text-sm text-[#696969]'>
                    {permit.sn}
                  </td>
                  <td className='py-4 px-4 text-sm text-[#696969]'>
                    {permit.applicationId}
                  </td>
                  <td className='py-4 px-4 text-sm text-[#696969]'>
                    {permit.type}
                  </td>
                  <td className='py-4 px-4 text-sm text-[#696969]'>
                    {permit.year}
                  </td>
                  <td className='py-4 px-4 text-sm text-[#696969]'>
                    {permit.applicationDate}
                  </td>
                  <td className='py-4 px-4 text-sm'>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        permit.status === 'Approved'
                          ? 'bg-green-100 text-green-800'
                          : permit.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {permit.status}
                    </span>
                  </td>
                  <td className='py-4 px-4 text-sm'>
                    <button className='text-[#3E8290] hover:underline'>
                      View Details
                    </button>
                  </td>
                </tr>
              ))} */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PermitTable;

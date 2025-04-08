import { Filter, ChevronUp, ChevronDown } from 'lucide-react';
import filterIcon from '@/public/assets/filter-lines.svg';
import Image from 'next/image';
import { useState } from 'react';

type SortDirection = 'asc' | 'desc' | null;
type SortField = 'sn' | 'activity' | 'date' | 'status' | null;

const CompanyTable = () => {
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Toggle direction if same field is clicked
      setSortDirection((prev) =>
        prev === 'asc' ? 'desc' : prev === 'desc' ? null : 'asc'
      );
      setSortField((prev) =>
        prev === field && sortDirection === 'desc' ? null : field
      );
    } else {
      // Set new field and direction
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
      <p className='text-[#A1A1A1] text-sm not-italic font-normal leading-[normal] mb-8'>
        Dashboard
      </p>
      <div className='border bg-white rounded-lg border-solid border-[#F1F1F1] '>
        <div className='flex items-center justify-between py-5 px-6'>
          <div className=''>
            <h2 className='text-[#3E8290] text-[1.125rem] not-italic font-medium leading-[normal] mb-1'>
              Table of Recent
            </h2>
            <p className='text-[#696969] text-sm not-italic font-normal leading-[normal]'>
              List of recent activities
            </p>
          </div>
          <div className='flex items-center gap-2 cursor-pointer'>
            <Image src={filterIcon} alt='filter' />
            <span className='text-[#3E8290] text-sm not-italic font-medium leading-[normal]'>
              Filter
            </span>
          </div>
        </div>
        <div className='mt-1 w-full'>
          <table className='w-full px-2 bg-[#EEF8FA]'>
            <thead className=''>
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
                  onClick={() => handleSort('activity')}
                >
                  <div className='flex items-center'>
                    Activity
                    <SortIcon field='activity' />
                  </div>
                </th>
                <th
                  className='py-3 px-4 text-left text-sm text-[#696969] font-normal cursor-pointer hover:bg-[#F0F0F0]'
                  onClick={() => handleSort('date')}
                >
                  <div className='flex items-center'>
                    Date
                    <SortIcon field='date' />
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
              {/* Table body content will go here */}
              {/* You can map through your data here */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CompanyTable;

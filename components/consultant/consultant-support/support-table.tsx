'use client';
import { ChevronUp, ChevronDown, Plus } from 'lucide-react';
import filterIcon from '@/public/assets/filter-lines.svg';
import Image from 'next/image';
import { useState } from 'react';

type SortDirection = 'asc' | 'desc' | null;
type SortField = 'sn' | 'subject' | 'dateSubmitted' | 'status' | null;

interface SupportData {
  sn: number;
  subject: string;
  dateSubmitted: string;
  status: 'Open' | 'Closed';
}

const SupportTable = () => {
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  // Sample data - replace with actual data from API
  const [supports] = useState<SupportData[]>([
    {
      sn: 1,
      subject: 'Application Process Inquiry',
      dateSubmitted: '2024-03-25',
      status: 'Open',
    },
    {
      sn: 2,
      subject: 'Document Upload Issue',
      dateSubmitted: '2024-03-20',
      status: 'Closed',
    },
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
    <div>
      <div className='mb-8'>
        <h1 className='text-[#3E8290] text-2xl not-italic font-medium leading-[normal] mb-2'>
          Support
        </h1>
        <p className='text-[#696969] text-sm not-italic font-normal leading-[normal]'>
          List of all support tickets
        </p>
      </div>

      <div className='border bg-white rounded-lg border-solid border-[#F1F1F1]'>
        <div className='flex items-center justify-between py-5 px-6'>
          <div className=''>
            <h2 className='text-[#3E8290] text-[1.125rem] not-italic font-medium leading-[normal] mb-1'>
              Support History
            </h2>
            <p className='text-[#696969] text-sm not-italic font-normal leading-[normal]'>
              Overview of all support tickets
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
              onClick={() => {
                /* Add your support ticket handler here */
              }}
              className='flex items-center gap-2 cursor-pointer bg-[#3E8290] rounded-lg px-4 py-2'
            >
              <Plus size={16} className='text-[#fff]' />
              <span className='text-[#fff] text-sm not-italic font-medium leading-[normal]'>
                Create Ticket
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
                  onClick={() => handleSort('subject')}
                >
                  <div className='flex items-center'>
                    Subject
                    <SortIcon field='subject' />
                  </div>
                </th>
                <th
                  className='py-3 px-4 text-left text-sm text-[#696969] font-normal cursor-pointer hover:bg-[#F0F0F0]'
                  onClick={() => handleSort('dateSubmitted')}
                >
                  <div className='flex items-center'>
                    Date Submitted
                    <SortIcon field='dateSubmitted' />
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
              </tr>
            </thead>
            <tbody className='bg-[#fff]'>
              {supports.map((support) => (
                <tr
                  key={support.sn}
                  className='border-t border-[#F1F1F1] hover:bg-gray-50'
                >
                  <td className='py-4 px-4 text-sm text-[#696969]'>
                    {support.sn}
                  </td>
                  <td className='py-4 px-4 text-sm text-[#696969]'>
                    {support.subject}
                  </td>
                  <td className='py-4 px-4 text-sm text-[#696969]'>
                    {new Date(support.dateSubmitted).toLocaleDateString()}
                  </td>
                  <td className='py-4 px-4 text-sm'>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        support.status === 'Open'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {support.status}
                    </span>
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

export default SupportTable;

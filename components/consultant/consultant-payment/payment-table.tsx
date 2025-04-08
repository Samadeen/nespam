'use client';
import { ChevronUp, ChevronDown, Plus } from 'lucide-react';
import filterIcon from '@/public/assets/filter-lines.svg';
import Image from 'next/image';
import { useState } from 'react';

type SortDirection = 'asc' | 'desc' | null;
type SortField = 'sn' | 'invoiceId' | 'description' | 'amount' | 'date' | null;

interface PaymentData {
  sn: number;
  invoiceId: string;
  description: string;
  amount: number;
  date: string;
}

const ConsultantPaymentTable = () => {
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  // Sample data - replace with actual data from API
  const [payments] = useState<PaymentData[]>([
    {
      sn: 1,
      invoiceId: 'INV-001',
      description: 'Environmental Permit Application Fee',
      amount: 250000,
      date: '2024-03-25',
    },
    {
      sn: 2,
      invoiceId: 'INV-002',
      description: 'Consultation Service Fee',
      amount: 150000,
      date: '2024-03-20',
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

  // Format amount to Nigerian Naira
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(amount);
  };

  return (
    <div>
      <div className='mb-8'>
        <h1 className='text-[#3E8290] text-2xl not-italic font-medium leading-[normal] mb-2'>
          Payments
        </h1>
        <p className='text-[#696969] text-sm not-italic font-normal leading-[normal]'>
          List of all payments
        </p>
      </div>

      <div className='border bg-white rounded-lg border-solid border-[#F1F1F1]'>
        <div className='flex items-center justify-between py-5 px-6'>
          <div className=''>
            <h2 className='text-[#3E8290] text-[1.125rem] not-italic font-medium leading-[normal] mb-1'>
              Payment History
            </h2>
            <p className='text-[#696969] text-sm not-italic font-normal leading-[normal]'>
              Overview of all payments
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
                /* Add your payment handler here */
              }}
              className='flex items-center gap-2 cursor-pointer bg-[#3E8290] rounded-lg px-4 py-2'
            >
              <Plus size={16} className='text-[#fff]' />
              <span className='text-[#fff] text-sm not-italic font-medium leading-[normal]'>
                Make Payment
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
                  onClick={() => handleSort('invoiceId')}
                >
                  <div className='flex items-center'>
                    Invoice ID
                    <SortIcon field='invoiceId' />
                  </div>
                </th>
                <th
                  className='py-3 px-4 text-left text-sm text-[#696969] font-normal cursor-pointer hover:bg-[#F0F0F0]'
                  onClick={() => handleSort('description')}
                >
                  <div className='flex items-center'>
                    Description
                    <SortIcon field='description' />
                  </div>
                </th>
                <th
                  className='py-3 px-4 text-left text-sm text-[#696969] font-normal cursor-pointer hover:bg-[#F0F0F0]'
                  onClick={() => handleSort('amount')}
                >
                  <div className='flex items-center'>
                    Amount
                    <SortIcon field='amount' />
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
                <th className='py-3 px-4 text-left text-sm text-[#696969] font-normal'>
                  Action
                </th>
              </tr>
            </thead>
            <tbody className='bg-[#fff]'>
              {payments.map((payment) => (
                <tr
                  key={payment.sn}
                  className='border-t border-[#F1F1F1] hover:bg-gray-50'
                >
                  <td className='py-4 px-4 text-sm text-[#696969]'>
                    {payment.sn}
                  </td>
                  <td className='py-4 px-4 text-sm text-[#696969]'>
                    {payment.invoiceId}
                  </td>
                  <td className='py-4 px-4 text-sm text-[#696969]'>
                    {payment.description}
                  </td>
                  <td className='py-4 px-4 text-sm text-[#696969]'>
                    {formatAmount(payment.amount)}
                  </td>
                  <td className='py-4 px-4 text-sm text-[#696969]'>
                    {new Date(payment.date).toLocaleDateString()}
                  </td>
                  <td className='py-4 px-4 text-sm'>
                    <button className='text-[#3E8290] hover:underline'>
                      View Invoice
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

export default ConsultantPaymentTable;

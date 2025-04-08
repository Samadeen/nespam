'use client';

import { useState } from 'react';
import RevenueOverview from '@/components/admin/dashboard/revenue-overview';
import UserBase from '@/components/admin/dashboard/user-base';
import PermitApplications from '@/components/admin/dashboard/permit-applications';
import { Tab } from '@/components/admin/dashboard/shared/tab';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { Calendar } from 'lucide-react';
import { formatNaira } from '@/utils/format-currency';

interface TabProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const DateRangeFilter = ({
  onDateChange,
}: {
  onDateChange: (start: string, end: string) => void;
}) => (
  <div className='flex items-center gap-4 mb-6'>
    <div className='flex items-center gap-2'>
      <Calendar size={20} className='text-[#696969]' />
      <input
        type='date'
        onChange={(e) => onDateChange(e.target.value, '')}
        className='border rounded-lg px-3 py-2 text-sm'
      />
    </div>
    <span className='text-[#696969]'>to</span>
    <div className='flex items-center gap-2'>
      <Calendar size={20} className='text-[#696969]' />
      <input
        type='date'
        onChange={(e) => onDateChange('', e.target.value)}
        className='border rounded-lg px-3 py-2 text-sm'
      />
    </div>
  </div>
);

const StatCard = ({
  title,
  value,
  change,
}: {
  title: string;
  value: string;
  change: string;
}) => (
  <div className='bg-white rounded-lg p-6 shadow-sm'>
    <h3 className='text-[#696969] text-sm mb-2'>{title}</h3>
    <p className='text-2xl font-semibold text-[#2A454B] mb-2'>{value}</p>
    <p
      className={`text-sm ${
        change.startsWith('+') ? 'text-green-500' : 'text-red-500'
      }`}
    >
      {change} from last month
    </p>
  </div>
);

// Add a utility function for Naira formatting

const ReviewCard = ({
  title,
  value,
  change,
  color,
}: {
  title: string;
  value: number;
  change: number;
  color: string;
}) => (
  <div className={`rounded-lg p-6 shadow-sm ${color}`}>
    <h3 className='text-white text-sm mb-2'>{title}</h3>
    <p className='text-2xl font-semibold text-white mb-2'>
      {formatNaira(value)}
    </p>
    <p className={`text-sm ${change >= 0 ? 'text-green-300' : 'text-red-300'}`}>
      {change >= 0 ? '+' : ''}
      {change}% from last month
    </p>
  </div>
);

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('review');

  // Update review data to revenue data
  const revenueData = [
    { name: 'Jan', Environmental: 4000000, Air: 2400000, Water: 3000000 },
    { name: 'Feb', Environmental: 3000000, Air: 1300000, Water: 2200000 },
    { name: 'Mar', Environmental: 2000000, Air: 3800000, Water: 2500000 },
    { name: 'Apr', Environmental: 2700000, Air: 3900000, Water: 2800000 },
    { name: 'May', Environmental: 1800000, Air: 4800000, Water: 2100000 },
    { name: 'Jun', Environmental: 2300000, Air: 3800000, Water: 2500000 },
    { name: 'Jul', Environmental: 2300000, Air: 3800000, Water: 2500000 },
    { name: 'Aug', Environmental: 2300000, Air: 3800000, Water: 2500000 },
    { name: 'Sep', Environmental: 2300000, Air: 3800000, Water: 2500000 },
    { name: 'Oct', Environmental: 2300000, Air: 3800000, Water: 2500000 },
    { name: 'Nov', Environmental: 2300000, Air: 3800000, Water: 2500000 },
    { name: 'Dec', Environmental: 2300000, Air: 3800000, Water: 2500000 },
  ];

  const userBaseData = {
    consultants: 150,
    companies: 300,
    growth: [
      { name: 'Jan', users: 380 },
      { name: 'Feb', users: 420 },
      { name: 'Mar', users: 450 },
      { name: 'Apr', users: 470 },
      { name: 'May', users: 540 },
      { name: 'Jun', users: 580 },
    ],
  };

  const permitData = {
    stats: [
      {
        title: 'Approved Applications',
        value: 245,
        change: 15,
        color: 'bg-[#2A454B]',
      },
      {
        title: 'Pending Applications',
        value: 82,
        change: -5,
        color: 'bg-[#3E8290]',
      },
      {
        title: 'Rejected Applications',
        value: 36,
        change: 3,
        color: 'bg-[#FF8042]',
      },
    ],
    distribution: [
      { name: 'Approved', value: 245 },
      { name: 'Pending', value: 82 },
      { name: 'Rejected', value: 36 },
    ],
  };

  const COLORS = ['#2A454B', '#3E8290', '#FF8042'];

  const handleDateChange = (start: string, end: string) => {
    // Handle date filter changes
    console.log(start, end);
  };

  // Update review stats to revenue stats
  const revenueStats = [
    {
      title: 'Environmental Revenue',
      value: 15600000, // ₦15.6M
      change: 12,
      color: 'bg-[#2A454B]',
      key: 'Environmental',
    },
    {
      title: 'Air Quality Revenue',
      value: 8900000, // ₦8.9M
      change: -5,
      color: 'bg-[#3E8290]',
      key: 'Air',
    },
    {
      title: 'Water Quality Revenue',
      value: 12400000, // ₦12.4M
      change: 8,
      color: 'bg-[#82ca9d]',
      key: 'Water',
    },
  ];

  const userBaseStats = [
    {
      title: 'Total Consultants',
      value: userBaseData.consultants,
      change: 12,
      color: 'bg-[#2A454B]',
    },
    {
      title: 'Total Companies',
      value: userBaseData.companies,
      change: 8,
      color: 'bg-[#3E8290]',
    },
  ];

  const userDistributionData = [
    { name: 'Consultants', value: userBaseData.consultants },
    { name: 'Companies', value: userBaseData.companies },
  ];

  return (
    <div className='p-6'>
      <div className='mb-8 flex gap-4'>
        <Tab
          label='Revenue Overview'
          isActive={activeTab === 'review'}
          onClick={() => setActiveTab('review')}
        />
        <Tab
          label='User Base'
          isActive={activeTab === 'users'}
          onClick={() => setActiveTab('users')}
        />
        <Tab
          label='Permit Applications'
          isActive={activeTab === 'permits'}
          onClick={() => setActiveTab('permits')}
        />
      </div>

      {activeTab === 'review' && (
        <RevenueOverview
          revenueData={revenueData}
          revenueStats={revenueStats}
        />
      )}

      {activeTab === 'users' && (
        <UserBase
          userBaseStats={userBaseStats}
          userDistributionData={userDistributionData}
          userGrowthData={userBaseData.growth}
          onDateChange={handleDateChange}
        />
      )}

      {activeTab === 'permits' && (
        <PermitApplications permitData={permitData} />
      )}
    </div>
  );
}

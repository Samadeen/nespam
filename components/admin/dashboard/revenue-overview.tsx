'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { ReviewCard } from './shared/cards';
import { formatNaira } from '@/utils/format-currency';

interface RevenueOverviewProps {
  revenueData: any[];
  revenueStats: any[];
}

export default function RevenueOverview({
  revenueData,
  revenueStats,
}: RevenueOverviewProps) {
  return (
    <div>
      <h2 className='text-xl font-semibold mb-6'>Revenue Overview</h2>

      <div className='grid grid-cols-3 gap-6 mb-8'>
        {revenueStats.map((stat) => (
          <ReviewCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            color={stat.color}
          />
        ))}
      </div>

      <div className='bg-white p-6 rounded-lg shadow-sm'>
        <h3 className='text-lg font-medium text-[#2A454B] mb-4'>
          Monthly Revenue Trends
        </h3>
        <BarChart
          width={1100}
          height={400}
          data={revenueData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray='3 3' stroke='#f0f0f0' />
          <XAxis
            dataKey='name'
            tick={{ fill: '#696969' }}
            axisLine={{ stroke: '#e5e5e5' }}
          />
          <YAxis
            tick={{ fill: '#696969' }}
            axisLine={{ stroke: '#e5e5e5' }}
            tickFormatter={(value) => `₦${value / 1000000}M`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e5e5',
              borderRadius: '8px',
            }}
            formatter={(value: number) => [formatNaira(value), 'Revenue']}
          />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
          <Bar
            dataKey='Environmental'
            fill='#2A454B'
            radius={[4, 4, 0, 0]}
            name='Environmental Revenue'
          />
          <Bar
            dataKey='Air'
            fill='#3E8290'
            radius={[4, 4, 0, 0]}
            name='Air Quality Revenue'
          />
          <Bar
            dataKey='Water'
            fill='#82ca9d'
            radius={[4, 4, 0, 0]}
            name='Water Quality Revenue'
          />
        </BarChart>
      </div>
    </div>
  );
}

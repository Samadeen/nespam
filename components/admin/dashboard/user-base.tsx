'use client';

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { ReviewCard } from './shared/cards';
import { DateRangeFilter } from './shared/date-filter';

interface UserBaseProps {
  userBaseStats: any[];
  userDistributionData: any[];
  userGrowthData: any[];
  onDateChange: (start: string, end: string) => void;
}

export default function UserBase({
  userBaseStats,
  userDistributionData,
  userGrowthData,
  onDateChange,
}: UserBaseProps) {
  return (
    <div>
      <h2 className='text-xl font-semibold mb-6'>User Base Overview</h2>
      <DateRangeFilter onDateChange={onDateChange} />

      <div className='grid grid-cols-2 gap-6 mb-8'>
        {userBaseStats.map((stat) => (
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
          User Distribution
        </h3>
        <div className='flex items-center justify-center'>
          <PieChart width={500} height={400}>
            <Pie
              data={userDistributionData}
              cx={200}
              cy={200}
              labelLine={true}
              outerRadius={150}
              fill='#8884d8'
              dataKey='value'
              label={({ name, value, percent }) =>
                `${name}: ${value} (${(percent * 100).toFixed(0)}%)`
              }
            >
              {userDistributionData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index === 0 ? '#2A454B' : '#3E8290'}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => [`${value} Users`, 'Total']}
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e5e5',
                borderRadius: '8px',
              }}
            />
            <Legend
              formatter={(value) => value}
              wrapperStyle={{
                paddingTop: '20px',
              }}
            />
          </PieChart>
        </div>

        <div className='mt-8'>
          <h3 className='text-lg font-medium text-[#2A454B] mb-4'>
            Monthly User Growth
          </h3>
          <BarChart
            width={1100}
            height={300}
            data={userGrowthData}
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
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e5e5',
                borderRadius: '8px',
              }}
            />
            <Bar
              dataKey='users'
              fill='#2A454B'
              radius={[4, 4, 0, 0]}
              name='Total Users'
            />
          </BarChart>
        </div>
      </div>
    </div>
  );
}

'use client';

import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { ReviewCard } from './shared/cards';

interface PermitApplicationsProps {
  permitData: {
    distribution: any[];
    stats: {
      title: string;
      value: number;
      change: number;
      color: string;
    }[];
  };
}

export default function PermitApplications({
  permitData,
}: PermitApplicationsProps) {
  const COLORS = ['#2A454B', '#3E8290', '#FF8042'];

  return (
    <div>
      <h2 className='text-xl font-semibold mb-6'>
        Permit Applications Overview
      </h2>
      <div className='grid grid-cols-3 gap-6 mb-8'>
        {permitData.stats.map((stat) => (
          <ReviewCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            color={stat.color}
          />
        ))}
      </div>
      <div className='bg-white p-6 rounded-lg shadow-sm flex items-center justify-center'>
        <PieChart width={400} height={400}>
          <Pie
            data={permitData.distribution}
            cx={200}
            cy={200}
            labelLine={false}
            outerRadius={150}
            fill='#8884d8'
            dataKey='value'
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
          >
            {permitData.distribution.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
    </div>
  );
}

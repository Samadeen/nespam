import { Calendar } from 'lucide-react';

interface DateRangeFilterProps {
  onDateChange: (start: string, end: string) => void;
}

export const DateRangeFilter = ({ onDateChange }: DateRangeFilterProps) => (
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

interface ReviewCardProps {
  title: string;
  value: number;
  change: number;
  color: string;
}

export const ReviewCard = ({
  title,
  value,
  change,
  color,
}: ReviewCardProps) => (
  <div className={`rounded-lg p-6 shadow-sm ${color}`}>
    <h3 className='text-white text-sm mb-2'>{title}</h3>
    <p className='text-2xl font-semibold text-white mb-2'>
      {typeof value === 'number' ? value.toLocaleString() : value}
    </p>
    <p className={`text-sm ${change >= 0 ? 'text-green-300' : 'text-red-300'}`}>
      {change >= 0 ? '+' : ''}
      {change}% from last month
    </p>
  </div>
);

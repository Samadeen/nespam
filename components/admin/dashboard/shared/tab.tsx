interface TabProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export const Tab = ({ label, isActive, onClick }: TabProps) => (
  <button
    onClick={onClick}
    className={`px-6 py-3 text-sm font-medium rounded-lg transition-colors ${
      isActive ? 'bg-[#2A454B] text-white' : 'text-[#696969] hover:bg-gray-100'
    }`}
  >
    {label}
  </button>
);

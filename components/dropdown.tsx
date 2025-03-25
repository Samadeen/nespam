import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface DropdownProps {
  options: Option[];
  value?: string;
  onChange: (value: string) => void;
  placeholder: string;
  label: string;
  required?: boolean;
  className?: string;
  id: string;
  searchable?: boolean;
}

const Dropdown = ({
  options,
  value,
  onChange,
  placeholder,
  label,
  required,
  className = '',
  id,
  searchable = false,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredOptions = searchable
    ? options.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  const selectedOption = options.find((option) => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className='relative' ref={dropdownRef}>
      <label htmlFor={id} className='class-label'>
        {label} {required && <span className='text-[#FF0000]'>*</span>}
      </label>
      <div
        className={`class-input relative flex items-center justify-between cursor-pointer ${className}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className='flex-1 truncate'>
          {selectedOption ? (
            <p className='truncate'>{selectedOption.label}</p>
          ) : (
            <p className='truncate text-gray-400'>{placeholder}</p>
          )}
        </div>
        <ChevronDown
          size={20}
          className={`ml-2 absolute right-2 top-4 flex-shrink-0 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </div>

      {isOpen && (
        <div className='absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto'>
          {searchable && (
            <input
              type='text'
              className='w-full p-2 border-b border-gray-200 focus:outline-none'
              placeholder='Search...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          )}
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <div
                key={option.value}
                className={`p-2 hover:bg-gray-100 cursor-pointer ${
                  value === option.value ? 'bg-gray-50 text-[#3E8290]' : ''
                }`}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                  setSearchTerm('');
                }}
              >
                {option.label}
              </div>
            ))
          ) : (
            <div className='p-2 text-gray-500'>No options found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dropdown;

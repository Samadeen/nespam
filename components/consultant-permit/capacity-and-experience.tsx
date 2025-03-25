'use client';

import { useState } from 'react';
import { Plus, Trash2, ChevronUp, ChevronDown } from 'lucide-react';

interface StaffMember {
  id: string;
  number: string;
  qualifications: string;
  yearsOfExperience: string;
}

type SortDirection = 'asc' | 'desc' | null;
type SortField = 'number' | 'qualifications' | 'yearsOfExperience' | null;

interface CapacityAndExperienceProps {
  onProceed: () => void;
  onReturn: () => void;
}

const CapacityAndExperience = ({
  onProceed,
  onReturn,
}: CapacityAndExperienceProps) => {
  const [formData, setFormData] = useState({
    technicalCompetence: '',
    managerialCompetence: '',
    financialSupport: '',
    consultantDetails: '',
  });

  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([
    { id: '1', number: '', qualifications: '', yearsOfExperience: '' },
  ]);

  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStaffChange = (
    id: string,
    field: keyof StaffMember,
    value: string
  ) => {
    setStaffMembers((prev) =>
      prev.map((staff) =>
        staff.id === id ? { ...staff, [field]: value } : staff
      )
    );
  };

  const addStaffMember = () => {
    setStaffMembers((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        number: '',
        qualifications: '',
        yearsOfExperience: '',
      },
    ]);
  };

  const removeStaffMember = (id: string) => {
    setStaffMembers((prev) => prev.filter((staff) => staff.id !== id));
  };

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
    <div className='py-6 bg-white rounded-lg'>
      <h2 className='text-[#101828] text-lg font-medium mb-6'>
        Fill the form below related to Capacity and Experience
      </h2>

      <div className='space-y-6'>
        <div>
          <label className='class-label block text-[#344054] text-sm font-medium mb-1'>
            Provide detailed statement of applicant's technical competence and
            experience with regard to the permit applied for{' '}
            <span className='text-red-500'>*</span>
          </label>
          <input
            type='text'
            name='technicalCompetence'
            value={formData.technicalCompetence}
            onChange={handleInputChange}
            className='class-input w-full px-3.5 py-2.5 rounded-lg border border-[#D0D5DD] focus:outline-none focus:ring-2 focus:ring-[#3E8290]'
            placeholder='Enter details here'
          />
        </div>

        <div>
          <label className='class-label block text-[#344054] text-sm font-medium mb-1'>
            Provide detailed statement of applicant's managerial competence and
            experience with regard to the permit applied for{' '}
            <span className='text-red-500'>*</span>
          </label>
          <input
            type='text'
            name='managerialCompetence'
            value={formData.managerialCompetence}
            onChange={handleInputChange}
            className='class-input w-full px-3.5 py-2.5 rounded-lg border border-[#D0D5DD] focus:outline-none focus:ring-2 focus:ring-[#3E8290]'
            placeholder='Enter details here'
          />
        </div>

        <div>
          <label className='class-label block text-[#344054] text-sm font-medium mb-1'>
            Describe any technical or financial support from internal and
            external sources with regard to the permit applied for{' '}
            <span className='text-red-500'>*</span>
          </label>
          <input
            type='text'
            name='financialSupport'
            value={formData.financialSupport}
            onChange={handleInputChange}
            className='class-input w-full px-3.5 py-2.5 rounded-lg border border-[#D0D5DD] focus:outline-none focus:ring-2 focus:ring-[#3E8290]'
            placeholder='Enter details here'
          />
        </div>

        <div>
          <label className='class-label block text-[#344054] text-sm font-medium mb-1'>
            State the name and Nesrea ID of the agency's accredited
            consultant(s)/contractor(s) involved in pollution control programme
            in your organisation <span className='text-red-500'>*</span>
          </label>
          <input
            type='text'
            name='consultantDetails'
            value={formData.consultantDetails}
            onChange={handleInputChange}
            className='class-input w-full px-3.5 py-2.5 rounded-lg border border-[#D0D5DD] focus:outline-none focus:ring-2 focus:ring-[#3E8290]'
            placeholder='Enter details here'
          />
        </div>

        <div>
          <label className='class-label block text-[#344054] text-sm font-medium mb-1'>
            State the number, qualifications and experience of staff involved
            with pollution control programme at the facility{' '}
            <span className='text-red-500'>*</span>
          </label>

          <div className='border border-[#F1F1F1] rounded-lg overflow-hidden mt-3'>
            <table className='w-full'>
              <thead className='bg-[#F9FAFB]'>
                <tr>
                  <th
                    className='py-4 px-6 text-left text-sm text-[#696969] font-normal cursor-pointer hover:bg-[#F0F0F0]'
                    onClick={() => handleSort('number')}
                  >
                    <div className='flex items-center'>
                      Number
                      <SortIcon field='number' />
                    </div>
                  </th>
                  <th
                    className='py-3 px-4 text-left text-sm text-[#696969] font-normal cursor-pointer hover:bg-[#F0F0F0]'
                    onClick={() => handleSort('qualifications')}
                  >
                    <div className='flex items-center'>
                      Qualifications
                      <SortIcon field='qualifications' />
                    </div>
                  </th>
                  <th
                    className='py-3 px-4 text-left text-sm text-[#696969] font-normal cursor-pointer hover:bg-[#F0F0F0]'
                    onClick={() => handleSort('yearsOfExperience')}
                  >
                    <div className='flex items-center'>
                      Years of Experience
                      <SortIcon field='yearsOfExperience' />
                    </div>
                  </th>
                  <th className='py-3 px-4 text-left text-sm text-[#696969] font-normal w-8'>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {staffMembers.map((staff, index) => (
                  <tr key={staff.id} className='border-t border-[#F1F1F1]'>
                    <td className='p-3'>
                      <input
                        type='text'
                        value={staff.number}
                        onChange={(e) =>
                          handleStaffChange(staff.id, 'number', e.target.value)
                        }
                        className='class-input w-full px-3 py-1.5 rounded border border-[#f1f1f1]'
                        placeholder='Enter number'
                      />
                    </td>
                    <td className='p-3'>
                      <input
                        type='text'
                        value={staff.qualifications}
                        onChange={(e) =>
                          handleStaffChange(
                            staff.id,
                            'qualifications',
                            e.target.value
                          )
                        }
                        className='class-input w-full px-3 py-1.5 rounded border border-[#D0D5DD]'
                        placeholder='Enter qualifications'
                      />
                    </td>
                    <td className='p-3'>
                      <input
                        type='text'
                        value={staff.yearsOfExperience}
                        onChange={(e) =>
                          handleStaffChange(
                            staff.id,
                            'yearsOfExperience',
                            e.target.value
                          )
                        }
                        className='class-input w-full px-3 py-1.5 rounded border border-[#D0D5DD]'
                        placeholder='Years'
                      />
                    </td>
                    <td className='p-4'>
                      <button
                        onClick={() => removeStaffMember(staff.id)}
                        className='text-red-500 hover:text-red-700'
                        disabled={staffMembers.length === 1}
                      >
                        <Trash2 size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            onClick={addStaffMember}
            className='mt-4 flex items-center gap-2 text-[#3E8290] hover:text-[#357381]'
          >
            <Plus size={20} />
            Add Button
          </button>
        </div>

        <div className='flex justify-between mt-8'>
          <button
            onClick={onReturn}
            className='px-8 py-3 border border-[#3E8290] text-[#3E8290] rounded-lg hover:bg-gray-50'
          >
            Return
          </button>
          <button
            onClick={onProceed}
            className='px-8 py-3 bg-[#3E8290] text-white rounded-lg hover:bg-[#357381]'
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default CapacityAndExperience;

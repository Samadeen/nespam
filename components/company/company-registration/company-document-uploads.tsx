'use client';

import { useState } from 'react';
import { ArrowDownToLine, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface UploadField {
  id: string;
  label: string;
  required: boolean;
  file: File | null;
  isLoading: boolean;
}

interface CompanyDocumentUploadsProps {
  onProceed: () => void;
  onReturn: () => void;
}

const CompanyDocumentUploads = ({
  onProceed,
  onReturn,
}: CompanyDocumentUploadsProps) => {
  const [uploadFields, setUploadFields] = useState<UploadField[]>([
    {
      id: 'certificate',
      label: 'Certificate of Incorporation',
      required: true,
      file: null,
      isLoading: false,
    },
    {
      id: 'memorandum',
      label: 'Memorandum & Article of Association',
      required: true,
      file: null,
      isLoading: false,
    },
    {
      id: 'directors',
      label: 'Particulars of Directors',
      required: true,
      file: null,
      isLoading: false,
    },
    {
      id: 'competence',
      label: 'Evidence of Competence in Environmental Consultancy',
      required: true,
      file: null,
      isLoading: false,
    },
    {
      id: 'tax',
      label: 'Recent Tax Clearance Certificate',
      required: true,
      file: null,
      isLoading: false,
    },
  ]);

  const handleFileUpload = async (id: string, file: File) => {
    setUploadFields((fields) =>
      fields.map((field) =>
        field.id === id ? { ...field, isLoading: true } : field
      )
    );

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setUploadFields((fields) =>
        fields.map((field) =>
          field.id === id ? { ...field, file, isLoading: false } : field
        )
      );

      toast.success(`${file.name} uploaded successfully`);
    } catch (error) {
      setUploadFields((fields) =>
        fields.map((field) =>
          field.id === id ? { ...field, isLoading: false } : field
        )
      );
      toast.error(`Failed to upload ${file.name}`);
    }
  };

  return (
    <div className='space-y-6 p-6 bg-white rounded-lg'>
      <div className='flex items-center gap-2 mb-6'>
        <h2 className='text-[#101828] text-lg font-medium'>
          Upload the following documents to complete the process
        </h2>
        <span className='text-[#FF0000] text-sm'>
          (items marked * are mandatory)
        </span>
      </div>

      <div className='space-y-4'>
        {uploadFields.map((field) => (
          <div key={field.id}>
            <label className='block text-[#696969] mb-2'>
              {field.label}
              {field.required && <span className='text-[#FF0000]'>*</span>}
            </label>
            <div className='relative'>
              <input
                type='file'
                id={field.id}
                className='hidden'
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileUpload(field.id, file);
                }}
                accept='.pdf,.doc,.docx'
                disabled={field.isLoading}
              />
              <div
                className={`border border-dashed rounded-lg p-4 cursor-pointer hover:bg-gray-50
                  ${
                    field.file
                      ? 'border-[#3E8290] bg-[#F8FAFC]'
                      : 'border-gray-300'
                  }
                  ${field.isLoading ? 'cursor-not-allowed opacity-75' : ''}`}
                onClick={() =>
                  !field.isLoading && document.getElementById(field.id)?.click()
                }
              >
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    {field.isLoading ? (
                      <Loader2 className='w-5 h-5 text-[#3E8290] animate-spin' />
                    ) : (
                      <ArrowDownToLine
                        className={
                          field.file ? 'text-[#3E8290]' : 'text-gray-400'
                        }
                      />
                    )}
                    <span
                      className={
                        field.file ? 'text-[#3E8290]' : 'text-gray-400'
                      }
                    >
                      {field.isLoading
                        ? 'Uploading...'
                        : field.file
                        ? field.file.name
                        : 'Upload'}
                    </span>
                  </div>
                  {!field.file && !field.isLoading && (
                    <span className='text-sm text-gray-500'>
                      Click to upload or drag and drop
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
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
          disabled={uploadFields.some((field) => field.isLoading)}
        >
          Proceed
        </button>
      </div>
    </div>
  );
};

export default CompanyDocumentUploads;

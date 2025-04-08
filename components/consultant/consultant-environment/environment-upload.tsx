'use client';

import { useState, useEffect } from 'react';
import { ArrowDownToLine, Loader2, FileText, X } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface UploadField {
  id: string;
  file: File | null;
  isLoading: boolean;
}

interface EnvironmentUploadProps {
  onProceed?: () => void;
  onReturn?: () => void;
}

const EnvironmentUpload = ({ onProceed, onReturn }: EnvironmentUploadProps) => {
  const [uploadField, setUploadField] = useState<UploadField>({
    id: 'environmentalReport',
    file: null,
    isLoading: false,
  });

  const handleFileUpload = async (file: File) => {
    // Check file size (3MB limit)
    const maxSize = 3 * 1024 * 1024; // 3MB in bytes
    if (file.size > maxSize) {
      toast.error('File size must not be more than 3MB');
      return;
    }

    // Check file type
    if (!file.type.includes('pdf')) {
      toast.error('Only PDF files are allowed');
      return;
    }

    setUploadField((prev) => ({ ...prev, isLoading: true }));

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate upload

      setUploadField((prev) => ({
        ...prev,
        file,
        isLoading: false,
      }));

      toast.success(`${file.name} uploaded successfully`);
    } catch (error) {
      setUploadField((prev) => ({ ...prev, isLoading: false }));
      toast.error(`Failed to upload ${file.name}`);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  };

  return (
    <div className='p-6 bg-white rounded-lg'>
      <h2 className='text-[#101828] text-lg font-medium mb-4'>
        Upload the following documents to complete the process
      </h2>

      <div className='space-y-4'>
        <div>
          <p className='text-[#696969] text-sm mb-1'>
            Mandatory documents: Environmental Audit Report (EAR)
            <span className='text-red-500'>*</span>
          </p>
          <p className='text-[#696969] text-xs mb-4'>
            File format: PDF files only
          </p>

          <div className='relative'>
            <input
              type='file'
              id={uploadField.id}
              className='hidden'
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileUpload(file);
              }}
              accept='.pdf'
              disabled={uploadField.isLoading}
            />
            <div
              className={`border-2 border-dashed rounded-lg py-28 cursor-pointer hover:bg-gray-50
                ${
                  uploadField.file
                    ? 'border-[#3E8290] bg-[#F8FAFC]'
                    : 'border-gray-300'
                }
                ${
                  uploadField.isLoading ? 'cursor-not-allowed opacity-75' : ''
                }`}
              onClick={() =>
                !uploadField.isLoading &&
                document.getElementById(uploadField.id)?.click()
              }
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <div className='flex flex-col items-center justify-center gap-2'>
                {uploadField.isLoading ? (
                  <Loader2 className='w-6 h-6 text-[#3E8290] animate-spin' />
                ) : uploadField.file ? (
                  <FileText className='w-6 h-6 text-[#3E8290]' />
                ) : (
                  <ArrowDownToLine className='w-6 h-6 text-gray-400' />
                )}
                <span
                  className={`text-sm ${
                    uploadField.file ? 'text-[#3E8290]' : 'text-gray-500'
                  }`}
                >
                  {uploadField.isLoading
                    ? 'Uploading...'
                    : uploadField.file
                    ? uploadField.file.name
                    : 'Click to upload or drag and drop'}
                </span>
              </div>
            </div>
          </div>

          <p className='text-red-500 text-xs mt-2'>
            PDF file size must not be more than 3MB
          </p>
        </div>

        <div className='flex justify-between mt-8'>
          {onReturn && (
            <button
              onClick={onReturn}
              className='px-8 py-3 border border-[#3E8290] text-[#3E8290] rounded-lg hover:bg-gray-50'
            >
              Return
            </button>
          )}
          <button
            onClick={onProceed}
            disabled={!uploadField.file || uploadField.isLoading}
            className='px-8 py-3 bg-[#3E8290] text-white rounded-lg hover:bg-[#357381] disabled:opacity-50 disabled:cursor-not-allowed ml-auto'
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnvironmentUpload;

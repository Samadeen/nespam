'use client';

import { useState, useEffect } from 'react';
import { ArrowDownToLine, Loader2, FileText, X } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface FormData {
  burningLocation: string;
  burningDays: string;
  itemDescription: string;
  pollutionAbatement: string;
}

interface UploadField {
  id: string;
  file: File | null;
  isLoading: boolean;
  previewUrl: string | null;
}

interface OpenBurningProps {
  onProceed: () => void;
  onReturn: () => void;
}

const OpenBurning = ({ onProceed, onReturn }: OpenBurningProps) => {
  const [formData, setFormData] = useState<FormData>({
    burningLocation: '',
    burningDays: '',
    itemDescription: '',
    pollutionAbatement: '',
  });

  const [uploads, setUploads] = useState<{
    [key: string]: UploadField;
  }>({
    environmentalImpact: {
      id: 'environmentalImpact',
      file: null,
      isLoading: false,
      previewUrl: null,
    },
    inspectionPoints: {
      id: 'inspectionPoints',
      file: null,
      isLoading: false,
      previewUrl: null,
    },
  });

  useEffect(() => {
    // Cleanup object URLs on unmount
    return () => {
      Object.values(uploads).forEach((upload) => {
        if (upload.previewUrl) {
          URL.revokeObjectURL(upload.previewUrl);
        }
      });
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = async (fieldId: string, file: File) => {
    setUploads((prev) => ({
      ...prev,
      [fieldId]: { ...prev[fieldId], isLoading: true },
    }));

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const previewUrl = file.type.startsWith('image/')
        ? URL.createObjectURL(file)
        : null;

      setUploads((prev) => ({
        ...prev,
        [fieldId]: {
          ...prev[fieldId],
          file,
          isLoading: false,
          previewUrl,
        },
      }));

      toast.success(`${file.name} uploaded successfully`);
    } catch (error) {
      setUploads((prev) => ({
        ...prev,
        [fieldId]: { ...prev[fieldId], isLoading: false },
      }));
      toast.error(`Failed to upload ${file.name}`);
    }
  };

  return (
    <div className='py-6 bg-white rounded-lg'>
      <h2 className='text-[#101828] text-lg font-medium mb-6'>
        Fill the form below related to Open Burning
      </h2>

      <div className='space-y-6'>
        <div>
          <label className='class-label block text-[#344054] text-sm font-medium mb-1'>
            What location is the burning taking place?{' '}
            <span className='text-red-500'>*</span>
          </label>
          <input
            type='text'
            name='burningLocation'
            value={formData.burningLocation}
            onChange={handleInputChange}
            className='class-input w-full px-3.5 py-2.5 rounded-lg border border-[#D0D5DD] focus:outline-none focus:ring-2 focus:ring-[#3E8290]'
            placeholder='Enter location'
          />
        </div>

        <div>
          <label className='class-label block text-[#344054] text-sm font-medium mb-1'>
            Upon the following days, viz.{' '}
            <span className='text-red-500'>*</span>
          </label>
          <input
            type='text'
            name='burningDays'
            value={formData.burningDays}
            onChange={handleInputChange}
            className='class-input w-full px-3.5 py-2.5 rounded-lg border border-[#D0D5DD] focus:outline-none focus:ring-2 focus:ring-[#3E8290]'
            placeholder='Enter days'
          />
        </div>

        <div>
          <label className='class-label block text-[#344054] text-sm font-medium mb-1'>
            Type/Description of item(s) to be Burned{' '}
            <span className='text-red-500'>*</span>
          </label>
          <input
            type='text'
            name='itemDescription'
            value={formData.itemDescription}
            onChange={handleInputChange}
            className='class-input w-full px-3.5 py-2.5 rounded-lg border border-[#D0D5DD] focus:outline-none focus:ring-2 focus:ring-[#3E8290]'
            placeholder='Enter description'
          />
        </div>

        <div>
          <label className='class-label block text-[#344054] text-sm font-medium mb-1'>
            Describe pollution abatement/monitoring facilities on site
            (including details of year of installation, capacity, etc){' '}
            <span className='text-red-500'>*</span>
          </label>
          <input
            type='text'
            name='pollutionAbatement'
            value={formData.pollutionAbatement}
            onChange={handleInputChange}
            className='class-input w-full px-3.5 py-2.5 rounded-lg border border-[#D0D5DD] focus:outline-none focus:ring-2 focus:ring-[#3E8290]'
            placeholder='Enter details'
          />
        </div>

        {/* Environmental Impact Statement Upload */}
        <div>
          <label className='class-label block text-[#344054] text-sm font-medium mb-1'>
            Environmental Impact Statement{' '}
            <span className='text-red-500'>*</span>
          </label>
          <div className='relative'>
            <input
              type='file'
              id='environmentalImpact'
              className='hidden'
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileUpload('environmentalImpact', file);
              }}
              accept='.jpg,.jpeg,.png,.gif'
              disabled={uploads.environmentalImpact.isLoading}
            />
            <div
              className={`border border-dashed rounded-lg p-4 cursor-pointer hover:bg-gray-50
                ${
                  uploads.environmentalImpact.file
                    ? 'border-[#3E8290] bg-[#F8FAFC]'
                    : 'border-gray-300'
                }
                ${
                  uploads.environmentalImpact.isLoading
                    ? 'cursor-not-allowed opacity-75'
                    : ''
                }`}
              onClick={() =>
                !uploads.environmentalImpact.isLoading &&
                document.getElementById('environmentalImpact')?.click()
              }
            >
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  {uploads.environmentalImpact.isLoading ? (
                    <Loader2 className='w-5 h-5 text-[#3E8290] animate-spin' />
                  ) : (
                    <ArrowDownToLine
                      className={
                        uploads.environmentalImpact.file
                          ? 'text-[#3E8290]'
                          : 'text-gray-400'
                      }
                    />
                  )}
                  <span
                    className={
                      uploads.environmentalImpact.file
                        ? 'text-[#3E8290]'
                        : 'text-gray-400'
                    }
                  >
                    {uploads.environmentalImpact.isLoading
                      ? 'Uploading...'
                      : uploads.environmentalImpact.file
                      ? uploads.environmentalImpact.file.name
                      : 'Upload Environmental Impact Statement'}
                  </span>
                </div>
                {!uploads.environmentalImpact.file &&
                  !uploads.environmentalImpact.isLoading && (
                    <span className='text-sm text-gray-500'>
                      Click to upload or drag and drop
                    </span>
                  )}
              </div>
              {uploads.environmentalImpact.previewUrl && (
                <div className='mt-4'>
                  <img
                    src={uploads.environmentalImpact.previewUrl}
                    alt='Environmental Impact preview'
                    className='max-h-40 rounded-md object-contain mx-auto'
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Inspection Points Upload */}
        <div>
          <label className='class-label block text-[#344054] text-sm font-medium mb-1'>
            Inspection Points/Illustration{' '}
            <span className='text-red-500'>*</span>
          </label>
          <div className='relative'>
            <input
              type='file'
              id='inspectionPoints'
              className='hidden'
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileUpload('inspectionPoints', file);
              }}
              accept='.jpg,.jpeg,.png,.gif'
              disabled={uploads.inspectionPoints.isLoading}
            />
            <div
              className={`border border-dashed rounded-lg p-4 cursor-pointer hover:bg-gray-50
                ${
                  uploads.inspectionPoints.file
                    ? 'border-[#3E8290] bg-[#F8FAFC]'
                    : 'border-gray-300'
                }
                ${
                  uploads.inspectionPoints.isLoading
                    ? 'cursor-not-allowed opacity-75'
                    : ''
                }`}
              onClick={() =>
                !uploads.inspectionPoints.isLoading &&
                document.getElementById('inspectionPoints')?.click()
              }
            >
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  {uploads.inspectionPoints.isLoading ? (
                    <Loader2 className='w-5 h-5 text-[#3E8290] animate-spin' />
                  ) : (
                    <ArrowDownToLine
                      className={
                        uploads.inspectionPoints.file
                          ? 'text-[#3E8290]'
                          : 'text-gray-400'
                      }
                    />
                  )}
                  <span
                    className={
                      uploads.inspectionPoints.file
                        ? 'text-[#3E8290]'
                        : 'text-gray-400'
                    }
                  >
                    {uploads.inspectionPoints.isLoading
                      ? 'Uploading...'
                      : uploads.inspectionPoints.file
                      ? uploads.inspectionPoints.file.name
                      : 'Upload Inspection Points/Illustration'}
                  </span>
                </div>
                {!uploads.inspectionPoints.file &&
                  !uploads.inspectionPoints.isLoading && (
                    <span className='text-sm text-gray-500'>
                      Click to upload or drag and drop
                    </span>
                  )}
              </div>
              {uploads.inspectionPoints.previewUrl && (
                <div className='mt-4'>
                  <img
                    src={uploads.inspectionPoints.previewUrl}
                    alt='Inspection Points preview'
                    className='max-h-40 rounded-md object-contain mx-auto'
                  />
                </div>
              )}
            </div>
          </div>
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
            disabled={
              uploads.environmentalImpact.isLoading ||
              uploads.inspectionPoints.isLoading
            }
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default OpenBurning;

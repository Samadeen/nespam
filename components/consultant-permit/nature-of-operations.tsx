'use client';

import { useState, useEffect } from 'react';
import { ArrowDownToLine, Loader2, FileText, X } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface FormData {
  plantDescription: string;
  samplingResults: string;
  toxicSubstances: string;
  pollutionAbatement: string;
  chemicals: string;
  products: string;
  facilityLocation: string;
  effluentCharacteristics: string;
  stackCharacteristics: string;
  wasteDisposal: string;
  safetyPlans: string;
  additionalInformation: string;
}

interface UploadField {
  id: string;
  file: File | null;
  isLoading: boolean;
  previewUrl: string | null;
}

interface NatureOfOperationsProps {
  onProceed: () => void;
  onReturn: () => void;
}

const NatureOfOperations = ({ onProceed, onReturn }: NatureOfOperationsProps) => {
  const [formData, setFormData] = useState<FormData>({
    plantDescription: '',
    samplingResults: '',
    toxicSubstances: '',
    pollutionAbatement: '',
    chemicals: '',
    products: '',
    facilityLocation: '',
    effluentCharacteristics: '',
    stackCharacteristics: '',
    wasteDisposal: '',
    safetyPlans: '',
    additionalInformation: '',
  });

  const [uploads, setUploads] = useState<{
    [key: string]: UploadField;
  }>({
    facilityMap: {
      id: 'facilityMap',
      file: null,
      isLoading: false,
      previewUrl: null,
    },
    effluentIllustration: {
      id: 'effluentIllustration',
      file: null,
      isLoading: false,
      previewUrl: null,
    },
  });

  const [additionalUpload, setAdditionalUpload] = useState<UploadField>({
    id: 'additionalDocs',
    file: null,
    isLoading: false,
    previewUrl: null,
  });

  useEffect(() => {
    return () => {
      Object.values(uploads).forEach((upload) => {
        if (upload.previewUrl) {
          URL.revokeObjectURL(upload.previewUrl);
        }
      });
      if (additionalUpload.previewUrl) {
        URL.revokeObjectURL(additionalUpload.previewUrl);
      }
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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

  const handleAdditionalFileUpload = async (file: File) => {
    setAdditionalUpload((prev) => ({ ...prev, isLoading: true }));

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const previewUrl = file.type.startsWith('image/')
        ? URL.createObjectURL(file)
        : null;

      setAdditionalUpload((prev) => ({
        ...prev,
        file,
        isLoading: false,
        previewUrl,
      }));

      toast.success(`${file.name} uploaded successfully`);
    } catch (error) {
      setAdditionalUpload((prev) => ({ ...prev, isLoading: false }));
      toast.error(`Failed to upload ${file.name}`);
    }
  };

  return (
    <div className='py-6 bg-white rounded-lg'>
      <h2 className='text-[#101828] text-lg font-medium mb-6'>
        Fill the form below related to Nature of Operations
      </h2>

      <div className='space-y-6'>
        <div>
          <label className='class-label block text-[#344054] text-sm font-medium mb-1'>
            Describe plant facility and production figures (please attach
            schematic drawings, layout of factory and process line where
            applicable) <span className='text-red-500'>*</span>
          </label>
          <textarea
            name='plantDescription'
            value={formData.plantDescription}
            onChange={handleInputChange}
            className='class-input w-full px-3.5 py-2.5 rounded-lg border border-[#D0D5DD] focus:outline-none focus:ring-2 focus:ring-[#3E8290] min-h-[100px]'
            placeholder='Enter description here'
          />
        </div>

        <div>
          <label className='class-label block text-[#344054] text-sm font-medium mb-1'>
            State results of quantitative and qualitative sampling (of solid,
            liquid and gaseous effluents from the facility for at least the past
            one year where applicable and if available){' '}
            <span className='text-red-500'>*</span>
          </label>
          <textarea
            name='samplingResults'
            value={formData.samplingResults}
            onChange={handleInputChange}
            className='class-input w-full px-3.5 py-2.5 rounded-lg border border-[#D0D5DD] focus:outline-none focus:ring-2 focus:ring-[#3E8290] min-h-[100px]'
            placeholder='Enter sampling results'
          />
        </div>

        <div>
          <label className='class-label block text-[#344054] text-sm font-medium mb-1'>
            List all the toxic substances used, stored or manufactured at the
            site <span className='text-red-500'>*</span>
          </label>
          <textarea
            name='toxicSubstances'
            value={formData.toxicSubstances}
            onChange={handleInputChange}
            className='class-input w-full px-3.5 py-2.5 rounded-lg border border-[#D0D5DD] focus:outline-none focus:ring-2 focus:ring-[#3E8290] min-h-[100px]'
            placeholder='List toxic substances'
          />
        </div>

        <div>
          <label className='class-label block text-[#344054] text-sm font-medium mb-1'>
            Describe pollution abatement/monitoring facilities on site
            (including details of year of installation, capacity, etc){' '}
            <span className='text-red-500'>*</span>
          </label>
          <textarea
            name='pollutionAbatement'
            value={formData.pollutionAbatement}
            onChange={handleInputChange}
            className='class-input w-full px-3.5 py-2.5 rounded-lg border border-[#D0D5DD] focus:outline-none focus:ring-2 focus:ring-[#3E8290] min-h-[100px]'
            placeholder='Describe facilities'
          />
        </div>

        <div>
          <label className='class-label block text-[#344054] text-sm font-medium mb-1'>
            List all chemicals stored and/or in use at the facility (no trade
            names) <span className='text-red-500'>*</span>
          </label>
          <textarea
            name='chemicals'
            value={formData.chemicals}
            onChange={handleInputChange}
            className='class-input w-full px-3.5 py-2.5 rounded-lg border border-[#D0D5DD] focus:outline-none focus:ring-2 focus:ring-[#3E8290] min-h-[100px]'
            placeholder='List chemicals'
          />
        </div>

        <div>
          <label className='class-label block text-[#344054] text-sm font-medium mb-1'>
            List all intermediates and final products at facility (including
            details of storage condition(s) where applicable){' '}
            <span className='text-red-500'>*</span>
          </label>
          <textarea
            name='products'
            value={formData.products}
            onChange={handleInputChange}
            className='class-input w-full px-3.5 py-2.5 rounded-lg border border-[#D0D5DD] focus:outline-none focus:ring-2 focus:ring-[#3E8290] min-h-[100px]'
            placeholder='List products'
          />
        </div>

        <div>
          <label className='class-label block text-[#344054] text-sm font-medium mb-1'>
            State the distance and specific location of facility{' '}
            <span className='text-red-500'>*</span>
          </label>
          <textarea
            name='facilityLocation'
            value={formData.facilityLocation}
            onChange={handleInputChange}
            className='class-input w-full px-3.5 py-2.5 rounded-lg border border-[#D0D5DD] focus:outline-none focus:ring-2 focus:ring-[#3E8290] min-h-[100px] mb-2'
            placeholder='Describe location'
          />

          <div className='mt-2'>
            <span className='text-sm text-gray-500 mb-2 block'>
              Attach sketch map showing distance from residential areas,
              ecosystems, and other industries
            </span>
            <div className='relative'>
              <input
                type='file'
                id='facilityMap'
                className='hidden'
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileUpload('facilityMap', file);
                }}
                accept='.jpg,.jpeg,.png,.gif'
                disabled={uploads.facilityMap.isLoading}
              />
              <div
                className={`border border-dashed rounded-lg p-4 cursor-pointer hover:bg-gray-50
                  ${
                    uploads.facilityMap.file
                      ? 'border-[#3E8290] bg-[#F8FAFC]'
                      : 'border-gray-300'
                  }
                  ${
                    uploads.facilityMap.isLoading
                      ? 'cursor-not-allowed opacity-75'
                      : ''
                  }`}
                onClick={() =>
                  !uploads.facilityMap.isLoading &&
                  document.getElementById('facilityMap')?.click()
                }
              >
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    {uploads.facilityMap.isLoading ? (
                      <Loader2 className='w-5 h-5 text-[#3E8290] animate-spin' />
                    ) : (
                      <ArrowDownToLine
                        className={
                          uploads.facilityMap.file
                            ? 'text-[#3E8290]'
                            : 'text-gray-400'
                        }
                      />
                    )}
                    <span
                      className={
                        uploads.facilityMap.file
                          ? 'text-[#3E8290]'
                          : 'text-gray-400'
                      }
                    >
                      {uploads.facilityMap.isLoading
                        ? 'Uploading...'
                        : uploads.facilityMap.file
                        ? uploads.facilityMap.file.name
                        : 'Upload sketch map'}
                    </span>
                  </div>
                  {!uploads.facilityMap.file &&
                    !uploads.facilityMap.isLoading && (
                      <span className='text-sm text-gray-500'>
                        Click to upload or drag and drop
                      </span>
                    )}
                </div>
                {uploads.facilityMap.previewUrl && (
                  <div className='mt-4'>
                    <img
                      src={uploads.facilityMap.previewUrl}
                      alt='Facility map preview'
                      className='max-h-40 rounded-md object-contain mx-auto'
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div>
          <label className='class-label block text-[#344054] text-sm font-medium mb-1'>
            State effluent characteristics, discharge locations{' '}
            <span className='text-red-500'>*</span>
          </label>
          <textarea
            name='effluentCharacteristics'
            value={formData.effluentCharacteristics}
            onChange={handleInputChange}
            className='class-input w-full px-3.5 py-2.5 rounded-lg border border-[#D0D5DD] focus:outline-none focus:ring-2 focus:ring-[#3E8290] min-h-[100px] mb-2'
            placeholder='Describe effluent characteristics'
          />

          <div className='mt-2'>
            <span className='text-sm text-gray-500 mb-2 block'>
              Attach illustration showing outfall locations and monitoring
              points
            </span>
            <div className='relative'>
              <input
                type='file'
                id='effluentIllustration'
                className='hidden'
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileUpload('effluentIllustration', file);
                }}
                accept='.jpg,.jpeg,.png,.gif'
                disabled={uploads.effluentIllustration.isLoading}
              />
              <div
                className={`border border-dashed rounded-lg p-4 cursor-pointer hover:bg-gray-50
                  ${
                    uploads.effluentIllustration.file
                      ? 'border-[#3E8290] bg-[#F8FAFC]'
                      : 'border-gray-300'
                  }
                  ${
                    uploads.effluentIllustration.isLoading
                      ? 'cursor-not-allowed opacity-75'
                      : ''
                  }`}
                onClick={() =>
                  !uploads.effluentIllustration.isLoading &&
                  document.getElementById('effluentIllustration')?.click()
                }
              >
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    {uploads.effluentIllustration.isLoading ? (
                      <Loader2 className='w-5 h-5 text-[#3E8290] animate-spin' />
                    ) : (
                      <ArrowDownToLine
                        className={
                          uploads.effluentIllustration.file
                            ? 'text-[#3E8290]'
                            : 'text-gray-400'
                        }
                      />
                    )}
                    <span
                      className={
                        uploads.effluentIllustration.file
                          ? 'text-[#3E8290]'
                          : 'text-gray-400'
                      }
                    >
                      {uploads.effluentIllustration.isLoading
                        ? 'Uploading...'
                        : uploads.effluentIllustration.file
                        ? uploads.effluentIllustration.file.name
                        : 'Upload illustration'}
                    </span>
                  </div>
                  {!uploads.effluentIllustration.file &&
                    !uploads.effluentIllustration.isLoading && (
                      <span className='text-sm text-gray-500'>
                        Click to upload or drag and drop
                      </span>
                    )}
                </div>
                {uploads.effluentIllustration.previewUrl && (
                  <div className='mt-4'>
                    <img
                      src={uploads.effluentIllustration.previewUrl}
                      alt='Effluent illustration preview'
                      className='max-h-40 rounded-md object-contain mx-auto'
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div>
          <label className='class-label block text-[#344054] text-sm font-medium mb-1'>
            State stack height(s) and characteristics of all gaseous emission(s)
            and locations where applicable{' '}
            <span className='text-red-500'>*</span>
          </label>
          <textarea
            name='stackCharacteristics'
            value={formData.stackCharacteristics}
            onChange={handleInputChange}
            className='class-input w-full px-3.5 py-2.5 rounded-lg border border-[#D0D5DD] focus:outline-none focus:ring-2 focus:ring-[#3E8290] min-h-[100px]'
            placeholder='Describe stack characteristics'
          />
        </div>

        <div>
          <label className='class-label block text-[#344054] text-sm font-medium mb-1'>
            Describe in detail the waste disposal methods available at the
            facility <span className='text-red-500'>*</span>
          </label>
          <textarea
            name='wasteDisposal'
            value={formData.wasteDisposal}
            onChange={handleInputChange}
            className='class-input w-full px-3.5 py-2.5 rounded-lg border border-[#D0D5DD] focus:outline-none focus:ring-2 focus:ring-[#3E8290] min-h-[100px]'
            placeholder='Describe waste disposal methods'
          />
        </div>

        <div>
          <label className='class-label block text-[#344054] text-sm font-medium mb-1'>
            State any safety/contingency plan(s) that is operational at the
            facility (attach details) <span className='text-red-500'>*</span>
          </label>
          <textarea
            name='safetyPlans'
            value={formData.safetyPlans}
            onChange={handleInputChange}
            className='class-input w-full px-3.5 py-2.5 rounded-lg border border-[#D0D5DD] focus:outline-none focus:ring-2 focus:ring-[#3E8290] min-h-[100px]'
            placeholder='Describe safety plans'
          />
        </div>

        <div>
          <label className='class-label block text-[#344054] text-sm font-medium mb-1'>
            Provide any other relevant information that could support and
            facilitate the processing of your application{' '}
            <span className='text-red-500'>*</span>
          </label>
          <textarea
            name='additionalInformation'
            value={formData.additionalInformation}
            onChange={handleInputChange}
            className='class-input w-full px-3.5 py-2.5 rounded-lg border border-[#D0D5DD] focus:outline-none focus:ring-2 focus:ring-[#3E8290] min-h-[100px] mb-2'
            placeholder='Enter additional information'
          />

          <div className='mt-2'>
            <span className='text-sm text-gray-500 mb-2 block'>
              Attach supporting documents or images if necessary
            </span>
            <div className='relative'>
              <input
                type='file'
                id={additionalUpload.id}
                className='hidden'
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleAdditionalFileUpload(file);
                }}
                accept='.pdf,.doc,.docx,.jpg,.jpeg,.png,.gif'
                disabled={additionalUpload.isLoading}
              />
              <div
                className={`border border-dashed rounded-lg p-4 cursor-pointer hover:bg-gray-50
                  ${
                    additionalUpload.file
                      ? 'border-[#3E8290] bg-[#F8FAFC]'
                      : 'border-gray-300'
                  }
                  ${
                    additionalUpload.isLoading
                      ? 'cursor-not-allowed opacity-75'
                      : ''
                  }`}
                onClick={() =>
                  !additionalUpload.isLoading &&
                  document.getElementById(additionalUpload.id)?.click()
                }
              >
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    {additionalUpload.isLoading ? (
                      <Loader2 className='w-5 h-5 text-[#3E8290] animate-spin' />
                    ) : additionalUpload.file ? (
                      additionalUpload.previewUrl ? (
                        <img
                          src={additionalUpload.previewUrl}
                          alt='Preview'
                          className='w-5 h-5 object-cover rounded'
                        />
                      ) : (
                        <FileText className='w-5 h-5 text-[#3E8290]' />
                      )
                    ) : (
                      <ArrowDownToLine className='text-gray-400' />
                    )}
                    <span
                      className={
                        additionalUpload.file
                          ? 'text-[#3E8290]'
                          : 'text-gray-400'
                      }
                    >
                      {additionalUpload.isLoading
                        ? 'Uploading...'
                        : additionalUpload.file
                        ? additionalUpload.file.name
                        : 'Upload supporting documents'}
                    </span>
                  </div>
                  {additionalUpload.file && !additionalUpload.isLoading ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (additionalUpload.previewUrl) {
                          URL.revokeObjectURL(additionalUpload.previewUrl);
                        }
                        setAdditionalUpload({
                          ...additionalUpload,
                          file: null,
                          previewUrl: null,
                        });
                      }}
                      className='p-1 hover:bg-gray-100 rounded-full'
                    >
                      <X className='w-4 h-4 text-gray-500' />
                    </button>
                  ) : !additionalUpload.file && !additionalUpload.isLoading ? (
                    <span className='text-sm text-gray-500'>
                      Click to upload or drag and drop
                    </span>
                  ) : null}
                </div>

                {additionalUpload.previewUrl && (
                  <div className='mt-4'>
                    <img
                      src={additionalUpload.previewUrl}
                      alt='Document preview'
                      className='max-h-40 rounded-md object-contain mx-auto'
                    />
                  </div>
                )}
              </div>
            </div>
            <div className='mt-2 text-xs text-gray-500'>
              Supported formats: PDF, DOC, DOCX, JPG, PNG, GIF
            </div>
          </div>
        </div>

        <div className='flex justify-between mt-8'>
          <button
            className='px-8 py-3 border border-[#3E8290] text-[#3E8290] rounded-lg hover:bg-gray-50'
            disabled={Object.values(uploads).some((upload) => upload.isLoading)}
            onClick={onReturn}
          >
            Return
          </button>
          <button
            className='px-8 py-3 bg-[#3E8290] text-white rounded-lg hover:bg-[#357381]'
            disabled={Object.values(uploads).some((upload) => upload.isLoading)}
            onClick={onProceed}
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default NatureOfOperations;

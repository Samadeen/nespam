'use client';

import { useState, Suspense } from 'react';
import AuthLayout from '@/components/auth-layout';
import Button from '@/components/button';
import logo from '@/public/assets/logo.svg';
import Image from 'next/image';
import { useAuth } from '@/context/auth-context';
import { toast } from 'react-hot-toast';
import { useSearchParams } from 'next/navigation';

interface ResetPasswordForm {
  password: string;
  confirm_password: string;
}

// Create a separate component for the form content
const ResetPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<ResetPasswordForm>({
    password: '',
    confirm_password: '',
  });
  const { resetPassword } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      toast.error('Invalid reset token');
      return;
    }

    if (formData.password !== formData.confirm_password) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }

    setIsLoading(true);

    try {
      await resetPassword({
        token,
        password: formData.password,
        confirm_password: formData.confirm_password,
      });
      toast.success('Password reset successful');
    } catch (error) {
      toast.error('Failed to reset password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-3 mt-4 w-full'>
      <label htmlFor='password' className='class-label'>
        New Password <span className='text-red-500'>*</span>
        <input
          type='password'
          name='password'
          id='password'
          className='class-input mt-1'
          value={formData.password}
          onChange={handleChange}
          required
          minLength={8}
        />
      </label>

      <label htmlFor='confirm_password' className='class-label'>
        Re-enter Password <span className='text-red-500'>*</span>
        <input
          type='password'
          name='confirm_password'
          id='confirm_password'
          className='class-input mt-1'
          value={formData.confirm_password}
          onChange={handleChange}
          required
          minLength={8}
        />
      </label>
      <Button className='w-full mt-2' text='Save' disabled={isLoading} />
    </form>
  );
};

// Loading fallback component
const LoadingFallback = () => (
  <div className='flex justify-center items-center p-4'>
    <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-[#3E8290]'></div>
  </div>
);

// Main component
const ResetPassword = () => {
  return (
    <AuthLayout>
      <div className='border border-neutral-300 bg-white rounded-[1.25rem] border-solid w-[33.75rem] mx-auto py-12 px-[4.5rem]'>
        <div className='flex flex-col items-center justify-center'>
          <Image src={logo} alt='logo' />
          <h1 className='text-[#101828] text-2xl not-italic font-semibold leading-[normal] mb-6 mt-4'>
            Reset Password
          </h1>

          <Suspense fallback={<LoadingFallback />}>
            <ResetPasswordForm />
          </Suspense>
        </div>
      </div>
    </AuthLayout>
  );
};

export default ResetPassword;

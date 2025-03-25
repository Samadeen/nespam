'use client';

import { useState } from 'react';
import AuthLayout from '@/components/auth-layout';
import Button from '@/components/button';
import logo from '@/public/assets/logo.svg';
import Image from 'next/image';
import { useAuth } from '@/context/auth-context';
import { toast } from 'react-hot-toast';
import Link from 'next/link';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { forgotPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await forgotPassword(email);
      toast.success('Reset link sent to your email');
    } catch (error) {
      toast.error('Failed to send reset link');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className='border border-neutral-300 bg-white rounded-[1.25rem] border-solid w-[33.75rem] mx-auto py-12 px-[4.5rem]'>
        <div className='flex flex-col items-center justify-center'>
          <Image src={logo} alt='logo' />
          <h1 className='text-[#101828] text-2xl not-italic font-semibold leading-[normal] mb-6 mt-4'>
            Forgot Password
          </h1>
          <p className='text-[#A1A1A1] text-center text-base not-italic font-normal leading-[normal] mb-6'>
            All good. Enter your email address and we'll send you a link to
            reset your password
          </p>
        </div>
        <form onSubmit={handleSubmit} className='flex flex-col gap-3 mt-4'>
          <label htmlFor='email' className='class-label'>
            Email <span className='text-red-500'>*</span>
            <input
              type='email'
              name='email'
              id='email'
              className='class-input mt-4'
              placeholder='Enter your email address'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <Button
            className='w-full mt-2'
            text='Send reset link'
            disabled={isLoading}
          />
        </form>
        <div className='flex items-center justify-center gap-2 mt-4'>
          <Link
            href='/login'
            className='text-[#254D55] text-base not-italic font-normal leading-[normal] underline'
          >
            Back to Login
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;

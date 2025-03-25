'use client';

import AuthLayout from '@/components/auth-layout';
import Button from '@/components/button';
import logo from '@/public/assets/logo.svg';
import { Select } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useState, FormEvent } from 'react';
import { useAuth } from '@/context/auth-context';
import { Eye, EyeOff } from 'lucide-react';

const SignUp = () => {
  const { signUp } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    tin: '',
    phone_number: '',
    password: '',
    confirmPassword: '',
    user_type: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUserTypeChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      user_type: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validation
    if (!termsAccepted) {
      alert('Please confirm that the data provided is correct');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      await signUp({
        ...formData,
        created_by: formData.email, // Using email as created_by
      });
    } catch (error) {
      console.error('Signup failed:', error);
      alert('Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className='border border-neutral-300 bg-white rounded-[1.25rem] scale-90 border-solid w-[70vw] mx-auto py-12 px-[4.5rem]'>
        <div className='flex flex-col items-center justify-center'>
          <Image src={logo} alt='logo' />
          <h1 className='text-[#101828] text-2xl not-italic font-semibold leading-[normal] mb-8 mt-4'>
            Create your account
          </h1>
        </div>
        <form className='grid grid-cols-2 gap-4'>
          <label htmlFor='name' className='class-label'>
            Name <span>*</span>
            <input
              type='text'
              name='name'
              id='name'
              className='class-input'
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <label htmlFor='email' className='class-label'>
            Email <span>*</span>
            <input
              type='email'
              name='email'
              id='email'
              className='class-input'
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label htmlFor='tin' className='class-label'>
            TIN <span>*</span>
            <input
              type='text'
              name='tin'
              id='tin'
              className='class-input'
              value={formData.tin}
              onChange={handleChange}
              required
            />
          </label>
          <label htmlFor='phone_number' className='class-label'>
            Phone <span>*</span>
            <input
              type='tel'
              name='phone_number'
              id='phone_number'
              className='class-input'
              value={formData.phone_number}
              onChange={handleChange}
              required
            />
          </label>
          <label htmlFor='password' className='class-label relative'>
            Password <span>*</span>
            <div className='relative'>
              <input
                type={showPassword ? 'text' : 'password'}
                name='password'
                id='password'
                className='class-input pr-10'
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-3 top-1/2 -translate-y-1/2'
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </label>
          <label htmlFor='confirmPassword' className='class-label relative'>
            Confirm Password <span>*</span>
            <div className='relative'>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name='confirmPassword'
                id='confirmPassword'
                className='class-input pr-10'
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <button
                type='button'
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className='absolute right-3 top-1/2 -translate-y-1/2'
              >
                {showConfirmPassword ? (
                  <EyeOff className='cursor-pointer' size={20} />
                ) : (
                  <Eye className='cursor-pointer' size={20} />
                )}
              </button>
            </div>
          </label>
          <label htmlFor='user_type' className=''>
            User Type <span>*</span>
            <Select
              placeholder='Select User Type'
              style={{
                borderRadius: '2rem',
                backgroundColor: 'transparent',
                color: '#000000',
                fontSize: '0.875rem',
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: 'normal',
                width: '100%',
                display: 'block',
                marginBottom: '1rem',
                marginTop: '0.25rem',
                height: '3.25rem',
              }}
              id='user_type'
              value={formData.user_type || undefined}
              onChange={handleUserTypeChange}
              options={[
                { value: 'consultant', label: 'Consultant' },
                { value: 'company', label: 'Company' },
              ]}
            />
          </label>
          <div className='flex items-center gap-2 col-span-2'>
            <input
              type='checkbox'
              name='terms'
              id='terms'
              className='w-4 h-4 mt-0.5'
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
            />
            <p className='text-[#303030] text-base not-italic font-normal leading-[normal]'>
              I confirm that the data provided are correct
            </p>
          </div>
        </form>
        <div onClick={handleSubmit} className=''>
          <Button
            className='w-full mt-6'
            text={loading ? 'Creating account...' : 'Submit'}
            disabled={loading}
          />
        </div>
        <div className='flex items-center justify-center gap-2 mt-4'>
          <p className='text-[#BFBFBF] text-base not-italic font-normal leading-[normal]'>
            Already have an account?
          </p>
          <Link
            href='/login'
            className='text-[#254D55] text-base not-italic font-normal leading-[normal] underline'
          >
            Login
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignUp;

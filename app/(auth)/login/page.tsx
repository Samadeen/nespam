'use client';

import AuthLayout from '@/components/auth-layout';
import Button from '@/components/button';
import logo from '@/public/assets/logo.svg';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/context/auth-context';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    user_id: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await login({
        user_id: formData.user_id,
        password: formData.password,
      });
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className='border border-neutral-300 bg-white rounded-[1.25rem] border-solid w-[33.75rem] mx-auto py-12 px-[4.5rem]'>
        <div className='flex flex-col items-center justify-center'>
          <Image src={logo} alt='logo' />
          <h1 className='text-[#101828] text-2xl not-italic font-semibold leading-[normal] mb-8 mt-4'>
            Login to your account
          </h1>
        </div>
        <form className='flex flex-col gap-3'>
          <label htmlFor='user_id' className='class-label'>
            NESREA ID <span>*</span>
            <input
              type='text'
              name='user_id'
              value={formData.user_id}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, user_id: e.target.value }))
              }
              placeholder='User ID'
              required
              className='class-input'
            />
          </label>
          <label htmlFor='password' className='class-label'>
            Password <span>*</span>
            <div className='relative'>
              <input
                type={showPassword ? 'text' : 'password'}
                name='password'
                value={formData.password}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, password: e.target.value }))
                }
                placeholder='Password'
                required
                className='class-input'
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
          <Link
            href='/forgot-password'
            className='text-[#254D55] text-right -mt-5 text-base not-italic font-normal leading-[normal] underline'
          >
            Forgot Password?
          </Link>
        </form>
        <div onClick={handleSubmit} className='mt-6'>
          <Button
            className='w-full'
            text={loading ? 'Logging in...' : 'Login'}
          />
        </div>
        <div className='flex items-center justify-center gap-2 mt-4'>
          <p className='text-[#BFBFBF] text-base not-italic font-normal leading-[normal]'>
            Don&apos;t have an account?{' '}
            <Link
              href='/sign-up'
              className='text-[#254D55] text-base not-italic font-normal leading-[normal] underline'
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;

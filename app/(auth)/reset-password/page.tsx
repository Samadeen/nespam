import AuthLayout from '@/components/auth-layout';
import Button from '@/components/button';
import logo from '@/public/assets/logo.svg';
import Image from 'next/image';

const ResetPassword = () => {
  return (
    <AuthLayout>
      <div className='border border-neutral-300 bg-white rounded-[1.25rem] border-solid w-[33.75rem] mx-auto py-12 px-[4.5rem]'>
        <div className='flex flex-col items-center justify-center'>
          <Image src={logo} alt='logo' />
          <h1 className='text-[#101828] text-2xl not-italic font-semibold leading-[normal] mb-6 mt-4'>
            Reset Password
          </h1>

          <form action='' className='flex flex-col gap-3 mt-4 w-full'>
            <label htmlFor='password' className='class-label'>
              New Password
              <input
                type='password'
                name='password'
                id='password'
                className='class-input'
              />
            </label>

            <label htmlFor='confirm-password' className='class-label'>
              Re-enter Password
              <input
                type='password'
                name='confirm-password'
                id='confirm-password'
                className='class-input'
              />
            </label>
            <Button className='w-full mt-2' text='Save' />
          </form>
        </div>
      </div>
    </AuthLayout>
  );
};

export default ResetPassword;

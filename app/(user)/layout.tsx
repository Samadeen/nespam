'use client';

import Header from '@/components/header';
import Sidebar from '@/components/sidebar/page';
import React, { ReactNode, Suspense } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Suspense fallback={'Loading...'}>
      <div className='lg:relative'>
        <div className='fixed z-[500] w-[19rem]'>
          <Sidebar />
        </div>
        <div className={`ml-[19rem]`}>
          <Header />
          <div className='bg-[#fff] w-full py-[1.15rem] min-h-screen h-auto'>
            {children}
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default Layout;

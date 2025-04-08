'use client';

import Header from '@/components/header';
import CompanySidebar from '@/components/company/company-sidebar/page';
import React, { ReactNode, Suspense } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Suspense fallback={'Loading...'}>
      <div className='lg:relative'>
        <div className='fixed z-[500] w-[20rem]'>
          <CompanySidebar />
        </div>
        <div className={`ml-[20rem]`}>
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

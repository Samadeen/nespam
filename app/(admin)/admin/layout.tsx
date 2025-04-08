'use client';

import Sidebar from '@/components/admin/admin-sidebar/page';
import Header from '@/components/header';
import { useState } from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className='flex h-screen overflow-hidden'>
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div
        className={`flex-1 flex flex-col h-screen transition-all duration-300 ${
          isCollapsed ? 'ml-[4.5rem]' : 'ml-[20rem]'
        }`}
      >
        <Header />
        <main className='flex-1 overflow-y-auto'>{children}</main>
      </div>
    </div>
  );
}

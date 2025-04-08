'use client';

import logo from '@/public/assets/sidebar-logo.svg';
import dashboard from '@/public/assets/dashboard.svg';
import dashboard_active from '@/public/assets/dashboard-active.svg';
import permits from '@/public/assets/permit.svg';
import permits_active from '@/public/assets/permit-active.svg';
import report from '@/public/assets/report.svg';
import report_active from '@/public/assets/report-active.svg';
import client from '@/public/assets/client.svg';
import client_active from '@/public/assets/client-active.svg';
import payment from '@/public/assets/payment.svg';
import payment_active from '@/public/assets/payment-active.svg';
import document from '@/public/assets/document.svg';
import document_active from '@/public/assets/document-active.svg';
import support from '@/public/assets/support.svg';
import support_active from '@/public/assets/support-active.svg';

import Image from 'next/image';
import MenuLink from './menu-links';
const CompanySidebar = () => {
  const links = [
    {
      name: 'Dashboard',
      to: '/company/dashboard',
      img: dashboard,
      active_image: dashboard_active,
    },

    {
      name: 'Permit Applications',
      to: '/company/dashboard/permit-application',
      img: permits,
      active_image: permits_active,
    },
    {
      name: 'Environmental Reports',
      to: '/company/dashboard/environmental-report',
      img: report,
      active_image: report_active,
    },
    {
      name: 'Consultants and Facilities',
      to: '/company/dashboard/consultant-and-facilities',
      img: client,
      active_image: client_active,
    },
    {
      name: 'Clients',
      to: '/company/dashboard/clients',
      img: client,
      active_image: client_active,
    },
    {
      name: 'Payments',
      to: '/company/dashboard/payments',
      img: payment,
      active_image: payment_active,
    },
    {
      name: 'Documents',
      to: '/company/dashboard/document',
      img: document,
      active_image: document_active,
    },
    {
      name: 'Support',
      to: '/company/dashboard/support',
      img: support,
      active_image: support_active,
    },
  ];
  return (
    <div className='flex flex-col bg-[#254D55] border-r-[#BFBFBF] border-r border-solid w-[20rem] fixed z-[500] lg:absolute h-screen p-6 inset-x-0'>
      <div className='flex items-center justify-center border-b border-neutral-300 pb-4 gap-2 mb-2'>
        <Image src={logo} alt='logo' className='' />
      </div>
      <div className='h-full flex justify-between flex-col mt-6'>
        <ul className='flex gap-6 flex-col'>
          {links.map((item, idx) => (
            <div
              className=''
              key={idx}
              //   onClick={() => {
              //     isMobile ? shower(false) : null;
              //   }}
            >
              <MenuLink item={item} key={item.name} />
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CompanySidebar;

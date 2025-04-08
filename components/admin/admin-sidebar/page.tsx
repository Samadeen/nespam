'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  ChevronDown,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import {
  MdDashboard,
  MdPeople,
  MdAccountBalance,
  MdDescription,
  MdAssignment,
  MdBarChart,
  MdGavel,
  MdAdminPanelSettings,
  MdSupport,
} from 'react-icons/md';
import logo from '@/public/assets/sidebar-logo.svg';

interface MenuItem {
  name: string;
  to: string;
  icon: React.ReactNode;
  active_image: string;
  subItems?: { name: string; to: string }[];
}

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const Sidebar = ({ isCollapsed, setIsCollapsed }: SidebarProps) => {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  const links: MenuItem[] = [
    {
      name: 'Dashboard',
      to: '/admin/dashboard',
      icon: <MdDashboard size={20} />,
      active_image: '/assets/dashboard-active.svg',
    },
    {
      name: 'User Management',
      to: '/admin/user-management',
      icon: <MdPeople size={20} />,
      active_image: '/assets/user-active.svg',
      subItems: [
        // { name: 'User Profile', to: '/admin/user-management/profile' },
        { name: 'Registration', to: '/admin/user-management/registration' },
        { name: 'Profiling', to: '/admin/user-management/profiling' },
        { name: 'Documentation', to: '/admin/user-management/documentation' },
        { name: 'Services/Facilities', to: '/admin/user-management/services' },
      ],
    },
    {
      name: 'Accounting',
      to: '/admin/accounting',
      icon: <MdAccountBalance size={20} />,
      active_image: '/assets/accounting-active.svg',
      subItems: [
        { name: 'Payments', to: '/admin/accounting/payments' },
        { name: 'Pricing', to: '/admin/accounting/pricing' },
        { name: 'Revenue/Estimates', to: '/admin/accounting/revenue' },
      ],
    },
    {
      name: 'Permit',
      to: '/admin/permit',
      icon: <MdDescription size={20} />,
      active_image: '/assets/permit-active.svg',
      subItems: [
        { name: 'Permit Applications', to: '/admin/permit/applications' },
        { name: 'Certificates', to: '/admin/permit/certificates' },
        { name: 'Payments', to: '/admin/permit/payments' },
      ],
    },
    {
      name: 'Environmental Reports',
      to: '/admin/environmental',
      icon: <MdAssignment size={20} />,
      active_image: '/assets/report-active.svg',
      subItems: [
        { name: 'Submissions', to: '/admin/environmental/submissions' },
        { name: 'Certificates', to: '/admin/environmental/certificates' },
        { name: 'Payment', to: '/admin/environmental/payment' },
      ],
    },
    {
      name: 'Reports',
      to: '/admin/reports',
      icon: <MdAssignment size={20} />,
      active_image: '/assets/reports-active.svg',
      subItems: [
        { name: 'Inspection', to: '/admin/reports/inspection' },
        { name: 'Notice', to: '/admin/reports/notice' },
        { name: 'Enforcement', to: '/admin/reports/enforcement' },
      ],
    },
    {
      name: 'Analytics',
      to: '/admin/analytics',
      icon: <MdBarChart size={20} />,
      active_image: '/assets/analytics-active.svg',
      subItems: [
        { name: 'Revenue', to: '/admin/analytics/revenue' },
        { name: 'User Base', to: '/admin/analytics/user-base' },
        { name: 'Documentation', to: '/admin/analytics/documentation' },
      ],
    },
    {
      name: 'Legal',
      to: '/admin/legal',
      icon: <MdGavel size={20} />,
      active_image: '/assets/legal-active.svg',
      subItems: [{ name: 'Offences', to: '/admin/legal/offences' }],
    },
    {
      name: 'Admin Panel',
      to: '/admin/panel',
      icon: <MdAdminPanelSettings size={20} />,
      active_image: '/assets/admin-active.svg',
      subItems: [
        { name: 'Departments', to: '/admin/panel/departments' },
        { name: 'Roles / Permissions', to: '/admin/panel/roles' },
        { name: 'User Administration', to: '/admin/panel/users' },
      ],
    },
    {
      name: 'Support',
      to: '/admin/support',
      icon: <MdSupport size={20} />,
      active_image: '/assets/support-active.svg',
      subItems: [
        { name: 'Complaints / Ticketing', to: '/admin/support/tickets' },
        { name: 'Admin Chat', to: '/admin/support/chat' },
      ],
    },
  ];

  const handleItemClick = (item: MenuItem, e: React.MouseEvent) => {
    // If clicking the button part that contains the chevron, only toggle submenu
    const isChevronClick = (e.target as HTMLElement).closest('.chevron-icon');

    if (item.subItems && isChevronClick) {
      e.preventDefault();
      toggleSubmenu(item.name);
    } else {
      // Navigate to the main route
      router.push(item.to);
      if (!item.subItems) {
        setExpandedItem(null);
      }
    }
  };

  const toggleSubmenu = (itemName: string) => {
    if (!isCollapsed) {
      setExpandedItem(expandedItem === itemName ? null : itemName);
    }
  };

  const isActiveLink = (item: MenuItem) => {
    if (pathname === item.to) return true;
    if (item.subItems?.some((subItem) => pathname === subItem.to)) return true;
    return false;
  };

  const isActiveSubLink = (to: string) => pathname === to;

  return (
    <div
      className={`bg-[#254D55] border-r-[#BFBFBF] border-r border-solid fixed h-screen top-0 left-0 transition-all duration-300 ease-in-out overflow-y-auto overflow-x-hidden ${
        isCollapsed ? 'w-[4.5rem]' : 'w-[20rem]'
      }`}
    >
      <div className='p-6 relative'>
        {/* Collapse Toggle Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className='absolute -right-3 top-24 bg-[#254D55] text-white p-1.5 rounded-full border border-[#BFBFBF] hover:bg-[#2A454B] transition-colors'
        >
          {isCollapsed ? (
            <ChevronsRight size={16} />
          ) : (
            <ChevronsLeft size={16} />
          )}
        </button>

        <div className='flex items-center justify-center border-b border-neutral-300 pb-4 gap-2 mb-2'>
          <Image
            src={logo}
            alt='logo'
            className={`transition-all duration-300 ${
              isCollapsed ? 'w-8' : 'w-auto'
            }`}
          />
        </div>

        <div className='h-full flex justify-between flex-col mt-6'>
          <ul className='flex gap-2 flex-col'>
            {links.map((item) => (
              <li key={item.name}>
                <div
                  onClick={(e) => handleItemClick(item, e)}
                  className={`w-full flex items-center justify-between p-3 text-white rounded-lg group transition-all duration-300 cursor-pointer ${
                    isActiveLink(item) ? 'bg-[#2A454B]' : 'hover:bg-[#2A454B]'
                  }`}
                >
                  <div className='flex items-center gap-3'>
                    <div
                      className={`text-white ${
                        isActiveLink(item) ? 'text-[#3E8290]' : ''
                      }`}
                    >
                      {item.icon}
                    </div>
                    <span
                      className={`text-sm whitespace-nowrap transition-all duration-300 ${
                        isCollapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'
                      }`}
                    >
                      {item.name}
                    </span>
                  </div>
                  {item.subItems && !isCollapsed && (
                    <span className='text-white transition-transform duration-300 chevron-icon'>
                      {expandedItem === item.name ? (
                        <ChevronDown size={16} />
                      ) : (
                        <ChevronRight size={16} />
                      )}
                    </span>
                  )}
                </div>

                {/* Submenu */}
                {item.subItems &&
                  expandedItem === item.name &&
                  !isCollapsed && (
                    <ul className='ml-9 mt-2 space-y-2 animate-slideDown'>
                      {item.subItems.map((subItem) => (
                        <li key={subItem.name}>
                          <Link
                            href={subItem.to}
                            className={`text-[#E5E5E5] text-sm block py-2 px-3 rounded-lg transition-colors ${
                              isActiveSubLink(subItem.to)
                                ? 'bg-[#2A454B] text-white'
                                : 'hover:bg-[#2A454B] hover:text-white'
                            }`}
                          >
                            {subItem.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

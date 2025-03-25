'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface ItemProps {
  item: {
    name: string;
    to: string;
    img: string;
    active_image: string;
  };
}

const MenuLink = ({ item }: ItemProps) => {
  const pathname = usePathname();

  return (
    <Link
      href={item.to}
      className={`flex items-center no-underline gap-3 not-italic font-normal leading-[145%] transition-all duration-[1s] ease-[ease-in-out] px-4 py-2 hover:bg-[#F5FAFF] hover:text-black hover:rounded-lg ${
        pathname === item.to
          ? 'font-semibold text-[#254D55] bg-[#fff] rounded-md'
          : pathname.startsWith(`${item.to}/`) && item.to !== '/dashboard'
          ? 'font-semibold text-[#254D55] bg-[#fff] rounded-md'
          : 'text-[#fff]'
      }`}
    >
      <Image
        src={pathname?.startsWith(item.to) ? item.active_image : item.img}
        alt={`${item.name} icon`}
      />
      {item.name}
    </Link>
  );
};

export default MenuLink;

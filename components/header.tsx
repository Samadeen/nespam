import { Search, Bell, User2 } from 'lucide-react';

const Header = () => {
  return (
    <header className='sticky top-0 px-9 py-5 flex justify-between border bg-white border-solid border-[#E4E7EC] w-full'>
      <label
        htmlFor='search'
        className='flex gap-3 bg-[#F0F2F5] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] px-3 py-2.5 rounded-md w-[40%]'
      >
        <Search />
        <input
          type='text'
          name='search'
          id='search'
          className='focus:outline-none bg-transparent'
          placeholder='Search here...'
        />
      </label>
      <div className='flex items-center gap-9'>
        <Bell />
        <User2 />
      </div>
    </header>
  );
};

export default Header;

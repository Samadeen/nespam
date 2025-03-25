import bg from '@/public/assets/background-logo.png';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      style={{ backgroundImage: `url(${bg.src})` }}
      className='flex flex-col items-center justify-center h-screen bg-contain bg-no-repeat bg-center'
    >
      {children}
    </div>
  );
};

export default AuthLayout;

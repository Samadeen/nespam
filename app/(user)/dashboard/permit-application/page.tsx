import CapacityAndExperience from '@/components/consultant-permit/capacity-and-experience';
import NatureOfOperations from '@/components/consultant-permit/nature-of-operations';
import OpenBurning from '@/components/consultant-permit/open-burning';
import PermitApplications from '@/components/consultant-permit/permit-application';
import PermitTable from '@/components/consultant-permit/permit-table';
import TypeAndNature from '@/components/consultant-permit/type-and-nature';

const PermitApplication = () => {
  return (
    <div className='px-9 py-6'>
      <div className=''>
        <h1 className='text-[#3E8290] text-2xl not-italic font-medium leading-[normal] mb-2'>
          Permit Application
        </h1>
        <p className='text-[#696969] text-sm not-italic font-normal leading-[normal]'>
          Welcome to the application process
        </p>
      </div>
      <div className=''>
        {/* <PermitTable /> */}
        {/* <PermitApplications /> */}
        {/* <TypeAndNature /> */}
        {/* <CapacityAndExperience /> */}
        {/* <NatureOfOperations /> */}
        <OpenBurning />
      </div>
    </div>
  );
};

export default PermitApplication;

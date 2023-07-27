import { ProjectInfo, ProjectDetail } from '@/components/project';
import ScrollUpButton from '@/components/ui/ScrollUpButton';
import { adv } from '@/assets/common';
// import { RewardList } from '@/components/reward';
import { scrollToTop } from '@/common/utils/scrollToTop';
import { useEffect } from 'react';

function ProjectPage() {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <>
      <main className='max-w-[1280px] mx-auto my-40pxr'>
        <ProjectInfo />
        <section className='flex justify-between my-40pxr'>
          <ProjectDetail />
          <img src={adv} alt='광고' className='h-fit mt-72pxr w-[42%]' />
          {/* <RewardList /> */}
        </section>
      </main>
      <ScrollUpButton />
    </>
  );
}

export default ProjectPage;

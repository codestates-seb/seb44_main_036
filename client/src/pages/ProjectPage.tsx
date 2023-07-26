import { ProjectInfo, ProjectDetail } from '@/components/project';
import ScrollUpButton from '@/components/ui/ScrollUpButton';
import { adv } from '@/assets/common';
// import { RewardList } from '@/components/reward';

function ProjectPage() {
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

import { ProjectInfo, ProjectDetail } from '@/components/project';
// import { RewardList } from '@/components/reward';

function ProjectPage() {
  return (
    <main className='max-w-[1280px] mx-auto my-40pxr'>
      <ProjectInfo />
      <section className='flex justify-between my-40pxr'>
        <ProjectDetail />
        {/* <RewardList /> */}
      </section>
    </main>
  );
}

export default ProjectPage;

import { ProjectList, ProjectHeader } from '@/components/project';
import { CategoryList } from '@/components/category';

function MainPage() {
  return (
    <>
      <CategoryList />
      <ProjectHeader />
      <ProjectList />
    </>
  );
}

export default MainPage;

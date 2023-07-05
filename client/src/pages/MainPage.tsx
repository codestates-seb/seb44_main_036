import { ProjectList, ProjectHeader } from '@/components/project';
import { CategoryList } from '@/components/category';
import { Carousel } from '@/components/carousel';

function MainPage() {
  return (
    <>
      <Carousel />
      <CategoryList />
      <ProjectHeader />
      <ProjectList />
    </>
  );
}

export default MainPage;
